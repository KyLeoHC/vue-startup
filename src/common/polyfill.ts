export default (): void => {
  // 这里目的是触发babel的自动polyfill
  Promise.resolve().finally();
};
