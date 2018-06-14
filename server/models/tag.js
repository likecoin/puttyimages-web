module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    'tag',
    {
      name: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.TEXT,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  return tag;
};
