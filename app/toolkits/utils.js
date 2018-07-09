const md5 = require('blueimp-md5')

const utils = {
  parseCookie (string) {
    const returnValue = {}
    
    if (string && typeof string === 'string') {
      try {
        string.split(' ').forEach(item => {
          const index = item.indexOf('=')
          returnValue[item.slice(0, index)] = item.slice(index + 1)
        })
      } catch (e) {console.log(e)}
    }

    return returnValue
  },
  executeAsync (func) {
    setTimeout(func, 0)
  },
  authenticationEncodeKey: '3efd5f16327ea4b31a47',
  buildAuthentication (strings, maxAge) {
    const expireTime = new Date().getTime() + maxAge
    return md5(strings.join('') + expireTime, utils.authenticationEncodeKey) + expireTime
  },
  validateAutntication (code) {
    if (typeof code === 'string' && code.length > 13) {
      const expireTime = code.slice(-13)
      
    }

    return false
  }
}

module.exports = utils
