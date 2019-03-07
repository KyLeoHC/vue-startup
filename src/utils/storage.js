/*
 * web storage封装
 * @author KyLeo
 */

const storage = {
  session: {
    _sessionStorage: window.sessionStorage,
    set(key, value) {
      try {
        const result = JSON.stringify(value);
        if (/^[{[]/.test(result)) {
          value = result;
        }
      } catch (e) {
      }
      // 针对浏览器隐身模式下会抛出的异常
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
    set(key, value) {
      try {
        const result = JSON.stringify(value);
        if (/^[{[]/.test(result)) {
          value = result;
        }
      } catch (e) {
      }
      // 针对浏览器隐身模式下会抛出的异常
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
