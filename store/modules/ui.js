/* eslint-disable no-param-reassign */
import * as actions from './actions/ui';
import * as getters from './getters/ui';
import * as types from '../mutation-types';

const uiState = {
  errorMessage: '',
  web3Message: '',
  web3Type: 'window',
};

const mutations = {
  [types.UI_SET_WEB3_MESSAGE](state, message) {
    state.web3Message = message;
  },
  [types.UI_SET_WEB3_TYPE](state, type) {
    state.web3Type = type;
  },
  [types.UI_SET_ERROR_MESSAGE](state, message) {
    state.errorMessage = message;
  },
  [types.UI_CLOSE_ERROR_DIALOG](state) {
    state.errorMessage = '';
  },
};

export default {
  actions,
  getters,
  mutations,
  state: uiState,
};
