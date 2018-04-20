<template>
  <div class="comment-container">
    <h2 class="font-24">文章评论</h2>

    <div class="comment-input m-t-20">
      <div class="comment-value p-h-10 p-v-6" contenteditable="true"></div>
      <div class="p-l-30 m-t-20" flex-box="0" flex="dir:left main:right">
        <div class="p-t-4"><input type="text" class="nick-name p-h-10 p-v-2" placeholder="昵称"></div>
        <div class="p-b-4"><div class="submti iblock p-v-4 p-h-20 pointer font-15 m-l-20">发表</div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.comment-container {
  .comment-input .comment-value {
    width: 100%; border-radius: 3px; border: 1px solid #aaa; outline: none; line-height: 24px; height: 44px; transition: all .4s ease-out; box-shadow: 0 0 8px 2px #ddd; overflow-y: auto;
    &:focus, &.not-empty { height: 100px;}
  }
  .nick-name {
    border: none; border-bottom: 1px solid #999; outline: none; width: 140px;
    &:focus { border-bottom-color: #22af6f;}
  }
  .submti {
    border: 1px solid #666; border-radius: 3px; background-color: #22af6f; color: #fff;
  }
}
</style>
