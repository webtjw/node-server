<template>
  <div class="a-r p-20">
    <side-nav-item v-for="item of navList" :key="item.name" :item="item"></side-nav-item>
  </div>
</template>

<script>
  import SideNavItem from './SideNavItem'

  export default {
    data () {
      return {
        navList: [
          {name: 'Index', path: '/'},
          {name: 'Archives', path: '/archives'},
          {name: 'Category', path: '/category'},
          {name: 'Tags', path: '/tags'},
          {name: 'About', path: '/about'}
        ]
      }
    },
    components: {
      SideNavItem
    }
  }
</script>