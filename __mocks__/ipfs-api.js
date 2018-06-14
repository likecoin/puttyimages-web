class IPFSApi {
  constructor(host, port, opts = {}) {
    const { protocol = '' } = opts;
    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.mockFiles = {
      '/file': {
        content: 'file content',
        hash: 'file hash',
        path: '/file',
        size: 12,
      },
    };
  }

  setMockFiles = (files) => {
    this.mockFiles = files;
  };

  id = jest.fn().mockImplementation(() =>
    Promise.resolve({
      addresses: [
        '/ip4/127.0.0.1/tcp/4001/ipfs/QmSvsumZkbvYqKj8fxfBhVLiPbMHmxwyhHpWRBqwFgA7r7',
        '/ip4/172.23.0.3/tcp/4001/ipfs/QmSvsumZkbvYqKj8fxfBhVLiPbMHmxwyhHpWRBqwFgA7r7',
      ],
      agentVersion: 'go-ipfs/0.4.15/',
      id: 'QmSvsumZkbvYqKj8fxfBhVLiPbMHmxwyhHpWRBqwFgA7r7',
      protocolVersion: 'ipfs/0.1.0',
      publicKey: 'secrest',
    })
  );

  bootstrap = {
    add: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  files = {
    add: jest
      .fn()
      .mockImplementation(({ path }) => Promise.resolve(this.mockFiles[path])),
    cat: jest
      .fn()
      .mockImplementation((path) =>
        Promise.resolve(this.mockFiles[path].content)
      ),
  };

  pin = {
    add: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  dag = {
    get: jest
      .fn()
      .mockImplementation((cid, path, options) =>
        Promise.resolve(cid, path, options)
      ),
    put: jest
      .fn()
      .mockImplementation((dagNode, options) =>
        Promise.resolve(dagNode, options)
      ),
  };
  swarm = {
    localAddrs: jest
      .fn()
      .mockImplementation(() => Promise.resolve('localAddrs')),
  };
}

export default (...args) => new IPFSApi(...args);
