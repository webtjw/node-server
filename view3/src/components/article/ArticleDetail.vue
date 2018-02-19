<template>
  <div class="p-t-60 m-t-10">
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
  </div>
</template>


<script>
  import '../../assets/style/highlight.css'
  import ArticleContent from './ArticleContent'
  import {getArticleById} from '@/actions'

  export default {
    data () {
      return {
        article: {
          title: '1',
          category: '2',
          date: '3',
          tags: ['4'],
          content: '5'
        }
      }
    },
    methods: {
      async getDetail () {
        const {id} = this.$route.params
        let detail = await getArticleById(+id)

        if (detail.id) {
          let {title, category, time, tags, codeText} = detail
          this.article.category = category
          this.article.title = title
          this.article.date = time
          this.article.tags = tags
          this.article.content = codeText
        }
      }
    },
    filters: {
      tagsText (value) {
        let text = value.reduce((sum, item) => sum + ' · ' + item)
        return text
      }
    },
    mounted () {
      this.getDetail()
    },
    components: {ArticleContent}
  }
</script>
