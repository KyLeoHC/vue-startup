import { publicPath } from '@/common/env';

const project = 'demo2';

export default {
  mode: 'history',
  base: `${publicPath}${project}`,
  routes: [
    {
      name: 'default',
      path: '/',
      component: () => import(/* webpackChunkName: "demo2/home" */ './views/home')
    }
  ]
};
