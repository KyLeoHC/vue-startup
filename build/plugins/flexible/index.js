const postcss = require('postcss');
const Flexible = require('./flexible');

module.exports = postcss.plugin('flexible', function (options) {
  return function (css, result) {
    const oldCssText = css.toString();
    const flexible = new Flexible(options);
    const newCssText = flexible.generateRem(oldCssText);
    result.root = postcss.parse(newCssText);
  };
});
