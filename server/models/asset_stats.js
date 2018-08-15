module.exports = (sequelize, DataTypes) => {
  const assetStats = sequelize.define(
    'assetStats',
    {
      assetFingerprint: {
        allowNull: false,
        field: 'asset_fingerprint',
        primaryKey: true,
        references: {
          key: 'fingerprint',
          model: 'asset',
        },
        type: DataTypes.BLOB,
      },
      downloadCount: {
        allowNull: false,
        defaultValue: 0,
        field: 'download_count',
        type: DataTypes.INTEGER,
      },
      viewCount: {
        allowNull: false,
        defaultValue: 0,
        field: 'view_count',
        type: DataTypes.INTEGER,
      },
    },
    {
      createdAt: false,
      freezeTableName: true,
      tableName: 'asset_stats',
      timestamps: false,
    }
  );

  return assetStats;
};
