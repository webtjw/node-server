<template>
  <div class="v-editor">
    <!-- tools -->
    <div class="tools p-h-20 p-v-10 relative" flex="dir:left main:justify cross:center">
      <div class="edit-tools">
        <vue-svg v-for="tool in editTools" :key="tool.icon" :icon="tool.icon" :title="tool.title" class="svg-18 pointer m-h-4 p-4"></vue-svg>
      </div>
      <div class="functional-tools">
        <vue-svg v-for="tool in functionalTools" :key="tool.icon" :icon="tool.icon" class="svg-18 pointer m-h-4 p-2"></vue-svg>
      </div>
    </div>
    <!-- edit area -->
    <div class="edit-container" ref="edit" :style="{height: editHeight + 'px'}">
      <textarea class="v-input-feild v-area-item" v-model="inputValue" ref="input" @scroll="sameScroll($event, 'right')" @mouseover="mouseScrollType = 0" spellcheck="false"></textarea>
      <pre class="preview v-area-item" ref="preview" v-html="compileHTML" @scroll="sameScroll($event, 'left')" @mouseover="mouseScrollType = 1">
        <!-- 暂时为了实现同屏效果采用 pre，后面要改回 div -->
      </pre>
    </div>
  </div>
</template>

<script>
import preProcess from './preProcess'
import markdownIt from 'markdown-it'
import './importSvg'
const markdown = markdownIt()

export default {
  data () {
    return {
      editTools: [
        {icon: 'svg-title', title: '设置为标题', method: null},
        {icon: 'svg-bold', title: '粗体', method: null},
        {icon: 'svg-underline', title: '下划线', method: null},
        {icon: 'svg-center', title: '居中', method: null},
        {icon: 'svg-quote', title: '引用', method: null},
        {icon: 'svg-list', title: '列表', method: null},
        {icon: 'svg-link', title: '插入链接', method: null},
        {icon: 'svg-image', title: '插入图片', method: null},
        {icon: 'svg-code', title: '插入代码段', method: null},
        {icon: 'svg-codes', title: '插入代码块', method: null},
        {icon: 'svg-table', title: '插入表格', method: null}
      ],
      functionalTools: [
        {icon: 'svg-undo', title: '撤销改动', method: null},
        {icon: 'svg-redo', title: '恢复改动', method: null},
        {icon: 'svg-save', title: '保存', method: null},
        {icon: 'svg-fullscreen', title: '全屏编辑', method: null}
      ],
      editHeight: 0,
      inputValue: '',
      mouseScrollType: -1
    }
  },
  computed: {
    compileHTML () {
      const {inputValue} = this
      const articleStructure = preProcess(inputValue)
      return articleStructure
    }
  },
  methods: {
    sameScroll (event, type) {
      const {$refs: {input, preview}, changeScroll, mouseScrollType} = this
      const {target: {scrollTop, scrollHeight}} = event
      const element = type === 'right' ? preview : input
      if ((type === 'right' && mouseScrollType !== 1) || (type === 'left' && mouseScrollType !== 0)) {
        this.$nextTick(() => {
          setTimeout(requestAnimationFrame(changeScroll.bind(null, element, element.scrollHeight * (+(scrollTop / scrollHeight).toFixed(2)))), 200)
        })
      }
    },
    changeScroll (el, distance) {
      el.scrollTop = distance
    }
  },
  mounted () {
    this.editHeight = document.documentElement.clientHeight - this.$refs.edit.offsetTop - 20
  }
}
</script>

<style lang="scss" scoped>
  .v-editor {
    box-shadow: 0 -1px 4px 1px #ddd;
    border-radius: 3px;
    .tools {
      box-shadow: 0 1px 8px #ddd;
    }
    .edit-container {
      font-size: 0;

        .v-area-item {
        overflow: hidden;
        display: inline-block;
        height: 100%;
        width: 50%;
        padding: 10px;
        box-sizing: border-box;
        background-color: #fff;
        overflow-y: auto;
        overflow-x: hidden;
        font: 14px/1.6 consolas, "Miscrosoft Yahei";
        &.preview { border-left: 1px solid #ededed;}
        &::-webkit-scrollbar { width: 8px;}
        &::-webkit-scrollbar-track { display: none;}
        &::-webkit-scrollbar-button { display: none;}
        &::-webkit-scrollbar-thumb { background-color: #aaa;}
      }
    }
    .v-input-feild {
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      border: 0;
      outline: 0;
      resize: none;
    }
  }
</style>
