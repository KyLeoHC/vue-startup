/*
 * 作用如文件名，占个坑位先，需要的时候再去实现
 */
import { on } from '@/utils';

const nodeList = [];
const ctx = '$$clickOutSideContext';
let seed = 0;

on(document, 'touchstart', e => {
  nodeList.forEach(node => node[ctx].documentHandler(event));
});

function createDocumentHandler(el, binding, vnode) {
  return function (event) {
    if (!vnode ||
            !vnode.context ||
            !event.target ||
            el.contains(event.target) ||
            el === event.target) return;
    if (binding.expression &&
            el[ctx].methodName &&
            vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      // 有可能直接传入的就是执行表达式
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

export default {
  bind(el, binding, vnode) {
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    };
  },
  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },
  unbind(el) {
    const len = nodeList.length;
    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  }
};
