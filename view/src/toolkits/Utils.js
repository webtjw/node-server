import Storage from './Storage'

const Utils = {
  // 字符串 func 集合
  string: {
    isEmpty (str) {
      return !str || (typeof str === 'string' && !str.trim())
    }
  },
  // 日期 date func 集合
  formatDate (format, date = new Date()) {
    format = format.toLowerCase()
    if (format === 'yyyy-mm-dd') return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  },
  // dom
  dom: {
    haveElement (element, parent) {
      if (!element || !parent) throw new ReferenceError('wrong parameters')
      else {
        let parentElement = element.parentElement
        if (parentElement === parent) return true
        else if (!parent || parentElement === document.documentElement) return false
        else return Utils.dom.haveElement(parentElement, parent)
      }
    }
  },
  // object
  object: {
    isObject (obj) {
      return obj && Object.prototype.toString.call(obj) === '[object Object]'
    }
  },
  // login
  isLogin () {
    let dev = Storage.getCookie('developer')
    return dev === 'true'
  }
}

export default Utils
