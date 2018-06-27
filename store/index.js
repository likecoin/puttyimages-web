import Vuex from 'vuex';

import ImageDetailsDialog from './modules/image-details-dialog';
import ui from './modules/ui';
import user from './modules/user';

const store = () =>
  new Vuex.Store({
    modules: {
      ImageDetailsDialog,
      ui,
      user,
    },
  });

export default store;
