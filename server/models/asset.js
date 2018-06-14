module.exports = (sequelize, DataTypes) => {
  const asset = sequelize.define(
    'asset',
    {
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      fingerprint: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BLOB,
      },
      fkAssetLicense: {
        allowNull: false,
        field: 'fk_asset_license',
        references: {
          key: 'name',
          model: 'license',
        },
        type: DataTypes.TEXT,
      },
      ipfs: {
        allowNull: false,
        type: DataTypes.BLOB,
        unique: true,
      },
      ipld: {
        allowNull: false,
        type: DataTypes.BLOB,
        unique: true,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      wallet: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return asset;
};
