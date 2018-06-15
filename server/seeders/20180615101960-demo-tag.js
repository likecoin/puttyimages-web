const { tags } = require('./fixture');

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'tag',
      tags.concat([{ name: 'berry' }, { name: 'fruit' }])
    ),
  down: (queryInterface) => queryInterface.bulkDelete('tag', null, {}),
};
