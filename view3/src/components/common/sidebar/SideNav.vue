<template>
  <div class="side-nav m-v-40 relative">
    <side-nav-item v-for="(item, index) of navList" :key="item.name" :item="item" :selected="selectedIndex === index"></side-nav-item>
  </div>
</template>

<script>
  import SideNavItem from './SideNavItem'

  export default {
    data () {
      return {
        navList: [
          {name: '首页', path: '/', icon: 'index', iconSelected: 'index-white'},
          {name: '分类', path: '/category', icon: 'category', iconSelected: 'category-white'},
          {name: '标签', path: '/tags', icon: 'tag', iconSelected: 'tag-white'},
          {name: '归档', path: '/archives', icon: 'archive', iconSelected: 'archive-white'},
          {name: '关于', path: '/about', icon: 'about', iconSelected: 'about-white'}
        ],
        selectedIndex: 0
      }
    },
    components: {
      SideNavItem
    }
  }
</script>

<style lang="scss" scoped>
  .side-nav::after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 38px;
    z-index: -1;
  }
</style>
