import { Base64 } from 'js-base64';

export const getPageInfo = ({ after, baseUrl, before, totalCount } = {}) => {
  if (!baseUrl || !totalCount) {
    throw new Error('missing baseUrl and totalCount');
  }
  const endCursor = after ? Base64.encodeURI(JSON.stringify(after)) : null;
  const startCursor = before ? Base64.encodeURI(JSON.stringify(before)) : null;
  const nextUrl = new URL(baseUrl);
  nextUrl.searchParams.append('after', endCursor);
  const prevUrl = new URL(baseUrl);
  prevUrl.searchParams.append('before', startCursor);
  return {
    endCursor,
    hasNextPage: !!endCursor,
    hasPrevPage: !!startCursor,
    next: after ? nextUrl.href : null,
    prev: before ? prevUrl.href : null,
    startCursor,
    totalCount,
  };
};

export const isNumber = (n) => Number.isInteger(parseInt(n, 10));
