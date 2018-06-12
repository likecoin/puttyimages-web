module.exports = (sequelize, DataTypes) => {
  const asset = sequelize.define(
    'asset',
    {
      fingerprint: {
        type: DataTypes.BLOB,
        allowNull: false,
        primaryKey: true,
      },
      ipfs: {
        type: DataTypes.BLOB,
        allowNull: false,
        unique: true,
      },
      ipld: {
        type: DataTypes.BLOB,
        allowNull: false,
        unique: true,
      },
      wallet: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      fk_asset_license: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
          model: 'license',
          key: 'name',
        },
      },
    },
    {
      freezeTableName: true,
    },
  );
  asset.associate = (models) => {
    asset.belongsTo(models.license, { foreignKey: 'name' });
  };
  return asset;
};
