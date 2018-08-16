const api = require('./api');

test('get asset info', async () => {
  const response = await api.get(
    'assets/04f01eb90f7be1b1628218c5a9f1f87c5704bc79548f15673695a3e7264ba88b'
  );
  expect(response.data).toMatchSnapshot();
});

test('get featured assets', async () => {
  const response = await api.get('assets/featured/list');
  expect(response.data).toMatchSnapshot();
});

test('update asset view count by 1', async () => {
  const assetId =
    'a6e10e829eae95679d42ba332f026d1c9a8377fac20d38161e2f9941ba3c2370'; // stat1.png
  await api.post(`assets/${assetId}/view`);
  const response = await api.get(`assets/${assetId}`);
  const { viewCount } = response.data.stats;

  expect(viewCount).toBe(1);
});

test('update asset download count by 1', async () => {
  const assetId =
    'a6e10e829eae95679d42ba332f026d1c9a8377fac20d38161e2f9941ba3c2370'; // stat1.png
  await api.post(`assets/${assetId}/download`);
  const response = await api.get(`assets/${assetId}`);
  const { downloadCount } = response.data.stats;

  expect(downloadCount).toBe(1);
});
