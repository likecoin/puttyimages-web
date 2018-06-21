module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn('asset', 'description', {
      type: Sequelize.TEXT,
    }),
    queryInterface.renameColumn('asset', 'fk_asset_license', 'license'),
    queryInterface.addConstraint('asset', ['wallet'], {
      type: 'foreign key',
      name: 'asset_wallet_fkey',
      references: {
        table: 'user',
        field: 'wallet',
      },
    }),
    queryInterface.createTable('asset_like', {
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
    }),
  ],
  down: (queryInterface) => [
    queryInterface.removeColumn('asset', 'description'),
    queryInterface.renameColumn('asset', 'license', 'fk_asset_license'),
    queryInterface.removeConstraint('asset', 'asset_wallet_fkey'),
    queryInterface.dropTable('asset_like'),
  ],
};
