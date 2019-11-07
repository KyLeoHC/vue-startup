import Vue from 'vue';
import VueRouter from 'vue-router';
import { publicPath } from '@/common/env';

Vue.use(VueRouter);

const project = 'demo';

/* eslint @typescript-eslint/explicit-function-return-type: 0 */
export default new VueRouter({
  mode: 'history',
  base: `${publicPath}${project}`,
  routes: [
    {
      name: 'list',
      path: '/(list)?',
      component: () => import(/* webpackChunkName: "demo/list" */ '../views/list/index.vue')
    },
    {
      name: 'detail',
      path: '/detail',
      component: () => import(/* webpackChunkName: "demo/detail" */ '../views/detail/index.vue')
    }
  ]
});
