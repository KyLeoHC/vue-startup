import { publicPath } from '@/common/env';

const project = 'demo2';
const getPath = path => `${publicPath}${project}${path || '/'}`;

export default {
  mode: 'history',
  routes: [
    {
      name: 'default',
      path: getPath(),
      component: () => import(/* webpackChunkName: "demo2/home" */ './views/home')
    }
  ]
};
