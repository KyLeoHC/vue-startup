type FormatIndex = 'y' | 'M' | 'd' | 'h' | 'm' | 's' | 'q' | 'S';

/**
 * 时间格式化过滤器
 * @param date 可以是时间戳也可以是日期字符串，也可以是Date对象
 * @param format 'yyyy-MM-dd hh:mm:ss'
 * @returns {*}
 */
const dateFormat = (date: number | string | Date, format = 'yyyy-MM-dd hh:mm:ss'): string => {
  const dateObj = typeof date === 'object' ? date : new Date(date);
  if (!dateObj || dateObj.toUTCString() === 'Invalid Date') {
    return '';
  }
  const map: { [index: string]: number } = {
    M: dateObj.getMonth() + 1, // 月份
    d: dateObj.getDate(), // 日
    h: dateObj.getHours(), // 小时
    m: dateObj.getMinutes(), // 分
    s: dateObj.getSeconds(), // 秒
    q: Math.floor((dateObj.getMonth() + 3) / 3), // 季度
    S: dateObj.getMilliseconds() // 毫秒
  };

  format = format.replace(/([yMdhmsqS])+/g, function (all: string, t: FormatIndex): string {
    let v: number | string = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v + '';
    } else if (t === 'y') {
      return (dateObj.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
};

export {
  dateFormat
};
