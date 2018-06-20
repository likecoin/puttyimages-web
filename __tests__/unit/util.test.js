const { isNumber, getPageInfo } = require('../../server/util');

test('isNumber', () => {
  expect(isNumber(1)).toBeTruthy();
  expect(isNumber(0.1)).toBeTruthy();
  expect(isNumber('1')).toBeTruthy();
  expect(isNumber('0.1')).toBeTruthy();

  expect(isNumber('.1')).toBeFalsy();
  expect(isNumber('..1')).toBeFalsy();
});

test('getPageInfo', () => {
  const baseUrl = 'http://localhost:3000/api/search?q=keyword';
  const after = { offset: 10, q: 'keyword' };
  const before = { offset: 0, q: 'keyword' };
  const totalCount = 10;
  expect(() => getPageInfo()).toThrow();
  expect(() => getPageInfo({ baseUrl })).toThrow();
  expect(() => getPageInfo({ baseUrl, totalCount })).not.toThrow();

  expect(getPageInfo({ after, baseUrl, before, totalCount })).toMatchSnapshot();
  expect(getPageInfo({ after, baseUrl, totalCount })).toMatchSnapshot();
  expect(getPageInfo({ baseUrl, before, totalCount })).toMatchSnapshot();
  expect(getPageInfo({ baseUrl, totalCount })).toMatchSnapshot();
});
