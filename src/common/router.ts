/*
 * project router
 * @author KyLeo
 */
import { publicPath } from './env';

/* eslint @typescript-eslint/no-explicit-any: 0 */
interface RouterOptions {
  isNewWindow?: boolean;
  history?: boolean;
  project?: string;
  path?: string;
  query?: {
    [key: string]: any;
  };
}

interface Router {
  history: boolean;

  generateUrl(options: RouterOptions): string;

  push(options: RouterOptions): void;

  replace(options: RouterOptions): void;
}

const router: Router = {
  history: true,
  generateUrl(
    this: Router,
    {
      history = this.history,
      project = '',
      path = '',
      query = {}
    }: RouterOptions
  ): string {
    const queryList = [];
    for (let key in query) {
      queryList.push(`${key}=${encodeURIComponent(query[key])}`);
    }
    return history
      ? `//${location.host}${publicPath}${project}${path}?${queryList.join('&')}`
      : `//${location.host}${publicPath}${project}/index.html#${path || '/'}?${queryList.join('&')}`;
  },
  push(options: RouterOptions): void {
    const url = this.generateUrl(options);
    if (options.isNewWindow) {
      window.open(url);
    } else {
      location.href = url;
    }
  },
  replace(options: RouterOptions): void {
    location.replace(this.generateUrl(options));
  }
};

export default router;
