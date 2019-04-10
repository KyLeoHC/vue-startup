const fs = require('fs');
const path = require('path');
const glob = require('glob');
const lessToJs = require('less-vars-to-js');
const webpack = require('webpack');
const config = require('../config');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const devMode = process.env.BUILD_ENV === 'development';
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, '../src/styles/ui-theme-vars.scss'), 'utf8'),
  { stripPrefix: true }
);

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
          formatter: require('eslint-formatter-friendly')
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
        test: /\.scss/,
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
            loader: 'sass-loader'
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
                ...themeVariables
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
    modules: false,
    // Display bailout reasons
    optimizationBailout: true
  }
};

// 扫描所有入口
const entryList = config.entryList && config.entryList.length
  ? config.entryList
  : glob.sync('./src/project/*');

// 收集需要编译的入口文件
entryList.map(function (src) {
  const name = path.basename(src);
  baseConfig.entry[name] = `./src/project/${name}/index.js`;
});

// 收集需要检查样式规范的目录或者文件
const fileSuffix = '{vue,htm,html,css,sss,less,scss,sass}';
const stylelintFiles = [
  `components/**/*.${fileSuffix}`,
  `styles/**/*.${fileSuffix}`
];
Object.keys(baseConfig.entry)
  .forEach(name => {
    stylelintFiles.push(`project/${name}/**/*.${fileSuffix}`);
  });
baseConfig.plugins.push(
  new StyleLintPlugin({
    context: 'src',
    files: stylelintFiles
  })
);

module.exports = baseConfig;
