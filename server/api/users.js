import { Router } from 'express';

const router = Router();

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' },
];

/* GET users listing. */
router.get('/users', (req, res) => {
  res.json(users);
});

/* GET user by ID. */
router.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

export default router;
