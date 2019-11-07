/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  keys,
  hasOwn,
  isPrimitive,
  isNullOrUndefined
} from './index';

// 此NormalObj类型也可用来描述一个数组
interface NormalObj {
  [key: string]: any;

  [key: number]: any;
}

/**
 * 将查询对象转换成url查询字符串(比如: xxx=xxx&xxx=xxx)
 * @param queryObj
 * @param options
 */
export function stringify(
  queryObj: NormalObj,
  options: {
    encode?: boolean;
  } = {}
): string {
  const queryList: string[] = [];
  keys(queryObj).forEach((key): void => {
    let value = '';
    const queryValue = queryObj[key];
    if (queryValue !== undefined) {
      if (isPrimitive(queryValue)) {
        value = String(queryValue);
      } else {
        value = JSON.stringify(queryValue);
      }
    }
    queryList.push(`${key}=${options.encode ? encodeURIComponent(value) : value}`);
  });
  return queryList.join('&');
}

/**
 * 删除对象上的空属性
 * @param obj
 */
export function deleteEmptyAttribute(obj: NormalObj): NormalObj {
  keys(obj).forEach((key): void => {
    const value = obj[key];
    if (value === '' || value === undefined || value === null) {
      delete obj[key];
    }
  });
  return obj;
}

/**
 * 取值函数，自动处理null、undefined
 * @param target 需要取值的目标对象或者数组
 * @param keys 字段名数组(暂时不支持'a.b[0].c'之类的形式)
 * @param placeholder 无数据时返回的值
 */
export function getValueByKeys(
  target: NormalObj,
  keys: (string | number)[],
  placeholder = ''
): any {
  return keys.reduce((target, key): any => {
    return target && !isNullOrUndefined(target[key]) && hasOwn(target, key)
      ? target[key]
      : placeholder;
  }, target);
}
