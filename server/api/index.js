import { Router } from 'express';

import users from './users';
import assets from './assets';

const router = Router();

router.use(users);
router.use(assets);

export default router;
