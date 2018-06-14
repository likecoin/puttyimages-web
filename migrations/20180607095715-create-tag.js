module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('tag', {
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('tag'),
};
