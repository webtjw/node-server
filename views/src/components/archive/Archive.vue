<template>
  <div class="m-v-40">
    <h2 class="font-26">归档<span class="font-14 m-l-8">/ archives</span></h2>
    <archive-month v-for="(month, key) of articleList" :key="key" :monthData="month"></archive-month>
  </div>
</template>

<script>
  import ArchiveMonth from './ArchiveMonth'

  export default {
    data () {
      return {
        articleData: []
      }
    },
    computed: {
      articleList () {
        let articleData = this.articleData
        let list = {}

        if (Array.isArray(articleData)) {
          // 把数据从升序改为降序
          articleData = articleData.reverse()
          // 根据月份分组
          for (let item of articleData) {
            let id = this.getYearMonth(item.date)
            item.id = id
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
      }
    },
    mounted () {
      this.articleData = [
        {date: '2017-01-01', title: '讨论 base64 图片在前端的表现', category: 'HTML', time: '19:28', tags: ['base64', '前端工程', '图片优化']},
        {date: '2017-01-02', title: '讨论 svg 在前端的表现', category: 'HTML', time: '19:28', tags: ['base64', '前端工程', '图片优化']},
        {date: '2017-02-02', title: '分析 vue 的响应式系统', category: 'javascript', time: '19:28', tags: ['vue', '响应式', '底层实现']}
      ]
    },
    components: {
      ArchiveMonth
    }
  }
</script>

<style lang="scss" scoped>

</style>
