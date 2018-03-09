<template>
  <div class="m-v-40">
    <page-header :zh="category"></page-header>
  </div>
</template>

<script>
  import PageHeader from '../common/PageHeader'

  export default {
    computed: {
      category () {
        return this.$route.params.name
      }
    },
    components: {
      PageHeader
    }
  }
</script>

<style lang="scss" scoped>

</style>
