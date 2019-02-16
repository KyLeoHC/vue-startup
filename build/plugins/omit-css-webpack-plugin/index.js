/*
 * OmitCSSWebpackPlugin插件
 * 禁止HtmlWebpackPlugin输出css的<link>,提取需要加载的css赋值到全局变量(用作后续异步加载)
 * By KyLeo 2018.09.30
 */
class OmitCSSWebpackPlugin {
  getCode(list = []) {
    const listCode = list.map(item => `"${item}"`).join(',');
    return `window.__cssList = [${listCode}]`;
  }

  _process(compilation, args, cb) {
    const cssList = [];
    args.head = args.head.filter(item => {
      let isCSS = false;
      if (item.attributes.rel === 'stylesheet') {
        isCSS = true;
        cssList.push(item.attributes.href);
      }
      return !isCSS;
    });
    args.head.push({
      tagName: 'script',
      closeTag: true,
      innerHTML: this.getCode(cssList),
      attributes: {
        type: 'text/javascript'
      }
    });
    cb(null, args);
  }

  apply(compiler) {
    if ('hooks' in compiler) {
      const name = this.constructor.name;
      compiler.hooks.compilation.tap(name, compilation => {
        // if htmlWebpackPlugin is not exist, just do nothing
        if (compilation.hooks.htmlWebpackPluginAlterAssetTags) {
          compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
            name,
            (args, cb) => {
              this._process(compilation, args, cb);
            }
          );
        }
      });
    } else {
      compiler.plugin('compilation', compilation => {
        compilation.plugin(
          'html-webpack-plugin-alter-asset-tags',
          (args, cb) => {
            this._process(compilation, args, cb);
          }
        );
      });
    }
  }
}

module.exports = OmitCSSWebpackPlugin;
