const axios = require('axios');

const api = require('./api');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

test('search with empty result', async () => {
  const response = await api.get('search?q=no_result');
  expect(response.data).toMatchSnapshot();
});

test('search with keyword', async () => {
  const response = await api.get('search?q=fruit');
  expect(response.data).toMatchSnapshot();
});

test('search with tag', async () => {
  const response = await api.get('search?q=%23fruit');
  expect(response.data).toMatchSnapshot();
});

test('search with user', async () => {
  const response = await api.get('search?q=@likecoin_id_1');
  expect(response.data).toMatchSnapshot();
});

test('search with pagination', async () => {
  const response = await api.get('search?q=%23fruit');
  expect(response.data.pageInfo.hasNextPage).toBeTruthy();

  const nextResponse = await axios.get(response.data.pageInfo.next);
  expect(nextResponse.data.pageInfo.hasPrevPage).toBeTruthy();
  expect(nextResponse.data.pageInfo.hasNextPage).toBeFalsy();
  expect(nextResponse.data).toMatchSnapshot();

  const prevResponse = await axios.get(nextResponse.data.pageInfo.prev);
  expect(prevResponse.data).toMatchObject(response.data);
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
