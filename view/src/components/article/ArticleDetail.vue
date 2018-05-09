<template>
  <div class="p-v-40">
    <article class="m-v-40">
      <!-- 文章标题 -->
      <h1 class="font-24">{{article.title}} <router-link v-if="isDeveloper" :to="`/article/edit/${$route.params.id}`">edit</router-link></h1>
      <div class="article-attrs font-13 m-t-30 m-b-40" flex="cross:center">
        <!-- time -->
        <div class="m-r-40">{{article.date}}</div>
        <!-- tags -->
        <div v-if="article.tags && article.tags.length" class="" flex="dir:left main:center cross:center">
          <vue-svg icon="svg-tag" class="svg-14"></vue-svg>
          <router-link v-for="tag in article.tags" :key="tag" :to="`/tag/${tag}`" class="tag-item m-l-10">{{tag}}</router-link>
        </div>
      </div>
      <!-- article -->
      <div class="markdown-preview" v-html="article.content"></div>
      <!-- tips -->
      <div class="m-v-40 p-v-40 a-c font-20">（完）</div>
    </article>
    <!-- comment -->
  </div>
</template>

<script>
import Utils from '@/toolkits/Utils'
import '../../assets/images/svg/svg-time.svg'
import '../../assets/images/svg/svg-tag.svg'
import {getArticleById} from '@/actions'
import markdown from '../article/mdInstance'
// import Comment from '../common/comment/Comment'

export default {
  data () {
    return {
      article: {
        title: '',
        date: '',
        tags: [],
        content: ''
      },
      isDeveloper: false
    }
  },
  methods: {
    async getDetail () {
      const {id} = this.$route.params
      const {success, data} = await getArticleById(+id)

      if (success && data && data.id) {
        const {title, time, tags, codeText} = data
        this.article.title = title
        this.article.date = time
        this.article.tags = tags
        this.article.content = markdown.render(codeText)
      }
    },
    async checkDevelopMode () {
      const data = await Utils.isLogin()
      this.isDeveloper = !!data
    }
  },
  filters: {
    tagsText (tags) {
      if (tags && tags.length > 0) return tags.reduce((sum, item) => sum + ' · ' + item)
      else return ''
    }
  },
  mounted () {
    this.getDetail()
    this.checkDevelopMode()
  }
}
</script>

<style lang="scss" scoped>
  .article-attrs { color: #888;}
  .tag-item {
    color: #333;
    &:hover { color: #22af6f; text-decoration: underline;}
  }
</style>
