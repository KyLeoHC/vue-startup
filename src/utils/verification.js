/*
 * 此校验模块和validator是不一样的
 * 这里的所有校验函数都是业务相关的
 */
import {
  isPositiveInteger
} from './validator';

/**
 * 判断是不是手机号码
 * @param value
 * @returns {boolean}
 */
const isPhoneNumber = value => {
  return isPositiveInteger(value) && (value + '').length === 11;
};

export {
  isPhoneNumber
};
