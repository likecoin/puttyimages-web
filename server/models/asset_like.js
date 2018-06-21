module.exports = (sequelize, DataTypes) => {
  const assetLike = sequelize.define(
    'assetLike',
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
      totalLike: {
        allowNull: false,
        defaultValue: 0,
        field: 'total_like',
        type: DataTypes.INTEGER,
      },
    },
    {
      createdAt: false,
      freezeTableName: true,
      tableName: 'asset_like',
      timestamps: true,
    }
  );
  return assetLike;
};
