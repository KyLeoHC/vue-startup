let baseUrl = '';
let staticPath = '';
let publicPath = process.env.PUBLIC_PATH || '';

switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://10.240.1.138:7300/mock/5c6e56dce7ff53105cabaedc/vue-startup';
    staticPath = '/static';
    break;
  case 'test':
    baseUrl = 'http://10.240.1.138:7300/mock/5c6e56dce7ff53105cabaedc/vue-startup';
    staticPath = '/dist/static';
    break;
  case 'pre-production':
    baseUrl = 'http://10.240.1.138:7300/mock/5c6e56dce7ff53105cabaedc/vue-startup';
    staticPath = '/dist/static';
    break;
  case 'production':
    baseUrl = 'http://10.240.1.138:7300/mock/5c6e56dce7ff53105cabaedc/vue-startup';
    staticPath = '/dist/static';
    break;
}

export {
  baseUrl,
  staticPath,
  publicPath
};
