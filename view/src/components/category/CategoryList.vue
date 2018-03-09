<template>
  <div class="p-h-20 m-v-40">
    <page-header :zh="$route.params.name"></page-header>
    <paging-list :getData="getArticle"></paging-list>
  </div>
</template>

<script>
  import PageHeader from '../common/PageHeader'
  import PagingList from './PagingList'
  import {getArticleByIndex} from '@/actions'

  export default {
    data () {
      return {
        numberInPage: 5 // 一页的数量
      }
    },
    methods: {
      async getArticle (index) {
        let queryObj = {}
        queryObj.queryType = 'category'
        queryObj.value = this.$route.params.name
        queryObj.number = this.numberInPage
        queryObj.index = index || 0

        let result = await getArticleByIndex(queryObj)
        return result
      }
    },
    components: {PagingList, PageHeader}
  }
</script>
