<template>
  <article>
    <h2 class="a-c">{{article.title}}</h2>
    <div class="a-c m-v-10 c-gray">
      <span class="font-12 m-r-30">作者：{{article.author}}</span>
      <span class="font-12">时间：{{article.date}}</span>
    </div>
    <div v-html="article.content" class="font-14 lh-16 article-content m-t-30"></div>
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
