import axios from '@/plugins/axios';

import * as types from '@/store/mutation-types';
import ethUtil from '@/util/ethUtil';

async function checkIsUser(wallet) {
  try {
    return await axios.get(`api/users/wallet/${wallet}`);
  } catch (err) {
    // simply ignore, wallet owner is not likecoin user
    return null;
  }
}

export async function loginUser({ state, commit }) {
  const result = await checkIsUser(state.wallet);
  if (!result) return;

  let userInfo = result.data;
  if (userInfo.challenge) {
    let signature;
    let isLoggedIn = false;
    // force user to sign
    while (!isLoggedIn) {
      try {
        signature = await ethUtil.signLogin(userInfo.challenge); // eslint-disable-line no-await-in-loop
        isLoggedIn = true;
      } catch (err) {
        // reject signing
      }
    }

    try {
      userInfo = await axios.post('/api/users/login', {
        ...userInfo,
        signature,
      });
    } catch (err) {
      console.error(err);
    }
  }

  commit(types.USER_SET_USER_INFO, userInfo);
}

export async function onWalletChanged(ctx, wallet) {
  const { state, commit } = ctx;
  try {
    if (state.wallet !== wallet) {
      commit(types.USER_SET_USER_INFO, {});
    }
    commit(types.USER_SET_LOCAL_WALLET, wallet);

    if (!state.wallet) return;
    loginUser(ctx, wallet);
  } catch (err) {
    console.error(err);
  }
}
