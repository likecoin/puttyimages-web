module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('license', [
      { name: 'cc0', url: 'https://creativecommons.org/publicdomain/zero/1.0/' },
      { name: 'cc-by', url: 'https://creativecommons.org/licenses/by/4.0/' },
      { name: 'cc-by-sa', url: 'https://creativecommons.org/licenses/by-sa/4.0/' },
      { name: 'cc-by-nd', url: 'https://creativecommons.org/licenses/by-nd/4.0/' },
    ]),
  down: queryInterface => queryInterface.bulkDelete('license', null, {}),
};
