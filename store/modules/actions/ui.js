import axios from '~/plugins/axios';
import VueCookie from '~/plugins/vue-cookie';

import { COOKIE_EXPIRE_TIME } from '~/config/client';
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

export async function setLocale({ commit }, locale) {
  await this.app.i18n.setLocaleAsync(locale);
  if (process.client) {
    VueCookie.set('language', locale, { expires: COOKIE_EXPIRE_TIME });
    if (window.localStorage) {
      window.localStorage.language = locale;
    }
  }

  commit(types.UI_SET_LOCALE, locale);
}

export async function fetchFeaturedImages({ commit }) {
  try {
    const { data } = await axios.get('/api/assets/featured/list');
    commit(types.UI_SET_FEATURED_IMAGES, data);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}
