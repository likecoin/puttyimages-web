import { Router } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import assets from './assets';
import search from './search';
import users from './users';

const router = Router();

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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

router.use(assets);
router.use(search);
router.use(users);

router.use(errorHandler);

export default router;
