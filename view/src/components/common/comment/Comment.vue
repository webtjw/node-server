<template>
  <div class="comment-container">
    <h2 class="font-24">文章评论</h2>
    <!-- 评论输入 -->
    <div class="comment-input m-t-20">
      <textarea class="comment-value p-h-10 p-v-6" v-model="commentValue" :class="{'not-empty': commentValue}" placeholder="发表你的评论"></textarea>
      <div class="p-l-30 m-t-20" flex-box="0" flex="dir:left main:right" :class="{hide: !commentValue}">
        <div class="p-t-4">
          <input type="text" class="nick-name p-h-10 p-v-2 m-l-4" placeholder="昵称" v-model="nameValue">
        </div>
        <div class="p-b-4"><div class="submit iblock p-v-4 p-h-20 pointer font-15 m-l-30" :class="{loading: ''}" @click="checkSubmit">发表</div></div>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="comment-list m-t-40">
      <comment-item></comment-item>
    </div>
  </div>
</template>

<script>
import CommentItem from './CommentItem'

const sensitiveSql = ['delete', 'drop']

export default {
  data () {
    return {
      commentValue: '',
      nameValue: '',
      isSubmitting: false
    }
  },
  methods: {
    checkSubmit () {
      const {commentValue, nameValue, checkSql, submit, isSubmitting} = this
      
      if (isSubmitting) this.$toast.show('正在提交中...')
      else if (!commentValue || !commentValue.trim()) this.$toast.show('请输入评论')
      else if (checkSql(commentValue)) this.$toast.show('评论内容含有程序敏感字符，请检查替换后再评论')
      else if (!nameValue) this.$toast.show('请输入昵称')
      else if (checkSql(nameValue)) this.$toast.show('昵称含有程序敏感字符，请检查替换后再评论')
      else submit(commentValue, nameValue)
    },
    checkSql (value) {
      const lowerValue = value.toLowerCase()
      return sensitiveSql.some(item => lowerValue.includes(item))
    },
    async submit (comment, name) {
      this.isSubmitting = true
      // 此处当有异步保存数据
    }
  },
  components: {CommentItem}
}
</script>

<style lang="scss" scoped>
.comment-container {
  .comment-input .comment-value {
    resize: none; width: 100%; max-width: 100%; max-height: 100px; border-radius: 3px; border: 1px solid #aaa; outline: none; line-height: 24px; height: 44px; transition: all .4s ease-out; box-shadow: 0 0 4px 1px #eee; overflow-y: auto;
    &:focus, &.not-empty { height: 100px;}
    &:focus { box-shadow: 0 0 8px 2px #ddd;}
  }
  .nick-name {
    border: none; border-bottom: 1px solid #999; outline: none; width: 140px;
    &:focus { border-bottom-color: #22af6f;}
  }
  .submit {
    border: 1px solid #666; border-radius: 3px; background-color: #fff; color: #555;
    &:hover { background-color: #22af6f; color: #fff;}
  }
}
</style>
