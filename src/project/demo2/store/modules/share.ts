import { ActionTree, MutationTree } from 'vuex';

interface State {
  count: number;
  content: string;
  message: string;
}

const state: State = {
  count: -1,
  content: 'vuex test',
  message: ''
};

const getters = {
  getCount(state: State): number {
    return state.count;
  },
  newContent(state: State): string {
    return `${state.content}/${state.message || ' -- '}`;
  }
};

const actions: ActionTree<State, State> = {
  sendClickEvent({ commit, getters }, msg: string): void {
    commit('addCount');
    commit('setMessage', `${msg}:${getters.getCount}`);
  }
};

const mutations: MutationTree<State> = {
  addCount(state: State): void {
    state.count++;
  },
  setMessage(state: State, msg: string): void {
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
