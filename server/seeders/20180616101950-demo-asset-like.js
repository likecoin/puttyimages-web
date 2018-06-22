const { ipfs, tags } = require('./fixture');

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'asset_like',
      tags.map((tag, index) => ({
        asset_fingerprint: Buffer.from(ipfs[index], 'hex'),
        total_like: 10 * (index % 6),
        updated_at: new Date('2018-06-20T00:00:00Z'),
      }))
    ),
  down: (queryInterface) => queryInterface.bulkDelete('asset_like', null, {}),
};
