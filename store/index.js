import Vuex from 'vuex';

import ImageDetailsDialog from './modules/image-details-dialog';
import ui from './modules/ui';

const store = () =>
  new Vuex.Store({
    modules: {
      ImageDetailsDialog,
      ui,
    },
  });

export default store;
