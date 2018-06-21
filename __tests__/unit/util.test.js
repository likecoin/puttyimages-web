const { isNumber } = require('../../server/util');
const {
  getPageInfo,
  parseKeyword,
  parseQuery,
} = require('../../server/util/paginator');

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

test('parse search query', () => {
  const after = 'eyJvZmZzZXQiOjE1LCJxIjoiI2ZydWl0In0';
  const before = 'eyJvZmZzZXQiOjE1LCJxIjoiI2ZydWl0In0';

  expect(parseQuery({ q: 'fruit' })).toMatchSnapshot();
  expect(parseQuery({ q: '%23fruit' })).toMatchSnapshot();
  expect(parseQuery({ q: '@likecoin_id_1' })).toMatchSnapshot();
  expect(parseQuery({ after, q: '%23fruit' })).toMatchSnapshot();
  expect(parseQuery({ before, q: '%23fruit' })).toMatchSnapshot();

  expect(() => parseQuery({ q: '' })).toThrow();
  expect(() => parseQuery({ after, before })).toThrow();
  expect(() => parseQuery({ after, before, q: '%23fruit' })).toThrow();
});

test('parse search keyword', () => {
  expect(parseKeyword('fruit')).toMatchSnapshot();
  expect(parseKeyword('#fruit')).toMatchSnapshot();
  expect(parseKeyword('@likecoin_id_1')).toMatchSnapshot();

  const basic = parseKeyword('fruit berry');
  expect(parseKeyword('fruit   berry')).toMatchObject(basic);

  const mixed = parseKeyword('fruit #fruit @likecoin_id_1');
  expect(mixed).toMatchSnapshot();
  expect(parseKeyword('fruit   #fruit   @likecoin_id_1')).toMatchObject(mixed);
});
