import Vue from 'vue';
import VueRouter from 'vue-router';
import { publicPath } from '@/common/env';

const project = 'demo2';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: `${publicPath}${project}`,
  routes: [
    {
      name: 'default',
      path: '/',
      component: () => import(/* webpackChunkName: "demo2/home" */ '../views/home')
    }
  ]
});
