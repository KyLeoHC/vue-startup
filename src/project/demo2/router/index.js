import Vue from 'vue';
import VueRouter from 'vue-router';
import { publicPath } from '@/common/env';
import Home from '../views/home';

const project = 'demo2';

Vue.use(VueRouter);

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
      component: () => import(/* webpackChunkName: "demo2/vuexTest" */ '../views/vuexTest')
    },
    {
      name: 'drag',
      path: '/drag',
      component: () => import(/* webpackChunkName: "demo2/drag" */ '../views/drag')
    }
  ]
});
