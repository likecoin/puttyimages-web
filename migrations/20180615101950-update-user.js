module.exports = {
  up: (queryInterface, Sequelize) =>
    new Promise(async (resolve) => {
      await queryInterface.dropTable('user');
      await queryInterface.createTable('user', {
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
      });
      resolve();
    }),
  down: (queryInterface, Sequelize) =>
    new Promise(async (resolve) => {
      await queryInterface.dropTable('user');
      await queryInterface.createTable('user', {
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
      });
      resolve();
    }),
};
