/*
  加载css文件函数
 */
const headEl = document.getElementsByTagName('head')[0];

/**
 * 加载单个css文件
 * @param href
 * @param timeLimit 加载时间限制
 * @returns {Promise<any>}
 */
export function loadCSS(href = '', timeLimit = 3000) {
  let complete = false;
  let timeoutId = null;
  return new Promise((resolve, reject) => {
    const styleEl = document.createElement('link');
    styleEl.rel = 'stylesheet';
    styleEl.type = 'text/css';
    styleEl.href = href;
    styleEl.onload = () => {
      if (complete) return;
      clearTimeout(timeoutId);
      complete = true;
      resolve();
    };
    styleEl.onerror = () => {
      if (complete) return;
      clearTimeout(timeoutId);
      complete = true;
      reject(new Error('load css fail'));
    };
    headEl.appendChild(styleEl);
    timeoutId = setTimeout(() => {
      if (complete) return;
      console.log(`[loadCSS]: 样式加载超时"${href}"`);
      complete = true;
      resolve();
    }, timeLimit);
  });
}

/**
 * 同时加载多个css文件
 * @param hrefArray
 * @returns {Promise<any[]>}
 */
export function loadCSSByArray(hrefArray = []) {
  const tasks = hrefArray.map(href => loadCSS(href));
  return Promise.all(tasks);
}
