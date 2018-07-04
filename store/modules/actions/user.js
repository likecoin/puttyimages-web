import axios from '@/plugins/axios';

import * as types from '@/store/mutation-types';
import ethUtil from '@/util/ethUtil';

export async function checkIsUser({ commit }, wallet) {
  try {
    const res = await axios.get(`/api/users/wallet/${wallet}`);
    const user = res.data;
    if (!user.challenge) {
      commit(types.USER_SET_USER_INFO, user);
    } else {
      commit(types.USER_SET_IS_AUTH_NEEDED, true);
    }
  } catch (err) {
    // wallet owner is not likecoin user
    commit(types.USER_SET_IS_REGISTERED_NEEDED, true);
  }
}

export async function loginUser({ commit, state }, wallet) {
  let user;

  try {
    const res = await axios.get(`/api/users/wallet/${wallet}`);
    user = res.data;
  } catch (err) {
    // wallet owner is not likecoin user
    commit(types.USER_SET_IS_REGISTERED_NEEDED, true);
    return;
  }
  if (state.isRegisterNeeded) {
    commit(types.USER_SET_IS_REGISTERED_NEEDED, false);
  }

  if (user.challenge) {
    let signature;
    try {
      signature = await ethUtil.signLogin(user.challenge);
    } catch (err) {
      // Reject signing
      this.$router.go(-1);
      return;
    }

    try {
      const res = await axios.post('/api/users/login', {
        ...user,
        signature,
      });
      user = res.data;

      commit(types.USER_SET_IS_AUTH_NEEDED, false);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }

  commit(types.USER_SET_USER_INFO, user);
}

export async function updateWallet(ctx, wallet) {
  const { state, commit } = ctx;
  try {
    if (state.wallet !== wallet) {
      commit(types.USER_SET_USER_INFO, {});
    }
    commit(types.USER_SET_LOCAL_WALLET, wallet);

    if (!state.wallet) return;
    await checkIsUser(ctx, wallet);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
