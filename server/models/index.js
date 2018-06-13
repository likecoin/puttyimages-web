const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../../config/database');

const sequelize = new Sequelize({
  ...config.development,
  operatorsAliases: false,
  timezone: '+00:00',
  define: {
    underscored: true,
  },
});

const db = {};
const isTest = global.test !== undefined;
const modelPath = `${isTest ? '' : '../'}${__dirname}`; // Fix backpack fs path
const nonModelFile = ['index.js', 'base.js', 'validator.js'];

fs.readdirSync(__dirname).forEach((file) => {
  if (nonModelFile.includes(file)) {
    return;
  }

  const model = sequelize.import(path.join(modelPath, file));
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.asset.belongsTo(db.license, { foreignKey: 'fk_asset_license' });
db.license.hasMany(db.asset, { foreignKey: 'fk_asset_license' });

db.asset.belongsToMany(db.tag, { through: 'asset_tag', timestamps: false, foreignKey: 'asset_fingerprint' });
db.tag.belongsToMany(db.asset, { through: 'asset_tag', timestamps: false, foreignKey: 'tag_name' });

module.exports = db;
