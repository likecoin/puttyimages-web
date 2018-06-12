import { Router } from 'express';
import IpfsClient from '../ipfs';

const router = Router();

router.get('/assets/:id', async (req, res) => {
  const ipfs = await IpfsClient();
  // FIXME: Proof of ipfs connectivity only.
  ipfs.files.cat(req.params.id).then((_file) => {
    res.send(_file);
  });
});

export default router;
