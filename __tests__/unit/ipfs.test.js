const ipfs = require('ipfs-api');

const MOCK_FILE_INFO = {
  '/file': 'file content',
};

test('should cat file', () => {
  ipfs.setMockFiles(MOCK_FILE_INFO);
  expect(ipfs.files.cat).not.toHaveBeenCalled();

  return ipfs.files.cat('/file').then((file) => {
    expect(file).toEqual('file content');
    expect(ipfs.files.cat).toHaveBeenCalledTimes(1);
  });
});
