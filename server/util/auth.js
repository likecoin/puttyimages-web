import * as Axios from 'axios';

const config = require('../../config/server');

const { LIKECOIN_AUTH_URL, LIKECOIN_USER_STUB } = config;

const axios = Axios.create({
  baseURL: `${LIKECOIN_AUTH_URL}`,
});

export async function getUserChallenge(queryWallet) {
  let data;
  if (LIKECOIN_AUTH_URL) {
    ({ data } = await axios.get(LIKECOIN_AUTH_URL, {
      params: { wallet: queryWallet },
    }));
  } else {
    data = Object.assign({ wallet: queryWallet }, LIKECOIN_USER_STUB);
  }
  const { challenge, wallet } = data;
  return {
    challenge,
    wallet,
  };
}

export async function postUserChallenge(payload) {
  const { challenge, signature, wallet } = payload;
  let data;
  if (LIKECOIN_AUTH_URL) {
    ({ data } = await axios.post(LIKECOIN_AUTH_URL, {
      challenge,
      signature,
      wallet,
    }));
  } else {
    data = Object.assign({ wallet }, LIKECOIN_USER_STUB);
  }
  const {
    user: likecoinId,
    displayName,
    wallet: responseWallet,
    avatar,
  } = data;
  if (!likecoinId || !displayName || wallet !== responseWallet) {
    throw new Error('POST_CHALLENGE_FAILED');
  }
  return {
    avatar,
    displayName,
    likecoinId,
    wallet: responseWallet,
  };
}
