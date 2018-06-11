import IpfsClient from '../../../server/ipfs';

test('should init client', async () => {
  const ipfs = await IpfsClient();
  expect(ipfs.addrs).toBeInstanceOf(Array);
  expect(ipfs.clients).toBeInstanceOf(Array);
  expect(ipfs.addrs.length).toBeGreaterThan(0);
  expect(ipfs.clients.length).toBeGreaterThan(0);
  expect(ipfs.addAndPin).toBeInstanceOf(Function);
  expect(ipfs.files.add).toBeInstanceOf(Function);
  expect(ipfs.files.cat).toBeInstanceOf(Function);
  expect(ipfs.pin.add).toBeInstanceOf(Function);
});
