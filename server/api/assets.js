import { Router } from 'express';
import IpfsClient from '../ipfs';
import sequelize from '../models';
import { validator, ValidationError } from '../../util/validator';
import {
  personalEcRecover,
  web3HexToUtf8,
} from '../util/web3';
import {
  ONE_DATE_IN_MS,
  SUPPORTED_IMAGE_TYPE,
  MAX_IMAGE_SIZE,
  MAX_TAG_COUNT,
  MAX_TAG_LENGTH,
  MIN_TAG_LENGTH,
  SUPPORTED_LICENSE,
} from '../../constant';
import formatMediaObject from '../util/metadata';

const Multer = require('multer');
const sha256 = require('js-sha256');
const imageType = require('image-type');
const bs58 = require('bs58');

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },
});

router.get('/assets/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const asset = await sequelize.asset.findById(Buffer.from(id, 'hex'), { raw: true });
    if (!asset) throw new Error('asset not found');
    res.json(asset);
  } catch (e) {
    next(e);
  }
});

router.post('/assets/upload', multer.single('asset'), async (req, res, next) => {
  try {
    const {
      from,
      payload,
      sign,
    } = req.body;
    const recovered = personalEcRecover(payload, sign);
    if (recovered.toLowerCase() !== from.toLowerCase()) {
      throw new ValidationError('recovered address not match');
    }

    const message = web3HexToUtf8(payload);
    const actualPayload = JSON.parse(message);
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
    if (from !== wallet || !validator.checkAddressValid(wallet)) {
      throw new ValidationError('wallet address not match');
    }

    // check ts expire
    if (Math.abs(ts - Date.now()) > ONE_DATE_IN_MS) {
      throw new ValidationError('payload expired');
    }

    // check tag
    if (tags.length < 1) throw new ValidationError('asset need at least 1 tag');
    if (tags.length > MAX_TAG_COUNT) {
      throw new ValidationError(`asset need at most ${MAX_TAG_COUNT} tag`);
    }
    const isTagsValid = tags.every(e => e.length >= MIN_TAG_LENGTH && e.length <= MAX_TAG_LENGTH);
    if (!isTagsValid) throw new ValidationError('tags length invalid');

    // check license
    if (!license) throw new ValidationError('asset need a license');
    if (!SUPPORTED_LICENSE.has(license)) throw new ValidationError('license invalid');
    
    // check asset
    const { file: asset } = req;
    if (!asset) throw new ValidationError('no asset uploaded');
    if (asset.size > MAX_IMAGE_SIZE) throw new ValidationError('asset size too large');
    const type = imageType(asset.buffer);
    if (!SUPPORTED_IMAGE_TYPE.has(type && type.ext)) throw new ValidationError('unsupported file format!');
    const hash256 = sha256(asset.buffer);
    if (hash256 !== assetSHA256) throw new ValidationError('asset sha not match');
    const hash256Bytes = Buffer.from(hash256, 'hex');
    const oldAsset = await sequelize.asset.findById(hash256Bytes, { raw: true });
    if (oldAsset) throw new ValidationError('asset already exist');

    // FIXME: use ipfs wrapper function
    const ipfs = await IpfsClient();
    const ipfsAdd = await ipfs.files.add(asset.buffer);
    if (!ipfsAdd) throw new Error('fail to ipfs add');
    await ipfs.pin.add(ipfsAdd[0].hash);

    // metadata
    // TODO: creator: get user id by wallet address
    const licenseObj = await sequelize.license.findById(license, { raw: true });
    const uploadDate = new Date().toISOString();
    const mediaObj = {
      creator: [wallet],
      dateCreated,
      description,
      license: licenseObj.url,
      fingerprint: assetSHA256,
      footprint: footprint || [],
      ipfs: ipfsAdd[0].hash,
      previousVersion: null,
      uploadDate,
    };
    const formattedMediaObj = formatMediaObject(mediaObj);
    const ipld = await ipfs.dag.put(formattedMediaObj, { format: 'dag-cbor', hashAlg: 'sha2-256' });
    await ipfs.pin.add(ipld.toBaseEncodedString());

    // db update
    // NOTE: sequelize.model.bulkCreate fail on duplicate in postgres
    await sequelize.sequelize.query(`INSERT INTO tag (name) VALUES
            ${tags.map(tag => `('${tag}')`).join(', ')}
            ON CONFLICT DO NOTHING;`);
    const assetRecord = {
      fingerprint: hash256Bytes,
      ipfs: bs58.decode(ipfsAdd[0].hash),
      ipld: bs58.decode(ipld.toBaseEncodedString()),
      wallet,
      fk_asset_license: license,
    };
    await sequelize.asset.upsert(assetRecord);
    const assetTagRecord = tags.map(t => ({ asset_fingerprint: hash256Bytes, tag_name: t }));
    await sequelize.asset_tag.bulkCreate(assetTagRecord);
    
    // TODO: media chain

    res.json(mediaObj);
  } catch (err) {
    next(err);
  }
}); 

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
