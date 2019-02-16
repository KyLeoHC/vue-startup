import { isNumber } from './validator';

const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const oneHour = oneMinute * 60;
const oneDay = 24 * oneHour;

/**
 * 计算时间差
 * @param startTime 开始时间戳
 * @param endTime 结束时间戳
 * @returns {{hour: number, day: number, minute: number, second: number}}
 */
const calcTime = (startTime = new Date().getTime(), endTime = new Date().getTime()) => {
  const differ = endTime - startTime;
  return {
    day: Math.floor(differ / oneDay),
    hour: Math.floor(differ / oneHour % 24),
    minute: Math.floor(differ / oneMinute % 60),
    second: Math.floor(differ / oneSecond % 60)
  };
};

/**
 * 倒计时函数
 * @param startDate 开始日期，格式为 yyyy/MM/dd HH:mm:ss 或者是一个时间戳
 * @param endDate 结束日期，格式为 yyyy/MM/dd HH:mm:ss 或者是一个时间戳
 * @param interval 时间间隔，单位是毫秒
 * @returns {{start(*)}}
 */
const countDown = (startDate = new Date().getTime(), endDate = new Date().getTime(), interval = 1000) => {
  let intervalId;
  return {
    start(cb) {
      let startTime = isNumber(startDate) ? startDate : new Date(startDate).getTime();
      let endTime = isNumber(endDate) ? endDate : new Date(endDate).getTime();
      if (startTime <= endTime) {
        intervalId = setInterval(() => {
          startTime += interval;
          if (startTime > endTime) {
            clearInterval(intervalId);
          } else {
            cb(calcTime(startTime, endTime));
          }
        }, interval);
      } else {
        cb(calcTime());
      }
    }
  };
};

export {
  calcTime,
  countDown
};
