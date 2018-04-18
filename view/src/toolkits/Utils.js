import {checkLogin} from '@/actions'

const Utils = {
  // login
  async isLogin (callback) {
    const {success, data: {isDeveloper}} = await checkLogin()
    callback && callback(success && isDeveloper)
  }
}

export default Utils
