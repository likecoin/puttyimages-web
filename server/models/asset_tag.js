module.exports = (sequelize, DataTypes) => {
  const assetTag = sequelize.define(
    'assetTag',
    {
      asset_fingerprint: {
        allowNull: false,
        primaryKey: true,
        references: {
          key: 'fingerprint',
          model: 'asset',
        },
        type: DataTypes.BLOB,
      },
      tag_name: {
        allowNull: false,
        primaryKey: true,
        references: {
          key: 'name',
          model: 'tag',
        },
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
      tableName: 'asset_tag',
      timestamps: false,
    }
  );
  return assetTag;
};
