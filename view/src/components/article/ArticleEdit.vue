<template>
  <div class="article-edit">
    <!-- tag -->
    <div class="p-v-20" flex="dir:left cross:center">
      <span>选择标签：</span>
      <a href="javascript:void(0)" class="tag-item m-r-10" v-for="(tag, index) of tags" :key="tag.name" @click="removeTag(tag, index)">{{tag.name}}</a>
      <div class="tag-add relative">
        <input type="text" class="p-h-8" @focus="isShowSelect = true" @blur="hideSelect" @keydown.13="selectTag" v-model="searchTag">
        <ul class="select absolute" v-show="isShowSelect">
          <li v-for="(tag, index) of remoteTags" :key="tag.name" class="p-h-10 p-v-8 pointer" @click="selectTag(tag, index)">{{tag.name}}</li>
        </ul>
      </div>
    </div>
    <!-- editor -->
    <vue-editor @imageUpload="uploadImage" @save="onSave"></vue-editor>
  </div>
</template>

<script>
import {uploadFile, saveArticle} from '../../actions'
import VueEditor from '../common/editor/VueEditor'

export default {
  data () {
    return {
      tags: [],
      remoteTags: [
        {name: 'javascript', id: 1},
        {name: 'css', id: 2},
        {name: 'WebApi', id: 3},
        {name: '前端工程化', id: 4},
        {name: '生活啊', id: 5}
      ],
      isShowSelect: false,
      searchTag: ''
    }
  },
  methods: {
    async uploadImage (file, cb) {
      const data = await uploadFile(file)
      cb && cb(data)
    },
    async onSave (code, html) {
      const result = await saveArticle(code)
      console.log(result)
    },
    selectTag (tag, index) {
      const {searchTag, remoteTags, tags, isShowSelect} = this
      if (tags.length === 3) alert('为保证文章的倾向准确度，文章标签不能大于3个')
      else if (tag && index !== undefined) {
        if (isShowSelect) this.isShowSelect = false
        tags.push(tag)
        remoteTags.splice(index, 1)
      } else {
        const value = searchTag.replace(/\s/g, '')
        if (value) {
          if (tags.some(item => item.name === value)) {
            const inRemoteItem = remoteTags.filter(item => item.name === value)
            if (inRemoteItem && inRemoteItem.length === 1) {
              tags.push(inRemoteItem[0])
              remoteTags.splice(remoteTags.indexOf(inRemoteItem[0]), 1)
            }
          } else if (confirm(`确定添加标签 ${value} ？`)) tags.push({name: value, id: -1})
          this.searchTag = ''
        }
      }
    },
    removeTag (tag, index) {
      this.remoteTags.push(tag)
      this.tags.splice(index, 1)
    },
    hideSelect () {
      setTimeout(() => {
        if (this.isShowSelect) this.isShowSelect = false
      }, 200)
    }
  },
  components: {VueEditor}
}
</script>

<style lang="scss" scoped>
  .tag-item { color: #4c9ed0; text-decoration: underline;}
  .tag-add {
    input { height: 24px; outline: 0; border: 0; border-bottom: 1px solid #bbb; width: 150px;}
    .select {
      left: 0; top: 100%; background: #fff; z-index: 3; min-width: 100%; box-shadow: 2px 1px 8px #bbb;
      li:hover { background-color: #666; color: #fff;}
    }
  }
</style>
