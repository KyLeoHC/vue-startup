let baseUrl = '';
let staticPath = '';
let publicPath = process.env.PUBLIC_PATH || '';

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'https://easy-mock.com/mock/5c67ba51adf6a5499fb8d27d/vue-startup';
    staticPath = '/static';
    break;
  case 'test':
    baseUrl = 'https://easy-mock.com/mock/5c67ba51adf6a5499fb8d27d/vue-startup';
    staticPath = '/dist/static';
    break;
  case 'pre-production':
    baseUrl = 'https://easy-mock.com/mock/5c67ba51adf6a5499fb8d27d/vue-startup';
    staticPath = '/dist/static';
    break;
  case 'production':
    baseUrl = 'https://easy-mock.com/mock/5c67ba51adf6a5499fb8d27d/vue-startup';
    staticPath = '/dist/static';
    break;
}

export {
  baseUrl,
  staticPath,
  publicPath
};
