<template>
  <div class="m-v-40">
    <template v-if="articles && articles.length">
      <article v-for="item of articles" :key="item.id" class="index-item p-t-40">
        <!-- title -->
        <h1><router-link class="font-24" :to="`/article/detail/${item.id}`">{{item.title}}</router-link></h1>
        <!-- time -->
        <div class="attribute font-14 m-t-30 m-b-40"><div>{{item.time}}</div></div>
        <!-- description -->
        <div v-html="compileHTML(item.description || item.codeText)" class="markdown-preview"></div>
        <!-- tags -->
        <div v-if="item.tags && item.tags.length" class="attribute font-14 m-t-30 m-b-40" flex="dir:left cross:center">
          <vue-svg icon="svg-tag" class="svg-14"></vue-svg>
          <router-link v-for="tag of item.tags" :key="tag" :to="`/tag/${tag}`" class="tag-item m-l-10">{{tag}}</router-link>
        </div>
        <!-- more -->
        <div class="more font-14 a-c pointer m-t-30">
          <router-link :to="`/article/detail/${item.id}`" class="iblock p-v-8 p-h-20">阅读全文</router-link>
        </div>
      </article>
    </template>
    <hinter v-else></hinter>
  </div>
</template>

<script>
import {getIndexArticle} from '@/actions'
import markdown from './article/mdInstance'

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
  }
}
</script>

<style lang="scss" scoped>
  .index-item {
    padding-bottom: 120px;
    h1 a {
      color: #333;
      &:hover { color: #22af6f;}
    }
    .attribute-separator { width: 4px; height: 4px; border-radius: 50%; background-color: #e6e6e6;}
    .attribute, .tag-item { color: #888;}
    .more a {
      background-color: #fff; color: #333; border-radius: 4px; border: 1px solid #666; transition: all .2s;
      &:hover { background-color: #22af6f; color: #fff; text-decoration: none;}
    }
    .tag-item:hover { color: #22af6f; text-decoration: underline;}
  }
</style>
