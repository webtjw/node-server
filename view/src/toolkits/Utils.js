import {checkLogin, login} from '@/actions'

const Utils = {
  states: {
    isLoginWeak: false
  },
  // login
  async isLogin (callback) {
    const developer = Utils.getDeveloper()
    if (developer) {
      const {success, data} = await checkLogin(developer)
      callback && callback(success && data)
      Utils.states.isLoginWeak = !!data
      return data
    } else {
      callback && callback()
      return false
    }
  },
  async login (token) {
    const loginResult = await login(token)
    if (loginResult && loginResult.success && loginResult.data) {
      localStorage.setItem('developer', loginResult.data) // store developer's name in local
      Utils.states.isLoginWeak = true
      return loginResult.data
    }

    Utils.states.isLoginWeak = false
    return false
  },
  getDeveloper () {
    return localStorage.getItem('developer')
  }
}

export default Utils
