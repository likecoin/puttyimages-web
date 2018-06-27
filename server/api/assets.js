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
import formatMediaObject from '../util/metadata';

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
      const { from, payload, sign } = req.body;
      const recovered = personalEcRecover(payload, sign);
      if (recovered.toLowerCase() !== from.toLowerCase()) {
        throw new ValidationError('recovered address not match');
      }

      const message = web3HexToUtf8(payload);
      // filter signing description append before the object
      const actualPayload = JSON.parse(message.substr(message.indexOf('{')));

      const {
        wallet,
        assetSHA256,
        ts,
        description,
        license,
        tags,
        dateCreated,
        footprint,
      } = actualPayload;

      // check address match
      if (from !== wallet || !checkAddressValid(wallet)) {
        throw new ValidationError('wallet address not match');
      }

      // check ts expire
      if (Math.abs(ts - Date.now()) > ONE_DATE_IN_MS) {
        throw new ValidationError('payload expired');
      }

      // check tag
      if (!tags || !isTagsCountValid(tags)) {
        throw new ValidationError('number of tags invalid');
      }
      if (!isTagsValid(tags)) throw new ValidationError('tags length invalid');

      // check license
      if (!license) throw new ValidationError('asset need a license');
      if (!isLicenseValid(license))
        throw new ValidationError('license invalid');

      // check asset
      const { file: asset } = req;
      const hash256 = sha256(asset.buffer);
      const { height, width } = imageSize(asset.buffer);
      validateImage(asset, assetSHA256);
      const hash256Bytes = Buffer.from(hash256, 'hex');

      // FIXME: use ipfs wrapper function
      const ipfs = await IpfsClient();
      const ipfsAdd = await ipfs.files.add(asset.buffer);
      if (!ipfsAdd) throw new Error('fail to ipfs add');
      await ipfs.pin.add(ipfsAdd[0].hash);

      // metadata
      // TODO: creator: get user id by wallet address
      const licenseObj = await sequelize.license.findById(license, {
        raw: true,
      });
      const uploadDate = new Date().toISOString();
      const mediaObj = {
        creator: [wallet],
        dateCreated,
        description,
        fingerprint: assetSHA256,
        footprint: footprint || [],
        ipfs: ipfsAdd[0].hash,
        license: licenseObj.url,
        previousVersion: null,
        uploadDate,
      };
      const formattedMediaObj = formatMediaObject(mediaObj);
      const ipld = await ipfs.dag.put(formattedMediaObj, {
        format: 'dag-cbor',
        hashAlg: 'sha2-256',
      });
      await ipfs.pin.add(ipld.toBaseEncodedString());

      // db update
      await sequelize.sequelize.transaction((t) =>
        sequelize.sequelize.Promise.all([
          sequelize.asset.create(
            {
              description,
              fingerprint: hash256Bytes,
              height,
              ipfs: bs58.decode(ipfsAdd[0].hash),
              ipld: bs58.decode(ipld.toBaseEncodedString()),
              license,
              tags: tags.map((name) => ({ name })),
              wallet,
              width,
            },
            {
              include: [sequelize.tag],
              transaction: t,
            }
          ),
        ])
      );

      // TODO: media chain

      res.json(mediaObj);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/assets/list/:wallet', async (req, res, next) => {
  try {
    const { wallet } = req.params;
    const assets = await sequelize.asset.findAll({ where: { wallet } });
    if (!assets) throw new Error('asset not found');
    res.json(assets);
  } catch (e) {
    next(e);
  }
});

export default router;
