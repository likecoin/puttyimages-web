const api = require('./api');

test('get asset info', async () => {
  const response = await api.get(
    'assets/237a429bdcc5692f8887c92f8698e5128fc28b478dbca0395ed457c3f4549486'
  );
  expect(response.data).toMatchSnapshot();
});
