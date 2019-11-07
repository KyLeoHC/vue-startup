/* eslint no-unused-vars: 0 */
import Vue, { VNode } from 'vue';
import {
  loadCSSByArray
} from '@/utils';
import polyfill from '@/common/polyfill';
import router from './router';
import App from './app.vue';
import {
  List,
  NavBar,
  PullRefresh
} from 'vant';
// import vConsole from 'vconsole';
// new vConsole();

polyfill();

Vue.use(List)
  .use(NavBar)
  .use(PullRefresh);

loadCSSByArray([
  '//at.alicdn.com/t/font_1007376_mqnhabrqmch.css',
  ...(window.__cssList || [])
]).finally((): void => {
  new Vue({
    router,
    render: (h): VNode => h(App)
  }).$mount('#app');
});
