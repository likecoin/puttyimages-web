module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('tag', {
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('tag'),
};
