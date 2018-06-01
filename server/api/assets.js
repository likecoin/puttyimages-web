import { Router } from 'express';
import ipfs from '../../plugins/ipfs';

const router = Router();

router.get('/assets/:id', (req, res) => {
  // FIXME: Proof of ipfs connectivity only.
  ipfs.files.cat(req.params.id).then((_file) => {
    res.send(_file);
  });
});

export default router;
