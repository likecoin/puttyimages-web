module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      name: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );

  return user;
};
