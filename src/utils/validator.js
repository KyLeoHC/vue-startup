/**
 * 判断是不是数值
 * @param value
 * @returns {boolean}
 */
const isNumber = value => {
  const numberValue = parseFloat(value);
  return numberValue === value;
};

/**
 * 判断是不是正整数
 * @param value
 * @returns {boolean}
 */
const isPositiveInteger = value => {
  return isNumber(value) && /^\d+$/g.test(value);
};

/**
 * 数值转换器(当给定的值不能转换成数值时，会返回空字符串而不是NaN)
 * @param value
 * @returns {*}
 */
const parseNumber = (value = '') => {
  if (isNumber(value)) {
    return value;
  }
  if (typeof value === 'string' && value.length && /^-?\d+$|^-?\d+\.\d+$/g.test(value)) {
    return parseFloat(value);
  } else {
    return '';
  }
};

const _toString = Object.prototype.toString;

/**
 * 判断给定的值是不是对象，并且也不是html的元素对象或者节点对象
 * @param value
 * @returns {boolean}
 */
const isPlainObject = value => {
  return _toString.call(value) === '[object Object]';
};

/**
 * 判断给定的值是不是数组
 * @param value
 * @returns {boolean}
 */
const isArray = value => {
  return _toString.call(value) === '[object Array]';
};

/**
 * 检查给定对象上有没有指定的key
 * @param obj
 * @param key
 * @returns {boolean}
 */
const hasOwn = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export {
  parseNumber,
  hasOwn,
  isNumber,
  isPositiveInteger,
  isPlainObject,
  isArray
};
