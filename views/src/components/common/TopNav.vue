<template>
  <div class="a-r p-20">
    <top-nav-item v-for="item of navList" :key="item.name" :item="item"></top-nav-item>
  </div>
</template>

<script>
  import TopNavItem from './TopNavItem'

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
      TopNavItem
    }
  }
</script>