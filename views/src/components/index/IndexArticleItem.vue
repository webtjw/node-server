<template>
  <div>
    <article-item :article="article"></article-item>
    <!-- read more -->
    <div class="m-v-20" flex="dir:left main:center">
      <router-link to="/" class="p-v-8 p-h-40 border">more</router-link>
    </div>
  </div>
</template>

<script>
  import ArticleItem from '../article/ArticleItem'

  export default {
    props: {
      article: Object
    },
    components: {
      ArticleItem
    }
  }
</script>
