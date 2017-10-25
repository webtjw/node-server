<template>
  <div class="side-bar" flex-box="0">
    <div class="fixed">
      <side-introduction></side-introduction>
      <side-nav></side-nav>
    </div>
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
    width: 280px;
    padding-right: 60px;

    .fixed {
      top: 0;
      width: 220px;
    }
  }
</style>
