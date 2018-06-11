import IpfsClient from 'ipfs-api';

const MOCK_FILE_INFO = {
  '/file': {
    content: 'file content',
    hash: 'file hash',
    path: '/file',
    size: 12,
  },
};

test('should add file', async () => {
  const ipfs = await IpfsClient();
  ipfs.setMockFiles(MOCK_FILE_INFO);
  expect(ipfs.files.add).not.toHaveBeenCalled();

  return ipfs.files.add({ path: '/file' }).then((file) => {
    expect(file).toEqual(MOCK_FILE_INFO['/file']);
    expect(ipfs.files.add).toHaveBeenCalledTimes(1);
  });
});

test('should cat file', async () => {
  const ipfs = await IpfsClient();
  ipfs.setMockFiles(MOCK_FILE_INFO);
  expect(ipfs.files.cat).not.toHaveBeenCalled();

  return ipfs.files.cat('/file').then((file) => {
    expect(file).toEqual('file content');
    expect(ipfs.files.cat).toHaveBeenCalledTimes(1);
  });
});

test('should pin file', async () => {
  const ipfs = await IpfsClient();
  expect(ipfs.pin.add).not.toHaveBeenCalled();

  return ipfs.pin.add('file hash').then(() => {
    expect(ipfs.pin.add).toHaveBeenCalledTimes(1);
  });
});
