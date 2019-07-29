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
baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

baseConfig.devServer = Object.assign({
  hot: true,
  inline: true,
  // open: true,
  contentBase: './',
  host: '0.0.0.0',
  disableHostCheck: true,
  stats: {
    children: false
  }
}, config.devServer);

baseConfig.mode = 'development';
baseConfig.devtool = 'cheap-module-eval-source-map';

module.exports = baseConfig;
