import { Router } from 'express';
import { Base64 } from 'js-base64';

import sequelize from '../models';
import { ValidationError } from '../models/validator';
import { getPageInfo, isNumber } from '../util';
import { RESULT_PER_PAGE } from '../../constant';

const router = Router();
const { Op } = sequelize.Sequelize;

export const parseQuery = (q) => {
  const keywords = [];
  const tags = [];
  const users = [];
  q.split(' ').forEach((word) => {
    if (word[0] === '#') {
      tags.push(`%${word.slice(1)}%`);
    } else if (word[0] === '@') {
      users.push(`%${word.slice(1)}%`);
    } else {
      keywords.push(`%${word}%`);
    }
  });
  return [keywords, tags, users];
};

router.get('/search', async (req, res, next) => {
  const {
    headers: { host },
    protocol,
    query,
  } = req;
  let offset = 0;
  let q = decodeURIComponent(query.q || '');
  const { after = '', before = '' } = query;
  if (!q && !(after || before)) {
    return next(new ValidationError('keyword or cursor is required'));
  } else if (after && before) {
    return next(new ValidationError('invalid cursor'));
  }
  if (after || before) {
    let cursor = null;
    try {
      cursor = JSON.parse(Base64.decode(after || before));
    } catch (e) {
      cursor = null;
    }
    if (!cursor) {
      return next(new ValidationError('cannot decode cursor'));
    }

    const { offset: cursorOffset, q: cursorQuery } = cursor;
    if ((after || before) && !isNumber(offset)) {
      return next(new ValidationError('cannot decode cursor'));
    } else if (!cursorQuery) {
      return next(new ValidationError('no search keyword'));
    }
    if (after) {
      offset = cursorOffset;
    } else if (before) {
      offset = cursorOffset - RESULT_PER_PAGE;
    }
    q = cursorQuery;
  }

  const [keywords, tags, users] = parseQuery(q);
  const tagWhere = {};
  const userWhere = {};
  const where = {};
  let tagRequired = false;
  let userRequired = false;
  if (!keywords.length && !tags.length && !users.length) {
    return next(new ValidationError('no search keyword'));
  }
  if (keywords.length) {
    where.description = { [Op.iLike]: { [Op.any]: keywords } };
  }
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

  const { count, rows } = await sequelize.asset.findAndCountAll({
    distinct: true,
    include: [
      {
        as: 'like',
        attributes: [['total_like', 'count']],
        model: sequelize.assetLike,
        order: [['totalLike', 'DESC']],
        // required: true, // This should be enabled but caused bug when sorting
      },
      {
        attributes: ['name'],
        model: sequelize.tag,
        required: tagRequired,
        through: { attributes: [] },
        where: tagWhere,
      },
      {
        attributes: ['displayName', 'likecoinId'],
        model: sequelize.user,
        required: userRequired,
        where: userWhere,
      },
    ],
    limit: RESULT_PER_PAGE,
    offset,
    order: [
      [{ as: 'like', model: sequelize.assetLike }, 'totalLike', 'DESC'],
      ['updatedAt', 'DESC'],
    ],
    where,
  });

  const currentOffset = offset + rows.length;
  const hasNextPage = count > currentOffset;
  const hasPrevPage = count >= currentOffset && offset > 0;
  return res.json({
    data: rows,
    error: false,
    pageInfo: getPageInfo({
      after: hasNextPage ? { offset: offset + RESULT_PER_PAGE, q } : null,
      baseUrl: `${protocol}://${host}/api/search?q=${encodeURIComponent(q)}`,
      before: hasPrevPage ? { offset, q } : null,
      totalCount: count,
    }),
  });
});

export default router;
