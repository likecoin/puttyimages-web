/* eslint-disable no-param-reassign */
import { toDataUrl } from '@likecoin/ethereum-blockies';

import * as actions from './actions/user';
import * as getters from './getters/user';
import * as types from '../mutation-types';

const userState = {
  isAuthNeeded: false,
  isRegisterNeeded: false,
  user: {},
  wallet: '',
};

const mutations = {
  [types.USER_SET_LOCAL_WALLET](state, wallet) {
    state.wallet = wallet;
  },
  [types.USER_SET_USER_INFO](state, user = {}) {
    if (!user.avatar && user.wallet) {
      user.avatar = toDataUrl(user.wallet);
    }
    state.user = user;
  },
  [types.USER_SET_IS_REGISTERED_NEEDED](state, isRegisterNeeded) {
    state.isRegisterNeeded = isRegisterNeeded;
  },
  [types.USER_SET_IS_AUTH_NEEDED](state, isAuthNeeded) {
    state.isAuthNeeded = isAuthNeeded;
  },
};

export default {
  actions,
  getters,
  mutations,
  state: userState,
};
