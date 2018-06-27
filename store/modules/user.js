/* eslint-disable no-param-reassign */
import * as actions from './actions/user';
import * as getters from './getters/user';
import * as types from '../mutation-types';

const userState = {
  user: {},
  wallet: '',
};

const mutations = {
  [types.USER_SET_LOCAL_WALLET](state, wallet) {
    state.wallet = wallet;
  },
  [types.USER_SET_USER_INFO](state, user) {
    state.user = user;
  },
};

export default {
  actions,
  getters,
  mutations,
  state: userState,
};
