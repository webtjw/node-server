<template>
  <div id="app" class="c-normal">
    <top-bar></top-bar>
    <router-view />
  </div>
</template>

<script>
  import TopBar from './components/common/TopBar'
  
  export default {
    name: 'App',
    components: {
      TopBar
    }
  }
</script>

<style lang="scss">
  @import './assets/style/app-reset.scss';
  @import './assets/style/common.scss';
  @import '../node_modules/flex.css/dist/flex.css';
</style>
