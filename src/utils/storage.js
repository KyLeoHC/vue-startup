/*
 * web storage封装
 * @author KyLeo
 */

function createStorage(type = 'local') {
  const container = type === 'session' ? window.sessionStorage : window.localStorage;
  return {
    set(key, value) {
      try {
        const result = JSON.stringify(value);
        if (/^[{[]/.test(result)) {
          value = result;
        }
      } catch (e) {
      }
      // 针对某些浏览器隐身模式下会抛出的异常
      try {
        container.setItem(key, value);
      } catch (ex) {
        console.warn(`[storage ${type}]:save data fail!`);
      }
    },
    get(key, needConvert) {
      const value = container.getItem(key) || '';
      return needConvert && value
        ? JSON.parse(value)
        : value;
    },
    remove(key = '') {
      container.removeItem(key);
    },
    clear() {
      container.clear();
    }
  };
}

const storage = {
  session: {
    ...createStorage('session')
  },
  local: {
    ...createStorage('local')
  }
};

export {
  storage
};
