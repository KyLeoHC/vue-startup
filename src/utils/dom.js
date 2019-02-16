let passiveSupported = false;

try {
  let options = {
    get passive() {
      // This function will be called when the browser
      // attempts to access the passive property.
      passiveSupported = true;
    }
  };
  window.addEventListener('test', options, options);
  window.removeEventListener('test', options, options);
} catch (err) {
  passiveSupported = false;
}

/**
 * 事件分发代理函数
 * @param event
 * @private
 */
const _processor = function (event) {
  const namespaceObj = event.currentTarget.__event[event.type];
  Object.keys(namespaceObj)
    .forEach(key => {
      namespaceObj[key].forEach(handler => {
        handler(event);
      });
    });
};

/**
 * 绑定事件，支持命名空间绑定，比如 'click.show'(注意，不支持多级命名空间)
 * 提倡绑定事件的时候指定命名空间，也方便于移除事件绑定
 * @param el
 * @param event 比如'click.show'的形式
 * @param handler
 */
const on = (el, event, handler) => {
  if (!el || !event || !handler) return;
  const [name, namespace = 'default'] = event.split('.');
  if (!el.__event) {
    el.__event = {};
    el.addEventListener(name, _processor, passiveSupported ? { passive: true } : false);
  }
  el.__event[name] = el.__event[name] || {};
  el.__event[name][namespace] = el.__event[name][namespace] || [];
  el.__event[name][namespace].push(handler);
};

/**
 * 移除事件绑定
 * @param el
 * @param event 比如'click.show'的形式
 */
const off = (el, event) => {
  if (!el || !event) return;
  const [name, namespace = 'default'] = event.split('.');
  const namespaceObj = el.__event[name];
  namespaceObj && delete namespaceObj[namespace];
  if (!Object.keys(namespaceObj).length) {
    delete el.__event[name];
    el.removeEventListener(name, _processor, passiveSupported ? { passive: true } : false);
  }
};

/**
 * 绑定事件，执行一次之后就移除绑定
 * @param el
 * @param event
 * @param handler
 */
const once = (el, event, handler) => {
  const listener = function () {
    handler && handler.apply(this, arguments);
    off(el, event);
  };
  on(el, event, listener);
};

/**
 * 获取偏移量(可以理解为相对文档页面顶部和左侧的偏移量)
 * @param el
 * @returns {number}
 */
const computeOffset = el => {
  let offsetTop = 0;
  let offsetLeft = 0;
  let parentEl = el.offsetParent;
  while (parentEl) {
    offsetTop += parentEl.offsetTop;
    offsetLeft += parentEl.offsetLeft;
    parentEl = parentEl.offsetParent;
  }
  offsetTop += el.offsetTop;
  offsetLeft += el.offsetLeft;
  return {
    offsetTop,
    offsetLeft
  };
};

export {
  on,
  off,
  once,
  passiveSupported,
  computeOffset
};
