/*
 * 加载css文件函数
 */

const headEl = document.getElementsByTagName('head')[0];

/**
 * 加载单个css文件
 * @param href
 * @param timeLimit 加载时间限制
 */
export function loadCSS(href = '', timeLimit = 3000): Promise<void> {
  let complete = false;
  let timeoutId: ReturnType<typeof setTimeout>;
  return new Promise((resolve, reject): void => {
    const styleEl = document.createElement('link');
    styleEl.rel = 'stylesheet';
    styleEl.type = 'text/css';
    styleEl.href = href;
    styleEl.onload = (): void => {
      if (complete) return;
      clearTimeout(timeoutId);
      complete = true;
      resolve();
    };
    styleEl.onerror = (): void => {
      if (complete) return;
      clearTimeout(timeoutId);
      complete = true;
      reject(new Error('load css fail'));
    };
    headEl.appendChild(styleEl);
    timeoutId = setTimeout((): void => {
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
 */
export function loadCSSByArray(hrefArray: string[] = []): Promise<void[]> {
  const tasks: Promise<void>[] = hrefArray.map((href): Promise<void> => loadCSS(href));
  return Promise.all(tasks);
}
