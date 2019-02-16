import { publicPath } from '@/common/env';

const project = 'demo';
const getPath = path => `${publicPath}${project}${path || '/'}`;

export default {
  mode: 'history',
  routes: [
    {
      name: 'default',
      path: getPath(),
      component: () => import(/* webpackChunkName: "demo/list" */ './views/list')
    },
    {
      name: 'list',
      path: getPath('/list'),
      component: () => import(/* webpackChunkName: "demo/list" */ './views/list')
    },
    {
      name: 'detail',
      path: getPath('/detail'),
      component: () => import(/* webpackChunkName: "demo/detail" */ './views/detail')
    }
  ]
};
