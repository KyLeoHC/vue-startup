const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const config = require('../config');

baseConfig.output = {
  path: path.resolve(__dirname, './'),
  publicPath: config.publicPath,
  chunkFilename: '[name]/chunk.js',
  filename: '[name]/bundle.js'
};

Object.keys(baseConfig.entry).forEach(name => {
  baseConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${name}/index.html`,
      template: `./src/project/${name}/index.html`,
      chunks: [name]
    })
  );
});

baseConfig.plugins.push(new InlineSourceWebpackPlugin({
  rootpath: './src'
}));
baseConfig.plugins.push(new webpack.NamedModulesPlugin());
baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

baseConfig.devServer = {
  hot: true,
  inline: true,
  // open: true,
  contentBase: './',
  host: '0.0.0.0',
  disableHostCheck: true,
  port: config.port,
  stats: {
    children: false
  },
  proxy: {},
  historyApiFallback: {
    rewrites: [
      {
        from: /^\/dev\/.*$/,
        to(context) {
          return context.parsedUrl.pathname.replace(/^\/dev\/([a-zA-Z]+)\/.*$/, `/dev/$1/index.html`);
        }
      },
      {
        from: /^\/dist\/.*$/,
        to(context) {
          return context.parsedUrl.pathname.replace(/^\/dist\/([a-zA-Z]+)\/.*$/, `/dist/$1/index.html`);
        }
      }
    ]
  }
};

baseConfig.mode = 'development';
baseConfig.devtool = 'cheap-module-eval-source-map';

module.exports = baseConfig;
