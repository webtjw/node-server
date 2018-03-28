<template>
  <div class="m-v-40">
    <!-- header -->
    <div flex="dir:left cross:center">
      <vue-svg icon="svg-tag"></vue-svg>
      <h1 class="font-18 a-r m-l-14">"{{$route.params.type}}"</h1>
    </div>
    <!-- article -->
    <div class="article-list m-v-40 p-t-20">
      <ul>
        <li v-for="article of articles" :key="article.id" @click="() => $router.push(`/article/detail/${article.id}`)" class="article-item font-16 p-v-18 p-h-20 pointer" flex="dir:left cross:center">
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
import '../assets/images/svg/svg-tag.svg'
import {getArticleByTag} from '@/actions'

export default {
  data () {
    return {
      articles: []
    }
  },
  methods: {
    async loadData (pageIndex = 0) {
      const {type} = this.$route.params
      const result = await getArticleByTag(type, pageIndex)
      if (result) this.articles = result
    }
  },
  watch: {
    $route (to, from) {
      to.params.type !== from.params.type && this.loadData()
    }
  },
  mounted () {
    this.loadData(0)
  }
}
</script>

<style lang="scss" scoped>
  .article-item {
    &:nth-child(2n) { background-color: rgb(245, 245, 245);}
    &:hover {
      background-color: rgb(230, 230, 230);
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
