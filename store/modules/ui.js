/* eslint-disable no-param-reassign */
import * as actions from './actions/ui';
import * as getters from './getters/ui';
import * as types from '../mutation-types';

const uiState = {
  web3Message: '',
  web3Type: 'window',
};

const mutations = {
  [types.UI_SET_WEB3_MESSAGE](state, mesage) {
    state.web3Message = mesage;
  },
  [types.UI_SET_WEB3_TYPE](state, type) {
    state.web3Type = type;
  },
};

export default {
  actions,
  getters,
  mutations,
  state: uiState,
};
