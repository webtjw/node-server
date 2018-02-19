<template>
  <div id="dialog-container" class="fixed font-14" :class="{hide: !show}">
    <div class="dialog-box absolute p-h-20 bg-fff">
      <!-- 顶部标题栏 -->
      <div class="dialog-header p-v-10 bold" flex="dir:left cross:center">
        <!-- 标题 -->
        <div flex-box="1" class="p-r-30">{{title}}</div>
        <!-- 右侧按钮区 -->
        <div flex-box="0" flex="dir:left main:center cross:center" @click="close">
          <vue-svg name="delete" class="svg-22 pointer"></vue-svg>
        </div>
      </div>
      <!-- 中间内容区 -->
      <div class="dialog-content p-v-20 relative">
        <slot></slot>
      </div>
      <!-- 底部按钮区 -->
      <div class="p-v-10"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      show: Boolean
    },
    methods: {
      close () {
        this.$emit('update:show', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #dialog-container {
    z-index: 1501;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, .4);

    .dialog-box {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      min-width: 300px;
      border-radius: 4px;
    }
    .dialog-content {
      border-top: 1px solid #ededed;
      border-bottom: 1px solid #ededed;
    }
  }
</style>
