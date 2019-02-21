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
      name: 'article',
      path: '/article',
      component: () => import(/* webpackChunkName: "demo2/article" */ '../views/article')
    }
  ]
});
