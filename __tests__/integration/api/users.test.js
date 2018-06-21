const api = require('./api');

test('get users list', async () => {
  const response = await api.get('users');
  expect(response.data).toMatchSnapshot();
});

test('get user info by id', async () => {
  const response = await api.get('users/likecoin_id_1');
  expect(response.data).toMatchSnapshot();
});

test('get user info by wallet', async () => {
  const response = await api.get('users/wallet/0x0000000000000000000000000000000000000000');
  expect(response.data).toMatchSnapshot();
});

test('post user login', async () => {
  const response = await api.post('users/login', {
    challenge: 'local',
    signature: '0xff',
    wallet: '0x0000000000000000000000000000000000000000',
  });
  expect(response.data).toMatchSnapshot();
});
