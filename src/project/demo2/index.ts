/* eslint no-unused-vars: 0 */
import Vue, { VNode } from 'vue';
import {
  loadCSSByArray
} from '@/utils';
import polyfill from '@/common/polyfill';
import store from './store';
import router from './router';
import App from './app.vue';
// import vConsole from 'vconsole';
// new vConsole();

polyfill();
loadCSSByArray([
  '//at.alicdn.com/t/font_1007376_mqnhabrqmch.css',
  ...(window.__cssList || [])
]).finally((): void => {
  new Vue({
    store,
    router,
    render: (h): VNode => h(App)
  }).$mount('#app');
});
