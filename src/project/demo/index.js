/* eslint no-unused-vars: 0 */
import Vue from 'vue';
import {
  loadCSSByArray
} from '@/utils';
import router from './router';
import pageRouter from '@/common/router';
import App from './app.vue';
import {
  List,
  NavBar,
  PullRefresh
} from 'vant';
// import vConsole from 'vconsole';
// new vConsole();

Vue.prototype.$$router = pageRouter;

Vue.use(List)
  .use(NavBar)
  .use(PullRefresh);

// 这里之所以会加多一段Promise.resolve().finally()冗余代码
// 是因为babel7在面对finally但是没发现Promise关键字的时候
// 就算你目标函数内部返回值是Promise，babel也不会识别出并且polyfill这个finally方法
Promise.resolve().finally();
loadCSSByArray([
  `//at.alicdn.com/t/font_1007376_mqnhabrqmch.css`,
  ...(window.__cssList || [])
]).finally(() => {
  App.router = router;
  const app = new Vue(App).$mount('#app');
});
