module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('license', {
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true,
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('license'),
};
