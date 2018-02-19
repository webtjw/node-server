<template>
  <div class="article-content-container font-15 lh-18 m-t-30 p-b-40" v-html="content"></div>
</template>

<script>
  export default {
    props: {
      content: {
        required: true,
        type: String
      }
    }
  }
</script>

<style lang="scss">
  .article-content-container {
  }
</style>
