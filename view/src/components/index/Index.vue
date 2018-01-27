<template>
  <div class="p-t-40">
    <template v-if="articleData && articleData.length">
      <index-item v-for="item of articleData" :data="item" :key="item.title"></index-item>
    </template>
    <h3 v-else class="empty" flex="dir:left main:center cross:center">
      <vue-svg name="cry" class="svg-40 m-r-20"></vue-svg>
      <div>sorry，暂无数据</div>
    </h3>
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
  .empty {
    height: 100%;
    .svg-40 {
      color: #333;
    }
  }
</style>
