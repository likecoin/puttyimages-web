module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('user', 'avatar', {
      type: Sequelize.TEXT,
    }),
  down: (queryInterface) => queryInterface.removeColumn('user', 'avatar'),
};
