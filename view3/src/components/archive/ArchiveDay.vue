<template>
  <div class="day-item p-v-20 m-l-20 p-h-10" flex="dir:left cross:center">
    <router-link :to="`/article/${day.id}`" class="title font-15 c-normal" flex-box="0">{{day.title}}</router-link>
    <div class="tag p-l-20 p-r-4 bg-fff" flex-box="1" flex="dir:left cross:center">
      <vue-svg name="tag" class="svg-14 m-r-8"></vue-svg>
      <router-link :to="`/tags/${tag}`" v-for="tag of day.tags" :key="tag" class="tag-item m-r-8 font-10 c-normal">{{tag}}</router-link>
    </div>
    <div class="p-l-10 font-12" flex-box="0">{{day.time}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      day: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
  .day-item:hover, .day-item:hover .tag {
    background-color: #fff;
  }
  .day-item, .tag {
    opacity: .8;
    transition: all .2s linear;
  }

  .day-item:hover, .day-item:hover .tag {
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
</style>
