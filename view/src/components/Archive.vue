<template>
  <div class="m-v-40">
    <div class="month-item" v-for="month of groupingArticle" :key="month.title">
      <h1 class="font-20 m-t-40 p-b-30 p-h-18">"{{month.title}}"</h1>
      <ul>
        <li v-for="article of month.data" :key="article.id" @click="() => $router.push(`/article/detail/${article.id}`)" class="article-item font-16 p-18 pointer" flex="dir:left cross:center">
          <div flex-box="0" class="article-title">{{article.title}}</div>
          <div v-if="article.tags.length > 0" class="tag-list font-13 m-l-20" flex-box="1" flex="dir:left cross:center">
            <vue-svg icon="svg-tag" class="svg-14"></vue-svg>
            <div v-for="tag of article.tags" :key="tag" @click.stop="() => $router.push(`/tag/${tag}`)" flex-box="0" class="tag-item m-l-8">{{tag}}</div>
          </div>
          <span class="time font-13" flex-box="0">{{article.time}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getArchive} from '@/actions'

export default {
  data () {
    return {
      groupingArticle: [],
      pageIndex: 0
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
      if (result) {
        const groupingData = []
        const {recentMonth, lastMonth, recentYear, overAYear} = result
        if (recentMonth && recentMonth.length) groupingData.push({title: '最近一个月', data: recentMonth})
        if (lastMonth && lastMonth.length) groupingData.push({title: '上个月', data: lastMonth})
        if (recentYear && recentYear.length) groupingData.push({title: '最近一年', data: recentYear})
        if (overAYear && overAYear.length) groupingData.push({title: '一年前', data: overAYear})
        this.groupingArticle = groupingData
      }
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
  .article-item {
    &:hover {
      background-color: rgb(240, 240, 240);
      .article-title { text-decoration: underline;}
    }
    .article-title { color: #333; word-spacing: 2px;}
    .time { color: #999;}
    .tag-item {
      color: #888;
      &:hover { text-decoration: underline;}
    }
  }
</style>
