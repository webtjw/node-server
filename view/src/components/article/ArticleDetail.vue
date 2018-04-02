<template>
  <div class="p-t-60 m-t-10">
    <article :class="{relative: isDeveloper}">
      <div v-if="isDeveloper" class="panel absolute">
        <router-link :to="`/article/edit/${$route.params.id}`">edit</router-link>
      </div>
      <!-- 文章标题 -->
      <h2 class="a-c font-20">{{article.title}}</h2>
      <div class="a-c p-v-30 c-gray font-12" flex="dir:left main:center cross:center">
        <!-- 标签 -->
        <div class="m-r-30" flex="dir:left cross:center">
          <vue-svg icon="svg-tag" class="svg-16"></vue-svg>
          <router-link v-for="tag in article.tags" :key="tag" :to="`/tag/${tag}`" class="tag-item m-l-8">{{tag}}</router-link>
        </div>
        <!-- 时间 -->
        <div flex="dir:left cross:center">
          <vue-svg icon="svg-time" class="svg-16 m-r-8"></vue-svg>
          <span>{{article.date}}</span>
        </div>
      </div>
      <div class="markdown-preview m-t-50 m-b-40" v-html="article.content"></div>
    </article>
  </div>
</template>

<script>
import '../../assets/images/svg/svg-time.svg'
import '../../assets/images/svg/svg-tag.svg'
import {getArticleById, checkLogin} from '@/actions'
import markdown from '../article/mdInstance'

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
      const article = await getArticleById(+id)

      if (article && article.id) {
        const {title, time, tags, codeText} = article
        this.article.title = title
        this.article.date = time
        this.article.tags = tags
        this.article.content = markdown.render(codeText)
      }
    },
    async checkDevelopMode () {
      const result = await checkLogin()
      if (result && result.isDeveloper) this.isDeveloper = result.isDeveloper
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
  .article-content { text-indent: 2em;}
  .tag-item {
    color: #333;
    &:hover { text-decoration: underline;}
  }
  .panel { right: 0; top: 0;}
</style>
