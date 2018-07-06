/* eslint-disable no-param-reassign */
import * as actions from './actions/ui';
import * as getters from './getters/ui';
import * as types from '../mutation-types';

const uiState = {
  errorMessage: '',
  featuredImages: [],
  locale: '',
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
  [types.UI_SET_LOCALE](state, locale) {
    state.locale = locale;
  },
  [types.UI_SET_FEATURED_IMAGES](state, images) {
    state.featuredImages = images;
  },
};

export default {
  actions,
  getters,
  mutations,
  state: uiState,
};
