const IsPC = () => {
  var userAgentInfo = navigator.userAgent
  var Agents = ["Android", "iPhone",
              "SymbianOS", "Windows Phone",
              "iPad", "iPod"]
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

export const setRem = () => {
  (function(doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= 640) {
          docEl.style.fontSize = '100px';
        } else {
          docEl.style.fontSize = (clientWidth / 10) + 'px';
        }
      };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);
}
