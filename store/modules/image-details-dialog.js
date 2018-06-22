/* eslint-disable no-param-reassign */

const initialState = {
  image: null,
  isOpen: false,
  isReportImage: false,
  isUseImage: false,
};

const actions = {
  setState({ commit }, newState) {
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
