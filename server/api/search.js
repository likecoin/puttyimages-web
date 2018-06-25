import { Router } from 'express';

import models from '../models';
import { getPageInfo, parseQuery } from '../util/paginator';
import { RESULT_PER_PAGE } from '../../constant';

const { API_HOST } = process.env;
const router = Router();

router.get('/search', async (req, res, next) => {
  try {
    const [q, offset] = parseQuery(req.query);
    const { count, rows } = await models.asset.searchByKeyword(
      models,
      q,
      offset
    );
    const currentOffset = offset + rows.length;
    const hasNextPage = count > currentOffset;
    const hasPrevPage = count >= currentOffset && offset > 0;
    return res.json({
      data: rows,
      error: false,
      pageInfo: getPageInfo({
        after: hasNextPage ? { offset: offset + RESULT_PER_PAGE, q } : null,
        baseUrl: `${API_HOST}/api/search?q=${encodeURIComponent(q)}`,
        before: hasPrevPage ? { offset, q } : null,
        totalCount: count,
      }),
    });
  } catch (e) {
    return next(e);
  }
});

export default router;
