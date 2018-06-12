module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('asset', {
      fingerprint: {
        type: Sequelize.BLOB,
        allowNull: false,
        primaryKey: true,
      },
      ipfs: {
        type: Sequelize.BLOB,
        allowNull: false,
        unique: true,
      },
      ipld: {
        type: Sequelize.BLOB,
        allowNull: false,
        unique: true,
      },
      wallet: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      fk_asset_license: {
        type: Sequelize.TEXT,
        references: {
          model: 'license',
          key: 'name',
        },
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('asset'),
};
