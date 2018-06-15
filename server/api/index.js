import { Router } from 'express';

import users from './users';
import assets from './assets';

const router = Router();

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  return res.json({
    code: err.code || 10000,
    error: true,
    message: err.message,
  });
};

router.use(users);
router.use(assets);

router.use(errorHandler);

export default router;
