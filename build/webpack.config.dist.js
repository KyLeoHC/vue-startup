const path = require('path');
const config = require('../config');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OmitCSSWebpackPlugin = require('./plugins/omit-css-webpack-plugin');

baseConfig.output = {
  path: path.resolve(__dirname, '../' + config.outputDirectory),
  publicPath: config.publicPath,
  filename: '[name]/bundle.[contenthash].js',
  chunkFilename: '[name]/chunk.[contenthash].js'
};

baseConfig.optimization = {
  chunkIds: 'size',
  moduleIds: 'hashed',
  runtimeChunk: 'single',
  splitChunks: {
    name: true,
    chunks: 'initial', // 此处本来用all是最优解，但是由于webpack对异步文件公共模块生成的目录路径比较诡异，暂时不用all
    cacheGroups: {
      vendor: {
        name: 'vendor',
        chunks: 'all',
        enforce: true,
        test: /[\\/]node_modules[\\/]/
      },
      common: {
        name: 'common',
        chunks: 'all',
        enforce: true, // 如果不设置这个enforce值，webpack内部会有个自动优化机制，模块数量达到一定数量时，当前配置会被webpack自动调整，生成的chunk会有所不一样
        test: /[\\/]src[\\/](common|utils|services|directives|components)[\\/]/
      }
    }
  },
  minimizer: [
    new TerserPlugin({
      // more options:
      // https://github.com/terser-js/terser
      parallel: true,
      terserOptions: {
        compress: {
          drop_console: true
        },
        output: {
          comments: false
        }
      }
    })
  ]
};

Object.keys(baseConfig.entry).forEach(name => {
  baseConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${name}/index.html`,
      template: `./src/project/${name}/index.html`,
      chunksSortMode: 'dependency',
      chunks: ['runtime', 'vendor', 'common', name],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  );
});

baseConfig.plugins = baseConfig.plugins.concat([
  new InlineSourceWebpackPlugin({
    // more options:
    // https://github.com/KyLeoHC/inline-source-webpack-plugin
    compress: true,
    rootpath: './src'
  }),
  new OmitCSSWebpackPlugin(),
  new OptimizeCSSAssetsPlugin({}),
  new MiniCssExtractPlugin({
    filename: '[name]/bundle.[contenthash].css',
    chunkFilename: '[name]/chunk.[contenthash].css'
  })
]);

if (config.copyStaticDirectory) {
  baseConfig.plugins.push(new CopyWebpackPlugin([{
    from: path.resolve(__dirname, '../static'),
    to: 'static',
    ignore: ['.*']
  }]));
}

if (config.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  baseConfig.plugins.push(new BundleAnalyzerPlugin());
}

// baseConfig.devtool = 'source-map';
baseConfig.mode = 'production';

module.exports = baseConfig;
