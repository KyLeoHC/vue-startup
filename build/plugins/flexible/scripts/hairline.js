;(function (window, document) {
  var dpr = window.devicePixelRatio || 1;
  if (dpr >= 2) {
    var testHairEl = document.createElement('div');
    var bodyEl = document.documentElement.getElementsByTagName('body')[0];
    testHairEl.style.border = '.5px solid transparent';
    bodyEl.appendChild(testHairEl);
    testHairEl.offsetHeight === 1 && bodyEl.classList.add('hairline');
    bodyEl.removeChild(testHairEl);
  }
})(window, document);
