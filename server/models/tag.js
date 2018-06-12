module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    'tag',
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );

  return tag;
};
