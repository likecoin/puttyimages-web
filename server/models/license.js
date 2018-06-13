module.exports = (sequelize, DataTypes) => {
  const license = sequelize.define(
    'license',
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
      },
      url: {
        type:  DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return license;
};
