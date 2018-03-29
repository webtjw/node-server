import {checkLogin} from '@/actions'

const Utils = {
  // login
  async isLogin (callback) {
    const isLogin = await checkLogin()
    callback && callback(isLogin)
  }
}

export default Utils
