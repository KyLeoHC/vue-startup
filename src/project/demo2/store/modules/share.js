const state = {
  count: -1,
  content: 'vuex test',
  message: ''
};

const getters = {
  getCount() {
    return state.count;
  },
  newContent(state, getters) {
    return `${state.content}/${state.message || ' -- '}`;
  }
};

const actions = {
  sendClickEvent({ commit, state, getters }, msg) {
    commit('addCount');
    commit('setMessage', `${msg}:${getters.getCount}`);
  }
};

const mutations = {
  addCount(state) {
    state.count++;
  },
  setMessage(state, msg) {
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
