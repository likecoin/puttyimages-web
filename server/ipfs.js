import ipfsAPI from 'ipfs-api';
import url from 'url';

const defaultHost = 'http://localhost:5001';
const hosts = (process.env.IPFS_HOST || defaultHost).split(',');
const masterHosts = (
  process.env.IPFS_MASTER ||
  process.env.IPFS_HOST ||
  defaultHost
).split(',');

class IpfsClient {
  constructor(clients, masters) {
    this.clients = clients;
    this.masters = masters;
  }

  addAndPin = async (stream) => {
    const file = await this.files.add(stream);
    return this.pin.add(file.hash);
  };

  anyClient = () => {
    const i = Math.floor(Math.random() * this.clients.length);
    return this.clients[i];
  };

  files = {
    add: (stream) => Promise.race(this.masters.map((c) => c.files.add(stream))),
    cat: (path) => this.anyClient().files.cat(path),
  };

  pin = {
    add: (hash) => Promise.race(this.clients.map((c) => c.pin.add(hash))),
  };

  dag = {
    get: (cid, path, options) => this.anyClient().dag.get(cid, path, options),
    put: (dagNode, options) =>
      Promise.race(this.masters.map((c) => c.dag.put(dagNode, options))),
  };
}

const initClient = (config) => {
  const ipfsURL = url.parse(config);
  const host = ipfsURL.hostname;
  const protocol = ipfsURL.protocol.replace(':', '');
  return ipfsAPI(host, ipfsURL.port, {
    protocol,
  });
};

/**
 * boostrapClients will accept array of client as trusted peer and boostrap
 * them.
 */
const bootstrapClients = async (clients) => {
  const ids = await Promise.all(clients.map((c) => c.id()));
  const addrs = ids.map((id_) => id_.id);
  // Fire and forgot, the IPFS should already boot correctly at production
  clients.forEach((c) => {
    addrs.forEach((addr) => {
      c.bootstrap.add(`/p2p-circuit/ipfs/${addr}`);
    });
  });
};

let ipfsClient = null;

export default async () => {
  if (ipfsClient) {
    return ipfsClient;
  }
  const slaveHosts = hosts.filter((c) => masterHosts.indexOf(c) === -1);
  const slaveClients = slaveHosts.map((host) => initClient(host));
  const masterClients = masterHosts.map((host) => initClient(host));
  const allClients = slaveClients.concat(masterClients);
  await bootstrapClients(allClients);
  ipfsClient = new IpfsClient(allClients, masterClients);
  return ipfsClient;
};
