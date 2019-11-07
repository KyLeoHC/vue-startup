/*
 * web storage封装
 * @author KyLeo
 */

/* eslint @typescript-eslint/no-explicit-any: 0 */

interface Storage {
  set(key: string, value: any): void;

  get<T>(key: string, needConvert?: boolean): T;

  remove(key: string): void;

  clear(): void;
}

function createStorage(
  type: 'session' | 'local' = 'local'
): Storage {
  const container = type === 'session' ? window.sessionStorage : window.localStorage;
  return {
    set(key: string, value: any): void {
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
    get<T>(key = '', needConvert?: boolean): T {
      const value = container.getItem(key) || '';
      return needConvert && value
        ? JSON.parse(value)
        : value;
    },
    remove(key = ''): void {
      container.removeItem(key);
    },
    clear(): void {
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
