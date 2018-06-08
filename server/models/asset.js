module.exports = (sequelize, DataTypes) => {
  const asset = sequelize.define(
    'asset',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      fingerprint: {
        type: DataTypes.BLOB,
        allowNull: false,
        unique: true,
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
      license_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    },
  );

  return asset;
};
