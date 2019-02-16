;(function (window, document) {
  var dpr = window.devicePixelRatio || 1;
  var docEl = document.documentElement;

  function setRem() {
    var width = docEl.getBoundingClientRect().width;
    width = (width / dpr) > 540 ? (540 * dpr) : width;
    docEl.style.fontSize = (width / 10) + 'px';
  }

  window.addEventListener('pageshow', function (e) {
    e.persisted && setRem();
  });
  window.addEventListener('resize', setRem);
  window.setRem = setRem;
  setRem();
})(window, document);
