const state = {
  count: 0,
  content: 'vuex share content',
  message: ''
};

const getters = {
  getCount() {
    return state.count;
  },
  newContent(state, getters) {
    return `${state.content}/${state.message}`;
  }
};

const actions = {
  sendMessage({ commit, state, getters }, msg) {
    commit('writeMessage', `${msg}:${getters.getCount}`);
  }
};

const mutations = {
  writeMessage(state, msg) {
    state.message = msg;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
