<template>
  <div class="p-l-20 p-v-8" flex="dir:left cross:center">
    <div class="font-16 p-r-8" flex-box="0">
      <router-link class="link-item c-normal" to="/article/detail/1">{{day.title}}</router-link>
    </div>
    <div flex-box="1" class="link-dots"></div>
    <div class="c-gray font-14 p-l-8" flex-box="0">{{day.date}} {{day.time}}</div>
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
  .link-dots {
    height: 1px;
    background: url(../../assets/images/dot.jpg) repeat-x center center;
  }
  .link-item:hover {
    color: #ee7600;
    border-bottom: 1px solid #ee7600;
  }
</style>
