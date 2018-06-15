const { tags } = require('./fixture');

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'asset_tag',
      tags
        .map(({ name }) => ({
          asset_fingerprint: Buffer.from(name),
          tag_name: name,
        }))
        .concat(
          tags.map(({ name }) => ({
            asset_fingerprint: Buffer.from(name),
            tag_name: 'fruit',
          }))
        )
        .concat(
          tags
            .filter(({ name }) => name.indexOf('berry') > -1)
            .map(({ name }) => ({
              asset_fingerprint: Buffer.from(name),
              tag_name: 'berry',
            }))
        )
    ),
  down: (queryInterface) => queryInterface.bulkDelete('asset_tag', null, {}),
};
