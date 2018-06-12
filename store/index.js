/* eslint no-param-reassign: "off" */
import Vuex from 'vuex';
import ui from './modules/ui';

const store = () => new Vuex.Store({
  modules: {
    ui,
  },
});

export default store;
