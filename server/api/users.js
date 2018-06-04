import { Router } from 'express';
import sequelize from '../models';

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
    const id = parseInt(req.params.id, 10);
    if (id >= 0) {
      const user = await sequelize.user.findById(id, { raw: true });
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

export default router;
