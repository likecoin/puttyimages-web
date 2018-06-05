const api = require('./api');

test('get users list', async () => {
  const response = await api.get('users');
  expect(response.data).toMatchSnapshot();
});

test('get user info by id', async () => {
  const response = await api.get('users/1');
  expect(response.data).toMatchSnapshot();
});
