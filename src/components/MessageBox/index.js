import Vue from 'vue'
import Main from './Main.vue'
// interface Button {
//   text: string;
//   callBack?: any;
// }
// interface Message {
//   title?: string;
//   message: string;
//   buttons?: Array<Button>;
// }

let instance
let seed = 1
const defaults = {
  title: '',
  message: '',
  buttons: [{
    text: '取消',
    callBack: () => null
  },{
    text: '确定',
    callBack: () => null
  }]
}

const merge = (target, ...others) => {
  for (var i = 0, j = others.length; i < j; i++) {
    var source = others[i]
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}

const MessageBox = (options) => {
  const params = merge({}, defaults, options)
  const MsgConstructor = Vue.extend(Main)
  instance = new MsgConstructor({
    el: document.createElement('div')
  })
  instance.id = `message-${seed++}`
  for (var prop in params) {
    if (params.hasOwnProperty(prop)) {
      instance[prop] = params[prop]
    }
  }
  instance.show = true
  document.body.appendChild(instance.$el)
}

export default MessageBox
