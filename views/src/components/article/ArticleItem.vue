<template>
  <article>
    <h2 class="a-c font-24">{{article.title}}</h2>
    <div class="a-c m-v-14 c-gray font-12">
      <span class="m-r-30">作者：{{article.author}}</span>
      <span>时间：{{article.date}}</span>
    </div>
    <div v-html="article.content" class="font-16 lh-16 article-content m-t-30"></div>
  </article>
</template>

<script>
  export default {
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  .article-content {
    p, div {
      margin: 10px 0;
      text-indent: 2em;
    }
  }
</style>
