module.exports = (sequelize, DataTypes) => {
  const assetTag = sequelize.define(
    'assetTag',
    {
      asset_fingerprint: {
        type: DataTypes.BLOB,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'asset',
          key: 'fingerprint',
        },
      },
      tag_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tag',
          key: 'name',
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      tableName: 'asset_tag',
    },
  );
  return assetTag;
};
