module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('asset', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      fingerprint: {
        type: Sequelize.BLOB,
        allowNull: false,
        unique: true,
      },
      ipfs: {
        type: Sequelize.BLOB,
        allowNull: false,
        unique: true,
      },
      ipld: {
        type: Sequelize.BLOB,
        allowNull: false,
        unique: true,
      },
      license_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('asset');
  }
};
