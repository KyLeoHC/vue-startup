/* eslint no-unused-vars: 0 comma-dangle: 0 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  loadCSSByArray
} from '@/utils';
import routeConfig from './routeConfig';
import App from './app.vue';
import {
  List,
  NavBar,
  PullRefresh
} from 'vant';
// import vConsole from 'vconsole';
// new vConsole();

Vue.use(List)
  .use(NavBar)
  .use(PullRefresh);

loadCSSByArray([
  `//at.alicdn.com/t/font_1007376_mqnhabrqmch.css`,
  ...(window.__cssList || []),
]).finally(() => {
  Vue.use(VueRouter);
  App.router = new VueRouter(routeConfig);
  const app = new Vue(App).$mount('#app');
});
