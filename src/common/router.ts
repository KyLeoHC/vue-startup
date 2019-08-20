/*
 * project router
 * @author KyLeo
 */
import { publicPath } from './env';
import { stringify } from '@/utils';

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
    const queryStr = stringify(query, { encode: true });
    return history
      ? `//${location.host}${publicPath}${project}${path}?${queryStr}`
      : `//${location.host}${publicPath}${project}/index.html#${path || '/'}?${queryStr}`;
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
