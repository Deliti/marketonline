import { Toast } from 'mint-ui'

export const IsPC = () => {
  var userAgentInfo = navigator.userAgent
  var Agents = ["Android", "iPhone",
              "SymbianOS", "Windows Phone",
              "iPod"]
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

// 校验input
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

// formate倒计时
export const formateTime = time => {
  const nowTime = new Date().getTime()
  const duringTime = (time - nowTime) / 1000
  const date = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  }
  if (duringTime < 0) {
    return date
  }
  date.day = Math.floor(duringTime / 86400);
  date.hour = Math.floor(duringTime % 86400 / 3600);
  date.minute = Math.floor(duringTime % 86400 % 3600 / 60);
  date.second = Math.floor(duringTime % 86400 % 3600 % 60);
  return date
}

export const timeText = (time, text) => {
  if (+time > 0) {
    return time+text
  } else {
    return ''
  }
}

export const DataFormate = () => {
  // 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}

export const getCurrentDay = () => {
  Date.prototype.Format ? null : DataFormate()
  const time = {
    start: '',
    end: ''
  }
  time.start = new Date(new Date(new Date().toLocaleDateString()).getTime()).Format('yyyy-MM-dd hh:mm:ss')
  time.end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1).Format('yyyy-MM-dd hh:mm:ss')
  return time
}

export const getCurrentWeek = () => {
  Date.prototype.Format ? null : DataFormate()
  const time = {
    start: '',
    end: ''
  }
  //获取当前时间
  var currentDate = new Date();
  //返回date是一周中的某一天
  var week = currentDate.getDay();
  //返回date是一个月中的某一天
  var month = currentDate.getDate();

  //一天的毫秒数
  var millisecond = 1000 * 60 * 60 * 24;
  //减去的天数
  var minusDay = week != 0 ? week - 1 : 6;
  //alert(minusDay);
  //本周 周一
  const monday = new Date(new Date(currentDate.getTime() - (minusDay * millisecond)).toLocaleDateString())
  time.start = new Date(monday.getTime()).Format('yyyy-MM-dd hh:mm:ss');
  //本周 周日
  time.end = new Date(monday.getTime() + (7 * millisecond)).Format('yyyy-MM-dd hh:mm:ss');
  //返回
  return time;
};

export const getCurrentMonth = () => {
  Date.prototype.Format ? null : DataFormate()
  const time = {
    start: '',
    end: ''
  }
  const date = new Date()
  time.start = new Date(date.setDate(1)).Format('yyyy-MM-dd hh:mm:ss')
  var currentMonth = date.getMonth();
	var nextMonth = ++currentMonth;
	var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  time.end = new Date(nextMonthFirstDay).Format('yyyy-MM-dd hh:mm:ss')
  return time
}

export const getBeforeMonth = (count) => {
  Date.prototype.Format ? null : DataFormate()
  const timeArr = []
  const date = new Date()
  const year = date.getFullYear() //获取当前日期的年份
  const month = date.getMonth() //获取当前日期的月份
  for (let num = 0; num < count; num++) {
    var year2 = year;
    var year3 = year
    var month2 = parseInt(month) - num;
    var month3 = parseInt(month) - (num - 1);
    if (month2 <= 0) {
        var absM = Math.abs(month2);
        year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
        month2 = 12 - (absM % 12);
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    if (month3 <= 0) {
      var absM = Math.abs(month3);
      year3 = parseInt(year3) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
      month3 = 12 - (absM % 12);
    }
    if (month3 < 10) {
        month3 = '0' + month3;
    }
    var label = year2 + '-' + month2
    var lastLabel = year3 + '-' + month3
    let firstDay = label + '-01 00:00:00'
    let lastDay = lastLabel + '-01 00:00:00'
    timeArr.push({
      label,
      time: {
        start: firstDay,
        end: lastDay
      }
    })
  }
  return timeArr
}
