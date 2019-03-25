/*
 * web storage封装
 * @author KyLeo
 */

/* eslint @typescript-eslint/no-explicit-any: 0 */
const storage = {
  session: {
    _sessionStorage: window.sessionStorage,
    set(key: string, value: any): void {
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
    get(key = '', needConvert: boolean): any {
      let value = this._sessionStorage.getItem(key) || '';
      return needConvert && value
        ? JSON.parse(value)
        : value;
    },
    remove(key = ''): void {
      this._sessionStorage.removeItem(key);
    },
    clear(): void {
      this._sessionStorage.clear();
    }
  },
  local: {
    _localStorage: window.localStorage,
    set(key: string, value: any): void {
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
    get(key = '', needConvert: boolean): any {
      let value = this._localStorage.getItem(key) || '';
      return needConvert && value
        ? JSON.parse(value)
        : value;
    },
    remove(key = ''): void {
      this._localStorage.removeItem(key);
    },
    clear(): void {
      this._localStorage.clear();
    }
  }
};

export {
  storage
};
