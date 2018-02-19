<template>
  <div class="m-v-40">
    <page-header zh="归档" en="Archives"></page-header>
    <div class="m-t-50">
      <archive-month v-for="(month, key) of articleList" :key="key" :monthData="month"></archive-month>
    </div>
  </div>
</template>

<script>
  import ArchiveMonth from './ArchiveMonth'
  import PageHeader from '../common/PageHeader'
  import {getHistoryArticle} from '@/actions'

  export default {
    data () {
      return {
        articleData: [],
        pageIndex: 1,
        pageSize: 20
      }
    },
    computed: {
      articleList () {
        let {articleData} = this
        let list = {}

        if (Array.isArray(articleData)) {
          // 根据月份分组
          for (let item of articleData) {
            let id = this.getYearMonth(item.time)
            item.timestamp = id
            if (!list[id]) list[id] = []
            list[id].push(item)
          }
        }
        return list
      }
    },
    methods: {
      getYearMonth (date) {
        if (typeof date === 'string' && !!date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) return date.slice(0, 7)
        else return 'NODATE'
      },
      async fillData () {
        const obj = {
          index: this.pageIndex,
          size: this.pageSize
        }

        let result = await getHistoryArticle(obj)
        result.map(item => {
          item.tags = item.tags.split(',')
        })
        this.articleData = result
      }
    },
    mounted () {
      this.fillData()
    },
    components: {ArchiveMonth, PageHeader}
  }
</script>

<style lang="scss" scoped>

</style>
