import ipfsAPI from 'ipfs-api';

const options = {
  host: process.env.IPFS_HOST || 'localhost',
  port: process.env.IPFS_PORT || '5001',
  protocol: process.env.IPFS_PROTO || 'http',
};

export default ipfsAPI(options);
