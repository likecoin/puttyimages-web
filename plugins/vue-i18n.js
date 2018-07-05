/* eslint no-param-reassign: "off" */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';

import {
  DEFAULT_LOCALE,
  DEFAULT_MESSAGE,
  SUPPORTED_LOCALES,
} from '../locales/index';

Vue.use(VueI18n);

function setLocale(i18n, locale) {
  i18n.locale = locale;
  axios.defaults.headers.common['Accept-Language'] = locale;
}

async function setLocaleAsync(i18n, locale) {
  if (!i18n.loadedLanguages) {
    i18n.loadedLanguages = [DEFAULT_LOCALE];
  }

  if (!i18n.loadedLanguages.includes(locale)) {
    const msgs = await import(/* webpackChunkName: "locale-[request]" */ `@/locales/client/${locale}`);
    i18n.setLocaleMessage(locale, msgs);
    i18n.loadedLanguages.push(locale);
  }

  setLocale(i18n, locale);
}

export default async ({ app, store, req, res, query }) => {
  let locale = DEFAULT_LOCALE;

  if (process.client) {
    let detecedLocale =
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      DEFAULT_LOCALE;

    detecedLocale = detecedLocale.toLowerCase();
    SUPPORTED_LOCALES.forEach((key) => {
      if (detecedLocale.includes(key)) {
        detecedLocale = key;
      }
    });

    locale =
      query.language ||
      (window.localStorage && window.localStorage.language) ||
      detecedLocale;

    if (!SUPPORTED_LOCALES.includes(locale)) {
      locale = DEFAULT_LOCALE;
    }
  } else if (req) {
    locale =
      query.language ||
      (req.cookies && req.cookies.language) ||
      req.acceptsLanguages(SUPPORTED_LOCALES) ||
      DEFAULT_LOCALE;

    if (!SUPPORTED_LOCALES.includes(locale)) {
      locale = DEFAULT_LOCALE;
    }
    res.cookie('language', locale, { maxAge: 77760000000, secure: true }); // 77760000000 = 30d
  }

  app.i18n = new VueI18n({
    fallbackLocale: DEFAULT_LOCALE,
    locale,
    messages: DEFAULT_MESSAGE,
  });
  app.i18n.setLocaleAsync = (lang) => setLocaleAsync(app.i18n, lang);

  store.dispatch('setLocale', locale);
};
