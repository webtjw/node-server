<template>
  <div class="m-v-40">
    <page-header zh="分类" en="Category"></page-header>
    <div class="m-v-30 p-h-20 font-16">
      <router-link class="m-h-10 p-10 iblock" v-for="item of categotyList" :key="item" :to="`/category/${item}`">{{item}}</router-link>
    </div>
  </div>
</template>

<script>
  import PageHeader from '../common/PageHeader'

  export default {
    data () {
      return {
        categotyList: ['javascript', 'webGL', 'canvas', 'css3', 'HTML5', 'vue', 'react']
      }
    },
    components: {
      PageHeader
    }
  }
</script>

<style lang="scss" scoped>

</style>
