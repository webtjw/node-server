<template>
  <div id="app">
    <topbar ref="topbar"></topbar>
    <router-view class="wrapper" />
    <toast></toast>
  </div>
</template>

<script>
import Topbar from '@/components/common/Topbar'
import Toast from '@/components/common/Toast'

export default {
  name: 'App',
  data () {
    return {
      user: null
    }
  },
  components: {Topbar, Toast}
}
</script>

<style lang="scss">
  @import './assets/style/app-reset.scss';
  @import './assets/style/common.scss';
  @import '../node_modules/flex.css/dist/flex.css';
</style>
