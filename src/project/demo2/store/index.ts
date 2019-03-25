import Vue from 'vue';
import Vuex from 'vuex';
import share from './modules/share';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    share
  },
  strict: process.env.BUILD_ENV === 'development'
});
