<template>
  <div id="app" class="w-1000" flex="dir:left">
    <side-bar></side-bar>
    <router-view flex-box="1" />
  </div>
</template>

<script>
  import SideBar from './components/common/SideBar'
  
  export default {
    name: 'App',
    components: {
      SideBar
    }
  }
</script>

<style lang="scss">
  @import './assets/style/app-reset.scss';
  @import './assets/style/common.scss';
  @import '../node_modules/flex.css/dist/flex.css';
</style>
