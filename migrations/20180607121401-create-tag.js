module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      tag: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tag');
  }
};
