import IpfsClient from '../../server/ipfs';

test('should add file', async () => {
  const ipfs = await IpfsClient();
  expect(ipfs.clients[0].files.add).not.toHaveBeenCalled();

  ipfs.files.add({ path: '/file' });
  expect(ipfs.clients[0].files.add).toHaveBeenCalledTimes(1);
});

test('should cat file', async () => {
  const ipfs = await IpfsClient();
  expect(ipfs.clients[0].files.cat).not.toHaveBeenCalled();

  ipfs.files.cat('/file');
  expect(ipfs.clients[0].files.cat).toHaveBeenCalledTimes(1);
});

test('should pin file', async () => {
  const ipfs = await IpfsClient();
  expect(ipfs.clients[0].pin.add).not.toHaveBeenCalled();

  ipfs.pin.add('file hash');
  expect(ipfs.clients[0].pin.add).toHaveBeenCalledTimes(1);
});

test('should proxy dag get', async () => {
  const ipfs = await IpfsClient();
  expect(ipfs.clients[0].dag.get).not.toHaveBeenCalled();

  ipfs.dag.get('file hash');
  expect(ipfs.clients[0].dag.get).toHaveBeenCalledTimes(1);
});

test('should proxy dag put', async () => {
  const ipfs = await IpfsClient();
  expect(ipfs.clients[0].dag.put).not.toHaveBeenCalled();

  ipfs.dag.put('file hash');
  expect(ipfs.clients[0].dag.put).toHaveBeenCalledTimes(1);
});
