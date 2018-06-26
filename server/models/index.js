require('babel-register')({
  ignore: /node_modules\/(?!image-type|js-sha256)/, // only import modules needed by models
});

const Sequelize = require('sequelize');

const { NODE_ENV } = process.env;
const config = require('../../config/database');

const asset = require('./asset');
const assetLike = require('./asset_like');
const assetTag = require('./asset_tag');
const license = require('./license');
const tag = require('./tag');
const user = require('./user');

const sequelize = new Sequelize({
  ...config.development,
  logging: NODE_ENV === 'development',
  operatorsAliases: false,
  timezone: '+00:00',
});

const db = {};
db.asset = sequelize.import('asset', asset);
db.assetLike = sequelize.import('assetLike', assetLike);
db.assetTag = sequelize.import('assetTag', assetTag);
db.license = sequelize.import('license', license);
db.tag = sequelize.import('tag', tag);
db.user = sequelize.import('user', user);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.asset.belongsTo(db.license, { as: 'assetLicense', foreignKey: 'license' });
db.asset.belongsTo(db.user, { foreignKey: 'wallet', targetKey: 'wallet' });
db.asset.hasOne(db.assetLike, { as: 'like', foreignKey: 'asset_fingerprint' });
db.assetLike.belongsTo(db.asset, { foreignKey: 'asset_fingerprint' });
db.license.hasMany(db.asset, { foreignKey: 'license' });

db.asset.belongsToMany(db.tag, {
  foreignKey: 'asset_fingerprint',
  through: db.assetTag,
  timestamps: false,
});
db.asset.belongsToMany(db.tag, {
  as: 'queryTags',
  foreignKey: 'asset_fingerprint',
  through: db.assetTag,
  timestamps: false,
});
db.tag.belongsToMany(db.asset, {
  foreignKey: 'tag_name',
  through: db.assetTag,
  timestamps: false,
});

module.exports = db;
