/**
 * 时间格式化过滤器
 * @param date 可以是时间戳也可以是日期字符串，也可以是Date对象
 * @param format 'yyyy-MM-dd hh:mm:ss'
 * @returns {*}
 */
const dateFormat = (date, format) => {
  const dateObj = typeof date === 'object' ? date : new Date(date);
  if (!dateObj || dateObj.toUTCString() === 'Invalid Date') {
    return '';
  }
  const map = {
    'M': dateObj.getMonth() + 1, // 月份
    'd': dateObj.getDate(), // 日
    'h': dateObj.getHours(), // 小时
    'm': dateObj.getMinutes(), // 分
    's': dateObj.getSeconds(), // 秒
    'q': Math.floor((dateObj.getMonth() + 3) / 3), // 季度
    'S': dateObj.getMilliseconds() // 毫秒
  };

  format = format || 'yyyy-MM-dd hh:mm:ss';
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
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
