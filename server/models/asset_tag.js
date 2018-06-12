module.exports = (sequelize, DataTypes) => {
  const asset_user = sequelize.define( // eslint-disable-line camelcase
    'asset_tag',
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
    },
  );
  return asset_user; // eslint-disable-line camelcase
};
