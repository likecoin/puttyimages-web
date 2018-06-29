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

const bs58 = require('bs58');
const imageSize = require('image-size');
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
        creator,
        dateCreated,
        description,
        license,
        likeFingerprint,
        likeFootprint,
        likePreviousVersion,
        uploadDate,
      } = metadata;
      const userObj = await sequelize.user.findById(creator[0], {
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
      if (!isLicenseValid(licenseId, license))
        throw new ValidationError('license invalid');

      // check asset
      const { file: asset } = req;
      const hash256 = sha256(asset.buffer);
      const { height, width } = imageSize(asset.buffer);
      validateImage(asset, likeFingerprint);
      const hash256Bytes = Buffer.from(hash256, 'hex');

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
            fingerprint: hash256Bytes,
            height,
            ipfs: bs58.decode(ipfsAdd[0].hash),
            ipld: bs58.decode(ipld.toBaseEncodedString()),
            license: licenseId,
            wallet,
            width,
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

      // TODO: media chain

      res.json({
        creator,
        dateCreated,
        description,
        fingerprint: likeFingerprint,
        footprint: likeFootprint,
        ipfs: ipfsAdd[0].hash,
        license,
        previousVersion: likePreviousVersion,
        uploadDate,
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

export default router;
