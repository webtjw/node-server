<template>
  <div class="p-t-40">
    <template v-if="articleData && articleData.length">
      <index-item v-for="item of articleData" :data="item" :key="item.title"></index-item>
    </template>
    <hinter v-else></hinter>
  </div>
</template>

<script>
  import {getIndexArticle} from '@/actions'
  import IndexItem from './IndexItem'

  export default {
    data () {
      return {
        maxLength: 4,
        articleData: []
      }
    },
    methods: {
      async getLatestArticle () {
        let data = await getIndexArticle(this.maxLength)
        if (data) this.articleData = data
      }
    },
    mounted () {
      this.getLatestArticle()
      // this.$router.getMatchedComponents('/article/add')[0]()
    },
    components: {
      IndexItem
    }
  }
</script>

<style lang="scss" scoped>
  .empty img {
    width: 140px;
  }
</style>
