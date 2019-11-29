// https://github.com/michael-ciniawsky/postcss-load-config
const config = require('./config');

module.exports = {
  plugins: [
    // to edit target browsers: use "browserlist" field in package.json
    require('./build/plugins/flexible')(),
    require('autoprefixer'),
    require('postcss-url')({
      filter: /^(?!node_modules)/,
      url(asset) {
        return process.env.NODE_ENV === 'development' ? asset.url : `${config.cdnPrefix}${asset.url}`;
      }
    })
  ]
};
