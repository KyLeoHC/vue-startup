module.exports = {
  // 开发环境需要编译的模块
  entryList: [],
  publicPath: '/dev/',
  bundleAnalyzerReport: false,
  devServer: {
    // more options:
    // https://webpack.js.org/configuration/dev-server
    port: 8089,
    proxy: {},
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/dev\/.*$/,
          to(context) {
            return context.parsedUrl.pathname.replace(/^\/dev\/([-a-zA-Z0-9]+)\/.*$/, `/dev/$1/index.html`);
          }
        },
        {
          from: /^\/dist\/.*$/,
          to(context) {
            return context.parsedUrl.pathname.replace(/^\/dist\/([-a-zA-Z0-9]+)\/.*$/, `/dist/$1/index.html`);
          }
        }
      ]
    }
  }
};
