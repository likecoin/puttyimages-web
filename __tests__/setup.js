/* eslint-disable no-console */
const Umzug = require('umzug');

const { sequelize, Sequelize } = require('../server/models');

const config = {
  migrations: {
    params: [
      sequelize.getQueryInterface(), // queryInterface
      Sequelize, // DataTypes
    ],
    path: './migrations',
    pattern: /\.js$/,
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
};
const seedConfig = {
  migrations: {
    params: [
      sequelize.getQueryInterface(), // queryInterface
      Sequelize, // DataTypes
    ],
    path: './server/seeders',
    pattern: /\.js$/,
  },
  storage: 'none',
};
const umzug = new Umzug(config);
const umzugSeed = new Umzug(seedConfig);

const setup = async () => {
  console.log('Removing old tables');
  await umzug.down({ to: 0 });

  console.log('Creating new tables');
  await umzug.up();

  console.log('Inserting seed data');
  await umzugSeed.down({ to: 0 });
  await umzugSeed.up();

  await sequelize.close();
};

module.exports = setup;
