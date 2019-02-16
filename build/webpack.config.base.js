const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const devMode = process.env.BUILD_ENV === 'development';

process.env.NODE_ENV = devMode ? 'development' : 'production';

const baseConfig = {
  entry: {},
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      'styles': path.resolve(__dirname, '../src/styles')
    }
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, '../build/rules'),
      'node_modules'
    ]
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        exclude: [/node_modules/],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.styl/,
        exclude: /node_modules/,
        use: [
          {
            loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {}
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {}
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                // 这里可以修改vant的一些主题色
                // red: '#329a39'
                // blue: '#3eaf7c',
                // orange: '#f08d49'
              }
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
        PUBLIC_PATH: JSON.stringify(config.publicPath)
      }
    })
  ],
  stats: {
    children: false,
    chunkModules: false,
    entrypoints: false,
    modules: false
  }
};

const entryList = config.entryList && config.entryList.length
  ? config.entryList
  : glob.sync('./src/project/*');

entryList.map(function (src) {
  const name = path.basename(src);
  baseConfig.entry[name] = `./src/project/${name}/index.js`;
});

module.exports = baseConfig;
