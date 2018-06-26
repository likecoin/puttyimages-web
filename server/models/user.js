module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      avatar: {
        type: DataTypes.TEXT,
      },
      displayName: {
        allowNull: false,
        field: 'display_name',
        type: DataTypes.TEXT,
      },
      likecoinId: {
        allowNull: false,
        field: 'likecoin_id',
        primaryKey: true,
        type: DataTypes.TEXT,
      },
      wallet: {
        allowNull: false,
        type: DataTypes.TEXT,
        unique: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return user;
};
