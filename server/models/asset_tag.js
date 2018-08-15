module.exports = (sequelize, DataTypes) => {
  const assetTag = sequelize.define(
    'assetTag',
    {
      assetFingerprint: {
        allowNull: false,
        field: 'asset_fingerprint',
        primaryKey: true,
        references: {
          key: 'fingerprint',
          model: 'asset',
          onDelete: 'cascade',
        },
        type: DataTypes.BLOB,
      },
      tagName: {
        allowNull: false,
        field: 'tag_name',
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
