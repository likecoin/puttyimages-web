module.exports = {
  up: (queryInterface, Sequelize) =>
    new Promise(async (resolve) => {
      await queryInterface.addColumn('asset', 'description', {
        type: Sequelize.TEXT,
      });
      await queryInterface.addColumn('asset', 'height', {
        type: Sequelize.INTEGER,
      });
      await queryInterface.addColumn('asset', 'width', {
        type: Sequelize.INTEGER,
      });
      await queryInterface.addConstraint('asset', ['wallet'], {
        type: 'foreign key',
        name: 'asset_wallet_fkey',
        references: {
          table: 'user',
          field: 'wallet',
        },
      });
      await queryInterface.createTable('asset_like', {
        assetFingerprint: {
          allowNull: false,
          field: 'asset_fingerprint',
          primaryKey: true,
          references: {
            key: 'fingerprint',
            model: 'asset',
          },
          type: Sequelize.BLOB,
        },
        totalLike: {
          allowNull: false,
          defaultValue: 0,
          field: 'total_like',
          type: Sequelize.INTEGER,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
      resolve();
    }),
  down: (queryInterface) =>
    new Promise(async (resolve) => {
      await queryInterface.removeColumn('asset', 'description');
      await queryInterface.removeColumn('asset', 'height');
      await queryInterface.removeColumn('asset', 'width');
      await queryInterface.removeConstraint('asset', 'asset_wallet_fkey');
      await queryInterface.dropTable('asset_like');
      resolve();
    }),
};
