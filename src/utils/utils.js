import { Toast } from 'mint-ui'

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

export const validateInput = ({
  value,
  emptyTxt,
  length,
  minLen,
  maxLen,
  lengthTxt,
  regStr,
  novalidStr
}) => {
  // 非空校验
  if (!value) {
    Toast(emptyTxt);
    return false;
  }
  // 长度校验
  if (length) {
    if (value.length != length) {
      Toast(lengthTxt);
      return false;
    }
  }
  if (minLen && maxLen) {
    if (value.length < minLen || value.length > maxLen) {
      Toast(lengthTxt);
      return false;
    }
  }
  if (regStr) {
    if (!regStr.test(value)) {
      Toast(novalidStr);
      return false;
    }
  }
  return true;
}
