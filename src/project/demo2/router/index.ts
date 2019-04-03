import Vue from 'vue';
import VueRouter from 'vue-router';
import { publicPath } from '@/common/env';
import Home from '../views/home/index.vue';

const project = 'demo2';

Vue.use(VueRouter);

/* eslint @typescript-eslint/explicit-function-return-type: 0 */
export default new VueRouter({
  mode: 'history',
  base: `${publicPath}${project}`,
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'vuexTest',
      path: '/vuexTest',
      component: () => import(/* webpackChunkName: "demo2/vuexTest" */ '../views/vuexTest/index.vue')
    },
    {
      name: 'drag',
      path: '/drag',
      component: () => import(/* webpackChunkName: "demo2/drag" */ '../views/drag/index.vue')
    }
  ]
});
