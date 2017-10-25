<template>
  <article>
    <h2 class="a-c font-26">{{article.title}}</h2>
    <div class="a-c m-v-20 c-gray font-12">
      <span class="m-r-30">作者：{{article.author}}</span>
      <span>时间：{{article.date}}</span>
    </div>
    <article-content :content="article.content"></article-content>
  </article>
</template>

<script>
  import ArticleContent from './ArticleContent'

  export default {
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    data () {
      return {}
    },
    components: {
      ArticleContent
    }
  }
</script>
