<template>
  <div class="comment-item">
    <!-- 原评论 -->
    <div class="comment-origin">
      <div class="name m-b-20"><span>前端开发工程师</span> 说：</div>
      <div class="content">看书也是这样的，书中一些精彩的内容你会清晰的记得，就像神奇女侠挡子弹的镜头一样；但还有很多内容你无法清晰的记住，但会潜移默化的影响你的隐性记忆，所以当你重新看同一本书、或者看另外一本类似的书，如果看到一些关键内容，你会有一种似曾相识的感觉！</div>
      <div class="panel">
        <div class="like">
          <vue-svg icon="svg-like" class="svg-16"></vue-svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../assets/images/svg/svg-like.svg'

export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.name span {
  font-weight: 700;
}
</style>
