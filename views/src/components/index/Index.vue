<template>
  <div class="w-1000 p-t-40">
    <index-article-item v-for="item of examples" :key="item.title" :article="item"></index-article-item>
  </div>
</template>

<script>
  import {getLatestArticleList} from '@/actions'
  import IndexArticleItem from './IndexArticleItem'

  export default {
    data () {
      return {
        maxLength: 3,
        examples: []
      }
    },
    methods: {
      async getLatestArticle () {
        let result = await getLatestArticleList(this.maxLength)
        this.examples = result.data
      }
    },
    mounted () {
      this.getLatestArticle()
    },
    components: {
      IndexArticleItem
    }
  }
</script>

<style lang="scss" scoped>

</style>
