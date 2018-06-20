import { Router } from 'express';
import sequelize from '../models';
import { getUserChallenge, postUserChallenge } from '../util/auth';
import { jwtAuthNoBlock, jwtSign } from '../util/jwt';

const AUTH_COOKIE_OPTION = {
  httpOnly: true,
  maxAge: 31556926000, // 365d
  secure: process.env.production,
};

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
router.get('/users/wallet/:wallet', jwtAuthNoBlock, async (req, res, next) => {
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
    if (!payload || !payload.wallet) res.sendStatus(404);
    res.json(payload);
  } catch (err) {
    next(err);
  }
});

router.post('/users/login', async (req, res, next) => {
  try {
    const { wallet } = req.body;
    const likecoinUser = await postUserChallenge(req.body);
    const { likecoinId } = likecoinUser;
    const token = jwtSign({ createdTs: Date.now(), likecoinId, wallet });
    res.cookie('auth', token, AUTH_COOKIE_OPTION);
    res.status(200).json(likecoinUser);
    await sequelize.user.upsert(likecoinUser);
  } catch (err) {
    next(err);
  }
});

export default router;
