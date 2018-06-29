import axios from 'axios';
import {
  LIKECHAIN_STORAGE_PROVIDER,
  LIKECHAIN_HOST,
} from '../../config/server';
import { web3Sign } from './web3';

const jsonStringify = require('json-stable-stringify');

export async function getLikeChain(payload) {
  try {
    if (process.env.NODE_ENV === 'production' || LIKECHAIN_HOST) {
      const chainRes = await axios.get(`${LIKECHAIN_HOST}/content/${payload}`);
      return chainRes;
    }
    return true;
  } catch (err) {
    console.error(err.message || err); // eslint-disable-line no-console
    throw new Error('GET_LIKECHAIN_FAILED');
  }
}

export async function postLikeChain(payload) {
  try {
    const { likeIpfs, metadata, ownerSig } = payload;
    const spSigString = jsonStringify({ likeIpfs, metadata });
    const storageProviderSig = await web3Sign(spSigString);
    if (process.env.NODE_ENV === 'production' || LIKECHAIN_HOST) {
      const chainRes = await axios.post(`${LIKECHAIN_HOST}/upload`, {
        likeIpfs,
        metadata,
        ownerSig,
        storageProvider: LIKECHAIN_STORAGE_PROVIDER,
        storageProviderSig,
      });
      return chainRes;
    }
    return true;
  } catch (err) {
    console.error(err.message || err); // eslint-disable-line no-console
    throw new Error('POST_LIKECHAIN_FAILED');
  }
}
