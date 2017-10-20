<template>
  <div class="side-bar" flex-box="0">
    <side-introduction></side-introduction>
    <side-nav></side-nav>
  </div>
</template>

<script>
  import SideNav from './SideNav'
  import SideIntroduction from './SideIntroduction'

  export default {
    name: 'TopBar',
    components: {
      SideNav,
      SideIntroduction
    }
  }
</script>

<style lang="sass" scoped>
  .side-bar { width: 200px;}
</style>
