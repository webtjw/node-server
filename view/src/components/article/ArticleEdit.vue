<template>
  <div class="article-edit p-t-20">
    <vue-editor></vue-editor>
  </div>
</template>

<script>
import VueEditor from '../common/editor/VueEditor'

export default {
  data () {
    return {}
  },
  methods: {},
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
