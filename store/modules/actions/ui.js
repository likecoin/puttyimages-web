import * as types from '../../mutation-types';

export const setWeb3Message = ({ commit, state }, message) => {
  if (state.web3Message !== message) {
    commit(types.UI_SET_WEB3_MESSAGE, message);
  }
};

export const setWeb3Type = ({ commit }, type) => {
  commit(types.UI_SET_WEB3_TYPE, type);
};

export const setErrorMessage = ({ commit }, message) => {
  commit(types.UI_SET_ERROR_MESSAGE, message);
};

export const closeErrorDialog = ({ commit }) => {
  commit(types.UI_CLOSE_ERROR_DIALOG);
};

export const setLocale = ({ commit }, locale) => {
  commit(types.UI_SET_LOCALE, locale);
};
