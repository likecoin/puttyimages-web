import { Base64 } from 'js-base64';

import { isNumber } from '../util';
import { RESULT_PER_PAGE } from '../../constant';
import { ValidationError } from '../models/validator';

export const getPageInfo = ({ after, baseUrl, before, totalCount } = {}) => {
  if (!baseUrl || totalCount === undefined) {
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

export const parseKeyword = (q) => {
  const keywords = [];
  const tags = [];
  const users = [];
  q.split(' ').forEach((word) => {
    if (word.length) {
      if (word[0] === '#') {
        tags.push(`%${word.slice(1)}%`);
      } else if (word[0] === '@') {
        users.push(`%${word.slice(1)}%`);
      } else {
        keywords.push(`%${word}%`);
      }
    }
  });
  return [keywords, tags, users];
};

export const parseQuery = (query) => {
  let offset = 0;
  let q = decodeURIComponent(query.q || '');
  const { after = '', before = '' } = query;
  if (!q && !(after || before)) {
    throw new ValidationError('keyword or cursor is required');
  } else if (after && before) {
    throw new ValidationError('invalid cursor');
  }
  if (after || before) {
    let cursor = null;
    try {
      cursor = JSON.parse(Base64.decode(after || before));
    } catch (e) {
      cursor = null;
    }
    if (!cursor) {
      throw new ValidationError('cannot decode cursor');
    }

    const { offset: cursorOffset, q: cursorQuery } = cursor;
    if ((after || before) && !isNumber(cursorOffset)) {
      throw new ValidationError('cannot decode cursor');
    } else if (!cursorQuery) {
      throw new ValidationError('no search keyword');
    }
    if (after) {
      offset = cursorOffset;
    }
    if (before) {
      offset = cursorOffset - RESULT_PER_PAGE;
    }
    q = cursorQuery;
  }
  return [q, offset];
};
