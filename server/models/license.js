module.exports = (sequelize, DataTypes) => {
  const license = sequelize.define(
    'license',
    {
      name: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.TEXT,
      },
      url: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return license;
};
