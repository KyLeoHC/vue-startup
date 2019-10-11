/* eslint-disable @typescript-eslint/no-explicit-any */
export const toString = Object.prototype.toString;
export const keys = Object.keys;

/**
 * 判断一个对象上的属性是不是非原型链上的属性
 * @param target
 * @param key
 */
export function hasOwn(target: object, key: string | number): boolean {
  return Object.prototype.hasOwnProperty.call(target, key);
}

/**
 * 判断给定的值是不是原始类型
 */
export function isPrimitive(value: any): value is string | number | symbol | boolean {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  );
}

/**
 * 判断给定的值是不是字符串
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * 判断给定的值是不是函数
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * 判断给定的值是否是数值(严格判断是不是数值，数值字符串也不允许)
 * @param value
 */
export function isNumber(value: any): value is number {
  return parseFloat(value) === value;
}

/**
 * 判断给定的值是否是数值字符串(宽松的判断，数值或者数值字符串都是允许的)
 * @param value
 */
export function isNumberString(value: any): value is string {
  return /^[+-]?[\d]+(\.[\d]+)?$/.test(value);
}

/**
 * 判断给定的值是否是数组
 * @param value
 */
export function isArray(value: any): value is any[] {
  return toString.call(value) === '[object Array]';
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(value: any): value is object {
  return toString.call(value) === '[object Object]';
}

/**
 * 判断一个值是null或者undefined
 * @param value
 */
export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}
