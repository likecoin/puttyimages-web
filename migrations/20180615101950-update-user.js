module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.dropTable('user'),
    queryInterface.createTable('user', {
      displayName: {
        allowNull: false,
        field: 'display_name',
        type: Sequelize.TEXT,
      },
      likecoinId: {
        allowNull: false,
        field: 'likecoin_id',
        primaryKey: true,
        type: Sequelize.TEXT,
      },
      wallet: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true,
      },
    }),
  ],
  down: (queryInterface, Sequelize) => [
    queryInterface.dropTable('user'),
    queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
    }),
  ],
};
