import { Router } from 'express';
import IpfsClient from '../ipfs';
import sequelize from '../models';
import {
  ValidationError,
  checkAddressValid,
  isTagsCountValid,
  isTagsValid,
  isLicenseValid,
  validateImage,
} from '../models/validator';
import { personalEcRecover, web3HexToUtf8 } from '../util/web3';
import { ONE_DATE_IN_MS, MAX_IMAGE_SIZE } from '../../constant';
import { postLikeChain } from '../util/likechain';

const bs58 = require('bs58');
const exifParser = require('exif-parser');
const imageSize = require('image-size');
const imageType = require('image-type');
const Multer = require('multer');
const sha256 = require('js-sha256');

const router = Router();

const multer = Multer({
  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },
  storage: Multer.memoryStorage(),
});

router.get('/assets/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const asset = await sequelize.asset.getMetaById(sequelize, id);
    if (!asset) throw new Error('asset not found');
    res.json(asset);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/assets/upload',
  multer.single('asset'),
  async (req, res, next) => {
    try {
      const { from, payload, sign, tags: tagsStr, licenseId } = req.body;
      const recovered = personalEcRecover(payload, sign);
      if (recovered.toLowerCase() !== from.toLowerCase()) {
        throw new ValidationError('recovered address not match');
      }

      const message = web3HexToUtf8(payload);
      // filter signing description append before the object
      const metadata = JSON.parse(message);

      const {
        dateCreated,
        description,
        license,
        likeFingerprint,
        likeFootprint,
        likeOwner,
        likePreviousVersion,
        uploadDate,
      } = metadata;
      const userObj = await sequelize.user.findById(likeOwner[0], {
        raw: true,
      });
      const { wallet } = userObj;
      const tags = JSON.parse(tagsStr);

      // check address match
      if (from !== wallet || !checkAddressValid(wallet)) {
        throw new ValidationError('wallet address not match');
      }

      // check ts expire
      const ts = new Date(uploadDate).getTime();
      if (Math.abs(ts - Date.now()) > ONE_DATE_IN_MS) {
        throw new ValidationError('payload expired');
      }

      // check tag
      if (!tags || !isTagsCountValid(tags)) {
        throw new ValidationError('number of tags invalid');
      }
      if (!isTagsValid(tags)) throw new ValidationError('tags length invalid');

      // check license
      if (!license || !licenseId) {
        throw new ValidationError('asset need a license');
      }
      if (!isLicenseValid(licenseId, license)) {
        throw new ValidationError('license invalid');
      }

      const { file: asset } = req;
      const hash256 = sha256(asset.buffer);
      const { height, width } = imageSize(asset.buffer);
      validateImage(asset, likeFingerprint, hash256);
      const hash256Bytes = Buffer.from(hash256, 'hex');

      const type = imageType(req.file.buffer).ext;
      const parser = exifParser.create(req.file.buffer);
      const imageExif = parser.parse();

      const {
        DateTimeOriginal,
        ExposureTime,
        FNumber,
        FocalLength,
        ISO,
        LensMake,
        LensModel,
        Make,
        Model,
      } = imageExif.tags;
      const exif = {
        DateTimeOriginal,
        ExposureTime,
        FNumber,
        FocalLength,
        ISO,
        // trim as some camera may have extra unknown padding for the following info
        LensMake: typeof LensMake === 'string' ? LensMake.trim() : LensMake,
        LensModel: typeof LensModel === 'string' ? LensModel.trim() : LensModel,
        Make: typeof Make === 'string' ? Make.trim() : Make,
        Model: typeof Model === 'string' ? Model.trim() : Model,
      };

      const ipfs = await IpfsClient();
      const ipfsAdd = await ipfs.files.add(asset.buffer);
      if (!ipfsAdd) throw new Error('fail to ipfs add');
      await ipfs.pin.add(ipfsAdd[0].hash);

      // metadata
      const ipld = await ipfs.dag.put(metadata, {
        format: 'dag-cbor',
        hashAlg: 'sha2-256',
      });
      await ipfs.pin.add(ipld.toBaseEncodedString());

      // db update
      await sequelize.sequelize.transaction(async (transaction) => {
        await Promise.all(
          tags.map((name) =>
            sequelize.tag.findOrCreate({ transaction, where: { name } })
          )
        );

        await sequelize.asset.create(
          {
            description,
            exif,
            fingerprint: hash256Bytes,
            height,
            ipfs: bs58.decode(ipfsAdd[0].hash),
            ipld: bs58.decode(ipld.toBaseEncodedString()),
            license: licenseId,
            type,
            wallet,
            width,
          },
          { transaction }
        );

        await sequelize.assetLike.create(
          {
            assetFingerprint: hash256Bytes,
            updated_at: new Date(),
          },
          { transaction }
        );

        await sequelize.assetStats.create(
          {
            assetFingerprint: hash256Bytes,
          },
          { transaction }
        );

        await sequelize.assetTag.bulkCreate(
          tags.map((name) => ({
            assetFingerprint: hash256Bytes,
            tag_name: name,
          })),
          { transaction }
        );
      });

      res.json({
        dateCreated,
        description,
        fingerprint: likeFingerprint,
        footprint: likeFootprint,
        ipfs: ipfsAdd[0].hash,
        license,
        likeOwner,
        previousVersion: likePreviousVersion,
        uploadDate,
      });

      postLikeChain({
        likeIpfs: ipfsAdd[0].hash,
        metadata,
        ownerSig: sign,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/assets/list/:wallet', async (req, res, next) => {
  try {
    const { wallet } = req.params;
    const assets = await sequelize.asset.findAll({
      include: sequelize.asset.getQueryInclude(sequelize),
      where: { wallet },
    });
    if (!assets) throw new Error('asset not found');
    res.json(assets);
  } catch (e) {
    next(e);
  }
});

router.get('/assets/featured/list', async (req, res, next) => {
  try {
    const assets = await sequelize.asset.getFeatured(sequelize);
    res.json(assets || []);
  } catch (e) {
    next(e);
  }
});

router.post('/assets/:id/view', async (req, res, next) => {
  try {
    const { id } = req.params;

    const assetStats = await sequelize.assetStats.findOrCreate({
      where: { assetFingerprint: Buffer.from(id, 'hex') },
    });
    await assetStats[0].increment('view_count');

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.post('/assets/:id/download', async (req, res, next) => {
  try {
    const { id } = req.params;

    const assetStats = await sequelize.assetStats.findOrCreate({
      where: { assetFingerprint: Buffer.from(id, 'hex') },
    });
    await assetStats[0].increment('download_count');

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

export default router;
