const { licenses, tags } = require('./fixture');

const fixedDate = new Date('2018-06-20T00:00:00Z');

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'asset',
      tags.map(({ name }, index) => ({
        created_at: new Date(+fixedDate + 600000 * index),
        description: `${name}`,
        fingerprint: Buffer.from(name),
        license: licenses[index % licenses.length],
        ipfs: Buffer.from(`ipfs ${index}`),
        ipld: Buffer.from(`ipld ${index}`),
        updated_at: new Date(+fixedDate + 600000 * index),
        wallet: `address ${(index % 3) + 1}`,
      }))
    ),
  down: (queryInterface) => queryInterface.bulkDelete('asset', null, {}),
};
