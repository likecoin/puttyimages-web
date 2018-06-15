module.exports = (sequelize, DataTypes) => {
  const asset = sequelize.define(
    'asset',
    {
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
      },
      description: DataTypes.TEXT,
      fingerprint: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BLOB,
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
      license: {
        allowNull: false,
        references: {
          key: 'name',
          model: 'license',
        },
        type: DataTypes.TEXT,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: DataTypes.DATE,
      },
      wallet: {
        allowNull: false,
        references: {
          key: 'wallet',
          model: 'user',
        },
        type: DataTypes.TEXT,
        unique: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return asset;
};
