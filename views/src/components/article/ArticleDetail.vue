<template>
  <div class="p-t-60 m-t-10">
    <article-item :article="article"></article-item>
  </div>
</template>


<script>
  import ArticleItem from './ArticleItem'

  export default {
    data () {
      return {
        article: {
          title: '浅谈前端工程化',
          author: 'Kawi Tan',
          date: '2017-10-11',
          content: `<p>浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，</p><p>浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，</p>`
        }
      }
    },
    components: {
      ArticleItem
    }
  }
</script>
