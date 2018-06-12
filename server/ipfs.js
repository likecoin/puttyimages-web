import ipfsAPI from 'ipfs-api';

const defaultHost = 'http://localhost:5001';
const hosts = (process.env.IPFS_HOST || defaultHost).split(',');
const master = (
  process.env.IPFS_MASTER ||
  process.env.IPFS_HOST ||
  defaultHost
).split(',');

class IpfsClient {
  constructor(addrs, clients) {
    this.addrs = addrs;
    this.clients = clients;
  }

  addAndPin = async (stream) => {
    const file = await this.files.add(stream);
    return this.pin.add(file.hash);
  };

  files = {
    add: (stream) => {
      const masterNodes = this.clients.filter(
        ({ host }) => master.indexOf(host) > -1
      );
      return Promise.race(masterNodes.map(({ api }) => api.files.add(stream)));
    },
    cat: (path) => {
      const client = this.clients[
        Math.floor(Math.random() * this.clients.length)
      ];
      return client.api.files.cat(path);
    },
  };

  pin = {
    add: (hash) =>
      Promise.race(this.clients.map(({ api }) => api.pin.add(hash))),
  };
}

const initClient = async (config, addrs, clients) => {
  const [, protocol, host, port] = config.match(/(\w+):\/\/(\w+):(\w+)/);
  const api = ipfsAPI(host, port, { protocol });
  const [, addr] = await api.swarm.localAddrs();

  addrs.push({ addr, host });
  clients.push({ api, host });
};

const addBootstrap = async (client, addrs) => {
  const { api, host } = client;
  addrs.forEach(({ addr, addrHost }) => {
    if (addrHost !== host) {
      api.bootstrap.add(addr);
    }
  });
};

let ipfsClient = null;

export default async () => {
  if (ipfsClient) {
    return ipfsClient;
  }
  const addrs = [];
  const clients = [];
  await Promise.all(hosts.map((host) => initClient(host, addrs, clients)));
  if (clients.length > 1) {
    await Promise.all(clients.map((client) => addBootstrap(client, addrs)));
  }
  ipfsClient = new IpfsClient(addrs, clients);
  return ipfsClient;
};
