const devConfig = require('./config.dev');
const testConfig = require('./config.test');
const preConfig = require('./config.pre');
const productionConfig = require('./config.production');

let config = null;
switch (process.env.BUILD_ENV) {
  case 'development':
    config = devConfig;
    break;
  case 'test':
    config = testConfig;
    break;
  case 'pre-production':
    config = preConfig;
    break;
  case 'production':
    config = productionConfig;
    break;
}

module.exports = Object.assign({
  // 需要编译的入口，如果保持空数组，则默认自动扫描所有入口
  entryList: [],
  // 输出目录
  outputDirectory: 'dist',
  // 资源加载路径
  publicPath: '',
  // 是否开启bundle分析报告，可以直观观察到模块的引用情况，以进行下一步的优化
  bundleAnalyzerReport: false,
  // 执行编译任务前需要清理文件以及文件夹
  cleanFiles: ['./dist.zip', './dist'],
  // 图片等静态资源的cdn路径
  cdnPrefix: 'http://10.4.50.122:8087'
}, config);
