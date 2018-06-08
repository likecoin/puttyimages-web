let mockFiles = {};

const IPFSApi = {
  setMockFiles(files) {
    mockFiles = files;
  },
  files: {
    cat: jest.fn().mockImplementation((path) => Promise.resolve(mockFiles[path])),
  },
};

module.exports = IPFSApi;
