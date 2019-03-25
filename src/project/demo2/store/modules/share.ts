import { ActionTree, MutationTree } from 'vuex';

interface State {
  count: number;
  content: string;
  message: string;
}

/* eslint @typescript-eslint/no-unused-vars: 0 */
const state: State = {
  count: 0,
  content: 'vuex share content',
  message: ''
};

const getters = {
  getCount(state: State) {
    return state.count;
  },
  newContent(state: State) {
    return `${state.content}/${state.message}`;
  }
};

const actions: ActionTree<State, State> = {
  sendMessage({ commit, state, getters }, msg: string) {
    commit('writeMessage', `${msg}:${getters.getCount}`);
  }
};

const mutations: MutationTree<State> = {
  writeMessage(state: State, msg: string) {
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
