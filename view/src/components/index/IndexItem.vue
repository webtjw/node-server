<template>
  <div class="index-item p-b-10 m-b-20">
    <h1 class="a-c p-v-12 font-20">
      <div class="iblock p-h-14 p-v-8">{{data.title}}</div>
    </h1>
    <article v-if="data.list.length > 0">
      <div v-for="item of data.list" :key="item.title" class="article-item p-v-20 p-h-20" flex="dir:left cross:center">
        <router-link :to="`/article/${item.id}`" class="title font-15 c-normal" flex-box="0">{{item.title}}</router-link>
        <div class="tag p-l-20 p-r-4 bg-fff" flex-box="1" flex="dir:left cross:center">
          <vue-svg name="tag" class="svg-14 m-r-8"></vue-svg>
          <router-link :to="`/tags/${tag}`" v-for="tag of item.tags" :key="tag" class="tag-item m-r-8 font-10 c-normal">{{tag}}</router-link>
        </div>
        <div class="p-l-10 font-12" flex-box="0">{{item.time}}</div>
      </div>
    </article>
    <!-- 无数据 tips -->
    <h4 v-else class="empty p-v-20" flex="dir:left main:center cross:center">
      <div>空空如也</div>
    </h4>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .index-item {
    &:nth-child(2n) {
      background-color: #f5f5f5;
      & .tag {
        background-color: #f5f5f5;
      }

      .article-item:hover, .article-item:hover .tag {
        background-color: #fff;
      }
    }
    > h1 div {
      border-bottom: 1px solid #666;
      letter-spacing: 1px;
    }
    .article-item, .tag {
      opacity: .8;
      transition: all .2s linear;
    }

    .article-item:hover, .article-item:hover .tag {
      background-color: #f5f5f5;
    }
    a:hover {
      text-decoration: underline;
    }
    .tag-item:hover {
      color: orangered;
    }
    .tag img {
      width: 14px;
      height: 14px;
    }
  }
</style>
