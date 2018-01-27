<template>
  <div class="side-bar p-t-40">
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

<style lang="scss" scoped>
  .side-bar {
    padding-right: 80px;
  }
</style>

