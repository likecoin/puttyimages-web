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
      displayName: '',
      likecoinId: '',
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
    const { isFetched, isOpen } = newState;
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
    newState.isFetched = true;
    newState.isFetching = false;
    commit('setState', newState);
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
