module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('user', [
      { name: 'Alexandre' },
      { name: 'Pooya' },
      { name: 'Sébastien' },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('user', null, {}),
};
