import { publicPath } from '@/common/env';

const project = 'demo';

export default {
  mode: 'history',
  base: `${publicPath}${project}`,
  routes: [
    {
      name: 'default',
      path: '/',
      component: () => import(/* webpackChunkName: "demo/list" */ './views/list')
    },
    {
      name: 'list',
      path: '/list',
      component: () => import(/* webpackChunkName: "demo/list" */ './views/list')
    },
    {
      name: 'detail',
      path: '/detail',
      component: () => import(/* webpackChunkName: "demo/detail" */ './views/detail')
    }
  ]
};
