import { Router } from 'express';

import sequelize from '../models';
import { getUserChallenge, postUserChallenge } from '../util/auth';
import { jwtAuth, jwtSign, AUTH_COOKIE_OPTION } from '../util/jwt';

const { JWT_COOKIE_KEY } = require('../../config/server');

const router = Router();

/* GET users listing. */
router.get('/users', async (req, res, next) => {
  try {
    const users = await sequelize.user.findAll({ raw: true });
    res.json(users);
  } catch (e) {
    next(e);
  }
});

/* GET user by ID. */
router.get('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await sequelize.user.findById(id, { raw: true });
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

/* GET user by wallet. */
// req with jwt: return db record
// req without jwt / no db record: return challenge
// no likecoin id: return 404
router.get(
  '/users/wallet/:wallet',
  jwtAuth({ credentialsRequired: false }),
  async (req, res, next) => {
    try {
      const { wallet } = req.params;
      if (req.user && req.user.wallet === wallet) {
        const user = await sequelize.user.findOne(
          { where: { wallet } },
          { raw: true }
        );
        if (user) {
          res.json(user);
          return;
        }
      }
      const payload = await getUserChallenge(wallet);
      if (!payload || !payload.wallet) {
        res.sendStatus(404);
        return;
      }
      res.json(payload);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/users/login', async (req, res, next) => {
  try {
    const { wallet } = req.body;
    const likecoinUser = await postUserChallenge(req.body);
    const { likecoinId } = likecoinUser;
    const token = jwtSign({ createdTs: Date.now(), likecoinId, wallet });
    await sequelize.user.upsert(likecoinUser);
    res.cookie(JWT_COOKIE_KEY, token, AUTH_COOKIE_OPTION);
    res.json(likecoinUser);
  } catch (err) {
    next(err);
  }
});

export default router;
