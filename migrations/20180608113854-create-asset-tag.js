module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('asset_tag', {
      asset_fingerprint: {
        type: Sequelize.BLOB,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'asset',
          key: 'fingerprint',
        },
      },
      tag_name: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'tag',
          key: 'name',
        },
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('asset_tag'),
};
