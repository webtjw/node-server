import {checkLogin} from '@/actions'

const Utils = {
  // login
  async isLogin (callback) {
    const isLogin = await checkLogin()
    callback && callback(isLogin && isLogin.isDeveloper)
  }
}

export default Utils
