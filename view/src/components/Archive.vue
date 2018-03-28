<template>
  <div class="m-v-40">
    <div class="m-t-50">
    </div>
  </div>
</template>

<script>
import {getArchive} from '@/actions'

export default {
  data () {
    return {
      articleData: [],
      pageIndex: 0
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
    async loadData () {
      const {pageIndex} = this
      const pageSize = 20

      const result = await getArchive(pageIndex, pageSize)
      console.log(result)
      result.map(item => {
        item.tags = item.tags.split(',')
      })
      this.articleData = result
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>

</style>
