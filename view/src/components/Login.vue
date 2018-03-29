<template>
  <div class="login-container m-t-40 p-t-40 a-c">
    <h3 class="m-v-40">开发者入口</h3>
    <div flex="dir:left main:center cross:bottom">
      <vue-input type="password" label="个人口令" placeholder="请输入你的登陆口令" :value.sync="token" width="300" @onEnter="loginHandle" :autoFocus="true"></vue-input>
    </div>
  </div>
</template>

<script>
import VueInput from './common/form/VueInput'
import {login} from '@/actions'

export default {
  data () {
    return {
      token: ''
    }
  },
  methods: {
    loginHandle () {
      if (this.token) this.loginRemote()
      else this.$toast.show('请输入你的登录口令')
    },
    async loginRemote () {
      let result = await login(this.token)
      if (result) {
        this.$toast.show(`欢迎登入，${result}`)
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      }
    }
  },
  components: {VueInput}
}
</script>

<style lang="scss" scoped>

</style>
