/*
 * Flexible插件(设计稿基准值是750px宽度)
 * 1.px转实际像素值大小
 * 2.px转rem
 * 3.半像素border
 * 4.多分辨率图片url
 * @author KyLeo 2018.08.01
 */

const css = require('css');
const pxRegExp = /\b(\d+(\.\d+)?)px\b/;
const defaultConfig = {
  baseDpr: 2,
  remUnit: 75,
  precision: 6,
  keepComment: 'no',
  pxComment: 'px',
  remComment: 'rem',
  hairComment: 'hair',
  imgUrlComment: 'img flex'
};

class Flexible {
  constructor(options = {}) {
    this.config = Object.assign({}, defaultConfig, options);
  }

  _processRules(rules) {
    const config = this.config;
    let hairSelectors = [];
    const imgUrlList = [];
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (rule.type === 'media') {
        this._processRules(rule.rules);
        continue;
      } else if (rule.type === 'keyframes') {
        this._processRules(rule.keyframes, true);
        continue;
      } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
        continue;
      }

      const declarations = rule.declarations;
      if (declarations.length) {
        declarations.forEach((declaration, index) => {
          const nextDeclaration = rule.declarations[index + 1];
          if (declaration.type === 'declaration' &&
              nextDeclaration &&
              nextDeclaration.type === 'comment') {
            const trimComment = nextDeclaration.comment.trim();
            if (pxRegExp.test(declaration.value)) {
              if (declaration.value === '0px') {
                declaration.value = '0';
              } else if (trimComment === config.pxComment) {
                declaration.value = this._calculateValue('px', declaration.value);
              } else if (trimComment === config.remComment) {
                declaration.value = this._calculateValue('rem', declaration.value);
              } else if (trimComment === config.hairComment) {
                // 遇到hair注释的
                // 添加0.5px的样式
                hairSelectors = hairSelectors.concat(rule.selectors || []);
              }
              declarations.splice(index + 1, 1);
            } else if (nextDeclaration.comment.trim() === config.imgUrlComment) {
              if (rule.selectors) {
                imgUrlList.push({
                  selectors: rule.selectors,
                  value: declaration.value
                });
              }
              declarations.splice(index + 1, 1); // delete corresponding comment
            }
          }
        });
      } else {
        // if the origin rule has no declarations, delete it
        rules.splice(i, 1);
        i--;
      }
    }
    hairSelectors.length && rules.push({
      type: 'rule',
      selectors: hairSelectors.map(selector => '.hairline ' + selector),
      declarations: [{
        type: 'declaration',
        property: 'border-width',
        value: '.5px!important'
      }]
    });
    if (imgUrlList.length) {
      const rule = {
        type: 'media',
        media: 'only screen and  (-webkit-min-device-pixel-ratio: 3)',
        rules: []
      };
      // 这里还需要修改下，因为缺少对多背景图的支持，比如:
      // background-image: url("1.jpg"), url("2.jpg"), url("3.jpg")
      imgUrlList.forEach(item => {
        const valueList = item.value.split(' ');
        const urlValue = valueList.filter(value => {
          // 找出url值
          return value.indexOf('url') > -1;
        })[0];
        const splitByQuery = urlValue.split('?'); // 把参数先去掉
        splitByQuery[0] = splitByQuery[0].replace(/(\.jpg)|(\.jpeg)|(\.png)|(\.webp)|(\.gif)/gi, match => {
          return '@3x' + match;
        });
        rule.rules.push({
          type: 'rule',
          selectors: item.selectors,
          declarations: [{
            type: 'declaration',
            property: 'background-image',
            value: splitByQuery.join('?')
          }]
        });
      });
      rules.push(rule);
    }
  }

  _calculateValue(type, value, dpr = 1) {
    const config = this.config;
    const getValue = value => {
      // control decimal precision of the calculated value
      value = parseFloat(value.toFixed(config.precision));
      return value === 0 ? value : value + type;
    };

    return value.replace(new RegExp(pxRegExp.source, 'g'), function ($0, $1) {
      return type === 'px' ? getValue($1 * dpr / config.baseDpr) : getValue($1 / config.remUnit);
    });
  }

  generateRem(cssText) {
    const astObj = css.parse(cssText);
    this._processRules(astObj.stylesheet.rules);
    return css.stringify(astObj);
  }
}

module.exports = Flexible;
