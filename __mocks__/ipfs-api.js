class IPFSApi {
  constructor(host, port, opts = {}) {
    const { protocol = '' } = opts;
    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.mockFiles = {};
  }
  setMockFiles = (files) => {
    this.mockFiles = files;
  }
  files = {
    add: jest.fn().mockImplementation(({ path }) => Promise.resolve(this.mockFiles[path])),
    cat: jest.fn().mockImplementation((path) => Promise.resolve(this.mockFiles[path].content)),
  }
  pin = {
    add: jest.fn().mockImplementation(() => Promise.resolve()),
  }
  swarm = {
    localAddrs: jest.fn().mockImplementation(() => Promise.resolve('localAddrs')),
  }
}

export default (...args) => new IPFSApi(...args);
