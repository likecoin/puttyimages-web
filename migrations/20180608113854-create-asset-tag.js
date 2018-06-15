module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('asset_tag', {
      asset_fingerprint: {
        allowNull: false,
        primaryKey: true,
        references: {
          key: 'fingerprint',
          model: 'asset',
        },
        type: Sequelize.BLOB,
      },
      tagName: {
        allowNull: false,
        field: 'tag_name',
        primaryKey: true,
        references: {
          key: 'name',
          model: 'tag',
        },
        type: Sequelize.TEXT,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('asset_tag'),
};
