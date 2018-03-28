<template>
  <div class="p-t-40">
    <template v-if="articles && articles.length">
      <article v-for="item of articles" :key="item.id" class="index-item p-b-10">
        <!-- title -->
        <h1 class="a-c font-22">
          <router-link :to="`/article/detail/${item.id}`" class="iblock p-h-14 p-v-8">{{item.title}}</router-link>
        </h1>
        <!-- time -->
        <div class="time font-13 p-t-20 p-b-50 a-c">{{item.time}}</div>
        <!-- description -->
        <div v-html="compileHTML(item.description || item.codeText)" class="article-body font-16"></div>
        <!-- more -->
        <div class="more font-13 a-c pointer m-t-30">
          <router-link :to="`/article/detail/${item.id}`" class="iblock p-v-8 p-h-20">阅读全文</router-link>
        </div>
      </article>
    </template>
    <hinter v-else></hinter>
  </div>
</template>

<script>
import {getIndexArticle} from '@/actions'
import MarkdownIt from 'markdown-it'
const markdown = new MarkdownIt({
  html: true
})

export default {
  data () {
    return {
      articles: []
    }
  },
  methods: {
    async getLatestArticle () {
      const data = await getIndexArticle()
      if (data) this.articles = data
    },
    compileHTML (code) {
      return markdown.render(code)
    }
  },
  mounted () {
    this.getLatestArticle()
    // this.$router.getMatchedComponents('/article/add')[0]()
  }
}
</script>

<style lang="scss" scoped>
  .index-item {
    padding-bottom: 120px;
    h1 a { color: #333;}
    .tag-item { text-decoration: underline;}
    .attribute-separator { width: 4px; height: 4px; border-radius: 50%; background-color: #e6e6e6;}
    .time { color: #999;}
    .more a {
      background-color: #fff; color: #333; border-radius: 4px; border: 1px solid #666; transition: all .2s;
      &:hover { background-color: #666; color: #fff}
    }
    .article-body { text-indent: 2em; line-height: 1.6; color: #333;}
  }
</style>
