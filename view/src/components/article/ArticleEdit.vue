<template>
  <div class="article-edit p-t-20">
    <vue-editor @imageUpload="uploadImage"></vue-editor>
  </div>
</template>

<script>
import {uploadFile} from '../../actions'
import VueEditor from '../common/editor/VueEditor'

export default {
  data () {
    return {}
  },
  methods: {
    async uploadImage (file, cb) {
      const data = await uploadFile(file)
      cb && cb(data)
    }
  },
  components: {VueEditor}
}
</script>

<style lang="scss" scoped>
  .tag-item {
    display: inline-block;
    margin: 0 4px 0 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2px 8px;
    cursor: pointer;
  }
</style>
