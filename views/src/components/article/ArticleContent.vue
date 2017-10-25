<template>
  <div class="article-content-container font-16 lh-18 m-t-30" v-html="content"></div>
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

    p, div {
      margin: 10px 0;
      text-indent: 2em;
    }
  }
</style>
