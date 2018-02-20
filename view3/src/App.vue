<template>
  <div id="app" class="w-1000" flex="dir:left">
    <side-bar flex-box="0"></side-bar>
    <router-view flex-box="1" />
    <toast></toast>
  </div>
</template>

<script>
  import SideBar from '@/components/common/sidebar/SideBar';
  import Toast from '@/components/common/Toast';
  
  export default {
    name: 'App',
    components: {SideBar, Toast}
  }
</script>

<style lang="scss">
  @import './assets/style/app-reset.scss';
  @import './assets/style/common.scss';
  @import '../node_modules/flex.css/dist/flex.css';
</style>
  