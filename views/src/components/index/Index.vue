<template>
  <div class="w-1000 m-t-40">
    <article-item :article="example"></article-item>
  </div>
</template>

<script>
  import ArticleItem from '../article/ArticleItem'

  export default {
    data () {
      return {
        example: {
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

<style lang="scss" scoped>

</style>
