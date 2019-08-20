/*
 * project router
 * @author KyLeo
 */
import { publicPath } from './env';

const router = {
  history: true,
  generateUrl({ history = this.history, project = '', path = '', query = {} }) {
    const queryList = [];
    Object.keys(query).forEach(key => {
      queryList.push(`${key}=${encodeURIComponent(query[key])}`);
    });
    return history
      ? `//${location.host}${publicPath}${project}${path}?${queryList.join('&')}`
      : `//${location.host}${publicPath}${project}/index.html#${path || '/'}?${queryList.join('&')}`;
  },
  push(options) {
    const url = this.generateUrl(options);
    if (options.isNewWindow) {
      window.open(url);
    } else {
      location.href = url;
    }
  },
  replace(options) {
    location.replace(this.generateUrl(options));
  }
};

export default router;
