module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define(
    'tag',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      tag: {
        DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );

  return tag;
};
