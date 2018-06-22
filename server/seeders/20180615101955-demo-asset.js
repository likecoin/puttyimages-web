const bs58 = require('bs58');
const fs = require('fs');
const imageSize = require('image-size');
const sha256 = require('js-sha256');

const IpfsClient = require('../ipfs').default;
const formatMediaObject = require('../util/metadata').default;

const { licenses, tags } = require('./fixture');

const fixedDate = new Date('2018-06-20T00:00:00Z');

module.exports = {
  up: (queryInterface) =>
    new Promise(async (resolve) => {
      const assets = [];
      const ipfs = await IpfsClient();
      const sizes = ['landscape', 'portrait', 'square'];
      const allSizes = new Array(18)
        .fill('')
        .map((e, i) => `${sizes[Math.floor(i / 6)]}${(i % 6) + 1}.png`);
      await Promise.all(
        allSizes.map(async (path, index) => {
          const content = fs.readFileSync(`./assets/seed/${path}`);
          const hash256 = sha256(content);
          const { height, width } = imageSize(content);
          const ipfsAdd = await ipfs.files.add({ content, path });
          const indexedDate = new Date(+fixedDate + 600000 * index);
          const wallet = `address ${(index % 3) + 1}`;

          const mediaObj = {
            creator: [wallet],
            dateCreated: indexedDate,
            description: '',
            fingerprint: hash256,
            footprint: [],
            ipfs: ipfsAdd[0].hash,
            license: licenses[index % licenses.length].url,
            previousVersion: null,
            uploadDate: indexedDate,
          };
          const formattedMediaObj = formatMediaObject(mediaObj);
          const ipld = await ipfs.dag.put(formattedMediaObj, {
            format: 'dag-cbor',
            hashAlg: 'sha2-256',
          });
          const asset = {
            created_at: indexedDate,
            description: tags[index].name,
            fingerprint: Buffer.from(hash256, 'hex'),
            height,
            ipfs: bs58.decode(ipfsAdd[0].hash),
            ipld: bs58.decode(ipld.toBaseEncodedString()),
            license: licenses[index % licenses.length].name,
            updated_at: indexedDate,
            wallet,
            width,
          };
          assets.push(asset);
        })
      );
      await queryInterface.bulkInsert('asset', assets);
      return resolve();
    }),
  down: (queryInterface) => queryInterface.bulkDelete('asset', null, {}),
};
