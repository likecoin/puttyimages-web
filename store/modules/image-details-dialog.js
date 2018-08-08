/* eslint-disable no-param-reassign */
import axios from '../../plugins/axios';

const initialState = {
  image: {
    createdAt: '',
    description: '',
    fingerprint: '',
    height: 0,
    ipfs: '',
    ipld: '',
    license: '',
    like: {
      count: 0,
    },
    tags: [],
    updatedAt: '',
    url: '',
    user: {
      avatar: null,
      displayName: '',
      likecoinId: '',
      wallet: '',
    },
    wallet: '',
    width: 0,
  },
  isError: false,
  isFetched: false,
  isFetching: false,
  isOpen: false,
  isReportImage: false,
  isUseImage: false,
};

const actions = {
  async downloadImage(_, assetFingerprint) {
    try {
      await axios.post(`/api/assets/${assetFingerprint}/download`);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  },
  async setState({ commit }, inputState) {
    const {
      isError = false,
      isFetched = true,
      isOpen = true,
      isReportImage = false,
      isUseImage = false,
    } = inputState;

    const newState = {
      isError,
      isOpen,
      isReportImage,
      isUseImage,
    };

    if (isOpen) {
      newState.image = inputState.image;
      if (!isFetched) {
        commit('setState', {
          ...initialState,
          isFetching: true,
        });
        try {
          const res = await axios.get(
            `/api/assets/${newState.image.fingerprint}`
          );
          newState.image = res.data;
        } catch (err) {
          newState.isError = true;
        }
      }
    }

    newState.isFetched = true;
    newState.isFetching = false;

    commit('setState', newState);
  },
  toggleImageDetailsDialog: {
    handler({ dispatch }, newState) {
      return dispatch('setState', newState);
    },
    root: true,
  },
  async viewImage(_, assetFingerprint) {
    try {
      await axios.post(`/api/assets/${assetFingerprint}/view`);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  },
};

const getters = {
  getIsImageDetailsDialogOpen({ isOpen }) {
    return isOpen;
  },
};

const mutations = {
  setState(state, newState) {
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state: initialState,
};
