import {
  isArray,
  isPlainObject,
  hasOwn
} from './validator';

let uniqueList = [];
/**
 * 检查是否是唯一
 * 避免循环引用带来的副作用
 * @param target
 * @returns {boolean}
 */
const isUnique = target => {
  return !uniqueList.filter(item => item === target)[0];
};

/**
 * 利用JSON字符串转换和解析克隆数据
 * @param data
 * @returns {any}
 */
const cloneObj = data => {
  if (isPlainObject(data) || isArray(data)) {
    return JSON.parse(JSON.stringify(data));
  }
};

/**
 * 循环克隆对象或者数组
 * @param data
 */
const cloneObjLoop = (data) => {
  if (!isPlainObject(data) && !isArray(data)) return;
  uniqueList = [];
  const copy = {};
  const list = [{
    parent: copy,
    key: undefined,
    copy: undefined, // 新副本数据
    data // 待拷贝的原数据
  }];

  do {
    // 深度优先遍历
    const item = list.pop();
    if (item.key !== undefined && item.copy !== undefined) {
      if (isUnique(item.data)) {
        // 赋值
        item.parent[item.key] = item.copy;
        // 修改父节点指向
        item.parent = item.copy;
        // 保存唯一的引用，用作后续检查唯一性
        uniqueList.push(item.data);
      } else {
        item.parent[item.key] = item.data;
        continue;
      }
    }
    for (let key in item.data) {
      if (hasOwn(item.data, key)) {
        const value = item.data[key];
        if (isPlainObject(value)) {
          list.push({
            key,
            parent: item.parent,
            copy: {},
            data: value
          });
        } else if (isArray(value)) {
          list.push({
            key,
            parent: item.parent,
            copy: [],
            data: value
          });
        } else {
          item.parent[key] = value;
        }
      }
    }
  } while (list.length);
  return copy;
};

/**
 * 递归克隆对象或者数组
 * @param data
 * @param copy
 * @returns {*}
 */
const cloneObjRecursion = (data, copy) => {
  if (!isPlainObject(data) && !isArray(data)) return;
  if (!copy) {
    uniqueList = [];
    if (isPlainObject(data)) {
      copy = {};
    } else if (isArray(data)) {
      copy = [];
    }
  }
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (!isUnique(value)) {
      copy[key] = value;
      return;
    }
    uniqueList.push(value);
    if (isPlainObject(value)) {
      copy[key] = cloneObjRecursion(value, {});
    } else if (isArray(value)) {
      copy[key] = cloneObjRecursion(value, []);
    } else {
      copy[key] = value;
    }
  });
  return copy;
};

export {
  cloneObj,
  cloneObjLoop,
  cloneObjRecursion
};
