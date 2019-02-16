/*
 * 一些额外补充的polyfill
 * by KyLeo 2017.08.17
 */

/**
 * Object.keys的polyfill
 */
const keysPolyFill = () => {
  if (!Object.keys) {
    Object.keys = (function () {
      let hasOwnProperty = Object.prototype.hasOwnProperty;
      let hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
      let dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ];
      let dontEnumsLength = dontEnums.length;

      return function (obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        let result = [];

        for (let prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (let i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }
};

/**
 * Object.assign的polyfill
 */
const assignPolyFill = () => {
  if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
      if (target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      target = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        let source = arguments[index];
        if (source !== null) {
          for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }
};

/**
 * es6-promise，finally的polyfill（其实不算polyfill，标准暂时还没有这个方法）
 */
const finallyPolyFill = () => {
  if (Promise && !Promise.prototype.finally) {
    /* eslint no-extend-native:0 */
    Promise.prototype.finally = function (callback) {
      let P = this.constructor;
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
          throw reason;
        })
      );
    };
  }
};

/**
 * es6-promise，done的polyfill（其实不算polyfill，标准暂时还没有这个方法）
 */
const donePolyFill = () => {
  if (Promise && !Promise.prototype.done) {
    Promise.prototype.done = function (onFulfilled, onRejected) {
      this.then(
        onFulfilled,
        onRejected
      ).catch(function (reason) {
        // 抛出一个全局错误
        setTimeout(() => {
          throw reason;
        }, 0);
      });
    };
  }
};

const allPolyFill = () => {
  keysPolyFill();
  assignPolyFill();
  finallyPolyFill();
  donePolyFill();
};

export {
  keysPolyFill,
  assignPolyFill,
  finallyPolyFill,
  donePolyFill,
  allPolyFill
};
