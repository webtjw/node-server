<template>
  <div class="comment-container">
    <h2 class="font-24">评论</h2>
    <div class="comment-input m-v-18" flex="dir:left">
      <textarea class="p-10"></textarea>
      <div class="p-l-30" flex-box="0" flex="dir:top main:justify">
        <div class="p-t-4"><input type="text" class="nick-name p-h-10 p-v-2" placeholder="昵称"></div>
        <div class="p-b-4"><div class="submti iblock p-v-4 p-h-10 pointer">发表评论</div></div>
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
  margin-top: 100px;
  .comment-input textarea { resize: none; width: 100%; height: 86px; border-radius: 4px; outline: none;}
  .nick-name {
    border: none; border-bottom: 1px solid #666; outline: none; width: 140px;
    &:focus { border-bottom-color: #22af6f;}
  }
  .submti {
    border: 1px solid #666; border-radius: 3px;
    &:hover { background-color: #22af6f;}
  }
}
</style>
