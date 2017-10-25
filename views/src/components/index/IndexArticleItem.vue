<template>
  <div class="p-v-30">
    <article-item :article="article"></article-item>
    <!-- read more -->
    <div class="m-v-20" flex="dir:left main:center">
      <router-link to="/article/detail/1" class="p-v-4 p-h-12 font-14">more »</router-link>
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
