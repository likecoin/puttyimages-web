module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('license', {
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
      },
      url: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('license'),
};
