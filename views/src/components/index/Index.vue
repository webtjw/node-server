<template>
  <div class="w-1000 m-t-40">
    <index-article-item v-for="item of examples" :key="item.title" :article="item"></index-article-item>
  </div>
</template>

<script>
  import IndexArticleItem from './IndexArticleItem'

  export default {
    data () {
      return {
        examples: [
          {
            title: '浅谈前端工程化',
            author: 'Kawi Tan',
            date: '2017-10-11',
            content: `<p>浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，</p><p>浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，</p>`
          },
          {
            title: '浅谈前端工程化',
            author: 'Kawi Tan',
            date: '2017-10-11',
            content: `<p>浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，</p><p>浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，浅谈前端工程化，</p>`
          }
        ]
      }
    },
    components: {
      IndexArticleItem
    }
  }
</script>

<style lang="scss" scoped>

</style>
