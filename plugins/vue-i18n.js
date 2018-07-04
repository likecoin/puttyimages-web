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

const setI18nLocale = (i18n, locale) => {
  i18n.locale = locale;
  axios.defaults.headers.common['Accept-Language'] = locale;

  return locale;
};

async function loadLocaleAsync(i18n, locale) {
  if (!i18n.loadedLanguages) {
    i18n.loadedLanguages = [DEFAULT_LOCALE];
  }

  if (!i18n.loadedLanguages.includes(locale)) {
    const msgs = await import(/* webpackChunkName: "locale-[request]" */ `@/locales/client/${locale}`);
    i18n.setLocaleMessage(locale, msgs);
    i18n.loadedLanguages.push(locale);
  }
  return setI18nLocale(i18n, locale);
}

export default async ({ app, store, req, res, query }) => {
  let locale = DEFAULT_LOCALE;

  if (!process.server) {
    let navLang =
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      DEFAULT_LOCALE;

    navLang = navLang.toLowerCase();
    SUPPORTED_LOCALES.forEach((key) => {
      if (navLang.includes(key)) {
        navLang = key;
      }
    });

    locale =
      query.language ||
      (window.localStorage && window.localStorage.language) ||
      navLang;

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
  app.i18n.loadLocaleAsync = (lang) => loadLocaleAsync(app.i18n, lang);

  await app.i18n.loadLocaleAsync(locale);
  store.dispatch('setLocale', locale);
};
