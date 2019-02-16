/*
  web storage
 */

const storage = {
  session: {
    _sessionStorage: window.sessionStorage,
    set(key, value, needConvert) {
      // 针对浏览器隐身模式下会抛出的异常
      value = needConvert
        ? JSON.stringify(value)
        : value;
      try {
        this._sessionStorage.setItem(key, value);
      } catch (ex) {
        console.warn('[session]:save data fail!');
      }
    },
    get(key, needConvert) {
      let value = this._sessionStorage.getItem(key) || '';
      return needConvert && value
        ? JSON.parse(value)
        : value;
    },
    remove(key) {
      this._sessionStorage.removeItem(key);
    },
    clear() {
      this._sessionStorage.clear();
    }
  },
  local: {
    _localStorage: window.localStorage,
    set(key, value, needConvert) {
      // 针对浏览器隐身模式下会抛出的异常
      value = needConvert
        ? JSON.stringify(value)
        : value;
      try {
        this._localStorage.setItem(key, value);
      } catch (ex) {
        console.warn('[local]:save data fail!');
      }
    },
    get(key, needConvert) {
      let value = this._localStorage.getItem(key) || '';
      return needConvert && value
        ? JSON.parse(value)
        : value;
    },
    remove(key) {
      this._localStorage.removeItem(key);
    },
    clear() {
      this._localStorage.clear();
    }
  }
};

export {
  storage
};
