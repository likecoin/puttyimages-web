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
  async setState({ commit }, newState) {
    const { isFetched = true, isOpen = true } = newState;
    if (isOpen && !isFetched) {
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
    newState.isOpen = isOpen;
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
  mutations,
  namespaced: true,
  state: initialState,
};
