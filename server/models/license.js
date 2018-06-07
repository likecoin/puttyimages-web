module.exports = (sequelize, DataTypes) => {
  const license = sequelize.define(
    'license',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
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
