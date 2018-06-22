module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('asset', {
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      fingerprint: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BLOB,
      },
      license: {
        allowNull: false,
        field: 'license',
        references: {
          key: 'name',
          model: 'license',
        },
        type: Sequelize.TEXT,
      },
      ipfs: {
        allowNull: false,
        type: Sequelize.BLOB,
        unique: true,
      },
      ipld: {
        allowNull: false,
        type: Sequelize.BLOB,
        unique: true,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      wallet: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('asset'),
};
