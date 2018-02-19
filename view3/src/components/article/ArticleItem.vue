<template>
  <article>
    <!-- 文章标题 -->
    <h2 class="a-c font-20">{{article.title}}</h2>
    <div class="a-c m-v-20 c-gray font-12" flex="dir:left main:center cross:center">
      <!-- 分类 -->
      <div class="m-r-30" flex="dir:left cross:center">
        <vue-svg name="category" class="svg-16 m-r-8"></vue-svg>
        <span>{{article.category}}</span>
      </div>
      <!-- 标签 -->
      <div class="m-r-30" flex="dir:left cross:center">
        <vue-svg name="tag" class="svg-16 m-r-8"></vue-svg>
        <span>{{article.tags | tagsText}}</span>
      </div>
      <!-- 时间 -->
      <div flex="dir:left cross:center">
        <vue-svg name="time" class="svg-16 m-r-8"></vue-svg>
        <span>{{article.date}}</span>
      </div>
    </div>
    <article-content :content="article.content"></article-content>
  </article>
</template>

<script>
  import ArticleContent from './ArticleContent'

  export default {
    props: {
      article: {
        type: Object,
        required: true
      }
    },
    filters: {
      tagsText (value) {
        let text = value.reduce((sum, item) => sum + '，' + item)
        return text
      }
    },
    components: {
      ArticleContent
    }
  }
</script>

<style lang="scss" scoped>
  img {
    width: 14px;
    height: 14px;
  }
</style>

