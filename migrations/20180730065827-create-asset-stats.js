module.exports = {
  up: (queryInterface, Sequelize) =>
    new Promise(async (resolve) => {
      await queryInterface.createTable('asset_stats', {
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
        downloadCount: {
          allowNull: false,
          defaultValue: 0,
          field: 'download_count',
          type: Sequelize.INTEGER,
        },
        viewCount: {
          allowNull: false,
          defaultValue: 0,
          field: 'view_count',
          type: Sequelize.INTEGER,
        },
      });
      await queryInterface.addColumn('asset', 'exif', {
        type: Sequelize.JSONB,
      });
      await queryInterface.addColumn('asset', 'link', {
        type: Sequelize.TEXT,
      });
      await queryInterface.addColumn('asset', 'type', {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.TEXT,
      });
      resolve();
    }),
  down: (queryInterface) =>
    new Promise(async (resolve) => {
      await queryInterface.removeColumn('asset', 'type');
      await queryInterface.removeColumn('asset', 'link');
      await queryInterface.removeColumn('asset', 'exif');
      await queryInterface.dropTable('asset_stats');
      resolve();
    }),
};
