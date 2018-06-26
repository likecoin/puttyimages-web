const api = require('./api');

test('get asset info', async () => {
  const response = await api.get(
    'assets/04f01eb90f7be1b1628218c5a9f1f87c5704bc79548f15673695a3e7264ba88b'
  );
  expect(response.data).toMatchSnapshot();
});
