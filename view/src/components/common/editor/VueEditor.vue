<template>
  <div class="v-editor">
    <!-- tools -->
    <div class="tools p-h-20 p-v-10 relative" flex="dir:left main:justify cross:center">
      <div class="edit-tools">
        <vue-svg v-for="tool in editTools" :key="tool.icon" :icon="tool.icon" :title="tool.title" @click.native="tool.method" class="svg-18 pointer m-h-4 p-4"></vue-svg>
      </div>
      <div class="functional-tools">
        <vue-svg v-for="tool in functionalTools" :key="tool.icon" :icon="tool.icon" class="svg-18 pointer m-h-4 p-2"></vue-svg>
      </div>
    </div>
    <!-- edit area -->
    <div class="edit-container" ref="edit" :style="{height: editHeight + 'px'}">
      <textarea class="v-input-feild v-area-item" v-model="inputValue" ref="input" @scroll="sameScroll($event, 'right')" @mouseover="mouseScrollType = 0" spellcheck="false" @select="updateSelection" @click="updateSelection" @keydown="updateSelection"></textarea>
      <pre class="preview v-area-item" ref="preview" v-html="compileHTML" @scroll="sameScroll($event, 'left')" @mouseover="mouseScrollType = 1">
        <!-- 暂时为了实现同屏效果采用 pre，后面要改回 div -->
      </pre>
    </div>
  </div>
</template>

<script>
import preProcess from './preProcess'
import MarkdownIt from 'markdown-it'
import './importSvg'
const markdown = new MarkdownIt({
  html: true
})

export default {
  data () {
    return {
      editTools: [
        {icon: 'svg-title', title: '设置为标题', method: this.setTitle},
        {icon: 'svg-bold', title: '粗体', method: this.setBold},
        {icon: 'svg-center', title: '居中', method: this.setAlign},
        {icon: 'svg-quote', title: '引用', method: this.setTitle},
        {icon: 'svg-list', title: '列表', method: this.setTitle},
        {icon: 'svg-link', title: '插入链接', method: this.setTitle},
        {icon: 'svg-image', title: '插入图片', method: this.setTitle},
        {icon: 'svg-code', title: '插入代码段', method: this.setTitle},
        {icon: 'svg-codes', title: '插入代码块', method: this.setTitle},
        {icon: 'svg-table', title: '插入表格', method: this.setTitle}
      ],
      functionalTools: [
        {icon: 'svg-undo', title: '撤销改动', method: null},
        {icon: 'svg-redo', title: '恢复改动', method: null},
        {icon: 'svg-save', title: '保存', method: null},
        {icon: 'svg-fullscreen', title: '全屏编辑', method: null}
      ],
      editHeight: 0,
      inputValue: '',
      mouseScrollType: -1,
      inputSelection: {
        start: 0,
        end: 0,
        prev: '',
        selected: '',
        next: ''
      }
    }
  },
  computed: {
    compileHTML () {
      const {inputValue} = this
      const articleStructure = preProcess(markdown, inputValue)
      const {title, whole} = articleStructure
      const renderString = title || whole ? `# 标题 - ${articleStructure.title || ''} #\n${articleStructure.whole}` : ''
      return markdown.render(renderString)
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
    },
    updateSelection () {
      const {$refs: {input}, inputValue} = this
      const start = input.selectionStart
      const end = input.selectionEnd
      this.inputSelection.start = start
      this.inputSelection.end = end
      this.inputSelection.prev = inputValue.slice(0, start)
      this.inputSelection.selected = inputValue.slice(start, end)
      this.inputSelection.next = inputValue.slice(end)
    },
    setTitle () {
      const {inputSelection: {start, selected, next}, $refs: {input}} = this
      if (start === 0) {
        this.inputValue = `#t ${(selected || '标题') + (next.startsWith('\n') ? '' : '\n')}` + next
        this.$nextTick(() => {
          input.selectionStart = 3
          input.selectionEnd = 3 + (selected.length || 2)
          input.focus()
        })
      }
    },
    setBold () {
      const {inputSelection: {start, prev, selected, next}, $refs: {input}} = this
      this.inputValue = prev + `**${selected || '粗体'}**` + next
      this.$nextTick(() => {
        input.selectionStart = start + 2
        input.selectionEnd = start + (selected.length || 2) + 2
        input.focus()
      })
    },
    setAlign () {
      const {inputSelection: {start, prev, selected, next}, $refs: {input}} = this
      this.inputValue = prev + `**${selected || '居中'}**` + next
      this.$nextTick(() => {
        input.selectionStart = start + 2
        input.selectionEnd = start + (selected.length || 2) + 2
        input.focus()
      })
    }
  },
  watch: {
    inputValue () {
      this.updateSelection()
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
