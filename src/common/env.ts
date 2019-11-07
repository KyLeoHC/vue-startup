let baseUrl = '';
let staticPath = '';
const publicPath = process.env.PUBLIC_PATH || '';

switch (process.env.BUILD_ENV) {
  case 'development':
    baseUrl = 'https://easy-mock.com/mock/5c67ba51adf6a5499fb8d27d/vue-startup';
    staticPath = '/static';
    break;
  case 'test':
    baseUrl = '';
    staticPath = '/dist/static';
    break;
  case 'pre-production':
    baseUrl = '';
    staticPath = '/dist/static';
    break;
  case 'production':
    baseUrl = '';
    staticPath = '/dist/static';
    break;
}

export {
  baseUrl,
  staticPath,
  publicPath
};
