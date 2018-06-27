import bs58 from 'bs58';

import { RESULT_PER_PAGE } from '../../constant';
import { ValidationError } from './validator';
import { parseKeyword } from '../util/paginator';

module.exports = (sequelize, DataTypes) => {
  const { Op } = sequelize.Sequelize;

  const asset = sequelize.define(
    'asset',
    {
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
      },
      description: DataTypes.TEXT,
      fingerprint: {
        allowNull: false,
        get() {
          return Buffer.from(this.getDataValue('fingerprint'), 'hex').toString(
            'hex'
          );
        },
        primaryKey: true,
        type: DataTypes.BLOB,
      },
      height: DataTypes.INTEGER,
      ipfs: {
        allowNull: false,
        get() {
          return bs58.encode(Buffer.from(this.getDataValue('ipfs'), 'hex'));
        },
        type: DataTypes.BLOB,
        unique: true,
      },
      ipld: {
        allowNull: false,
        get() {
          return bs58.encode(Buffer.from(this.getDataValue('ipld'), 'hex'));
        },
        type: DataTypes.BLOB,
        unique: true,
      },
      license: {
        allowNull: false,
        references: {
          key: 'name',
          model: 'license',
        },
        type: DataTypes.TEXT,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: DataTypes.DATE,
      },
      url: {
        get() {
          const hash = bs58.encode(
            Buffer.from(this.getDataValue('ipfs'), 'hex')
          );
          return `${process.env.CDN_HOST}/ipfs/${hash}`;
        },
        type: DataTypes.VIRTUAL,
      },
      wallet: {
        allowNull: false,
        references: {
          key: 'wallet',
          model: 'user',
        },
        type: DataTypes.TEXT,
        unique: true,
      },
      width: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  asset.getQueryInclude = (db, tags = [], users = []) => {
    const tagWhere = {};
    const userWhere = {};
    let tagRequired = false;
    let userRequired = false;
    if (tags.length) {
      tagRequired = true;
      tagWhere.name = { [Op.iLike]: { [Op.any]: tags } };
    }
    if (users.length) {
      userRequired = true;
      userWhere[Op.or] = {
        displayName: { [Op.iLike]: { [Op.any]: users } },
        likecoinId: { [Op.iLike]: { [Op.any]: users } },
      };
    }
    return [
      {
        as: 'like',
        attributes: [['total_like', 'count']],
        model: db.assetLike,
        order: [['totalLike', 'DESC']],
        // required: true, // This should be enabled but caused bug when sorting
      },
      {
        attributes: ['name'],
        model: db.tag,
        through: { attributes: [] },
      },
      {
        as: 'queryTags',
        attributes: [],
        model: db.tag,
        required: tagRequired,
        through: { attributes: [] },
        where: tagWhere,
      },
      {
        attributes: ['displayName', 'likecoinId'],
        model: db.user,
        required: userRequired,
        where: userWhere,
      },
    ];
  };

  asset.getMetaById = async (models, id) => {
    const res = await models.asset.findById(Buffer.from(id, 'hex'), {
      include: models.asset.getQueryInclude(models),
    });
    return res.toJSON();
  };

  asset.searchByKeyword = async (models, q, offset) => {
    const [keywords, tags, users] = parseKeyword(q);
    const where = {};
    if (!keywords.length && !tags.length && !users.length) {
      throw new ValidationError('no search keyword');
    }
    if (keywords.length) {
      where.description = { [Op.iLike]: { [Op.any]: keywords } };
    }

    return models.asset.findAndCountAll({
      distinct: true,
      include: models.asset.getQueryInclude(models, tags, users),
      limit: RESULT_PER_PAGE,
      offset,
      order: [
        [{ as: 'like', model: models.assetLike }, 'totalLike', 'DESC'],
        ['updatedAt', 'DESC'],
        [models.tag, models.assetTag, 'tag_name', 'ASC'],
      ],
      where,
    });
  };

  return asset;
};
