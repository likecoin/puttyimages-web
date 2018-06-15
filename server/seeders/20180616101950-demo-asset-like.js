const { tags } = require('./fixture');

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'asset_like',
      tags.map(({ name }, index) => ({
        asset_fingerprint: Buffer.from(name),
        total_like: 10 * (index % 6),
        updated_at: new Date('2018-06-20T00:00:00Z'),
      }))
    ),
  down: (queryInterface) => queryInterface.bulkDelete('asset_like', null, {}),
};
