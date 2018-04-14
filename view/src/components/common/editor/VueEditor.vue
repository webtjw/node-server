<template>
  <div class="v-editor" :class="{fullscreen: isFullscreen}">
    <!-- tools -->
    <div class="tools" ref="tool">
      <!-- tools list -->
      <div flex="dir:left main:justify cross:center">
        <div class="edit-tools">
          <vue-svg v-for="tool in editTools" :key="tool.icon" :icon="tool.icon" :title="tool.title" @click.native="tool.method" class="svg-18 pointer m-h-4 p-4"></vue-svg>
        </div>
        <div class="functional-tools">
          <vue-svg v-for="tool in functionalTools" :key="tool.icon" :icon="tool.icon" :title="tool.title" @click.native="tool.method" class="svg-18 pointer m-h-4 p-2"></vue-svg>
        </div>
      </div>
      <!-- additional dialog -->
      <div class="additional-tool" v-show="additionalToolType !== -1">
        <!-- upload image -->
        <div class="additional-image" v-show="additionalToolType === 'image'">
          <div flex="dir:left cross:center">
            <label flex-box="0">网络图片：</label>
            <input class="image-net" ref="imageFromNet" type="text" style="width: 300px;">
          </div>
          <div flex="dir:left cross:center">
            <label flex-box="0">本地图片：</label>
            <div class="btn upload-image" @click="triggerSelectImage">上传</div>
            <input type="file" ref="uploadImageInput" @change="onFileUpload">
          </div>
        </div>
        <!-- add table -->
        <div class="additional-table" v-show="additionalToolType === 'table'">
          <div flex="dir:left cross:center">
            <label flex-box="0">表格行数：</label><input type="text" ref="tableRowNumber">
            <label flex-box="0" style="margin-left: 30px;">列数：</label><input type="text" ref="tableColumnNumber">
          </div>
        </div>
        <div class="controls" flex="dir:left main:center cross:center">
          <div class="btn cancel" @click="additionalToolType = -1">取消</div>
          <div class="btn" @click="confirmAdditionalTool">确认</div>
        </div>
      </div>
    </div>
    <!-- edit area -->
    <div class="edit-container markdown-preview" ref="edit" :style="{height: editHeight + 'px'}">
      <textarea class="v-input-feild v-area-item" v-model="inputValue" ref="input" @scroll="sameScroll($event, 'right')" @mouseover="mouseScrollType = 0" spellcheck="false" @select="updateSelection" @click="updateSelection" @keydown="updateSelection"></textarea>
      <div class="preview v-area-item" ref="preview" v-html="compileHTML" @scroll="sameScroll($event, 'left')" @mouseover="mouseScrollType = 1"></div>
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
let notFullHeight = 0

export default {
  props: {
    upload: String
  },
  data () {
    return {
      editTools: [
        {icon: 'svg-title', title: '设置为标题', method: this.setTitle},
        {icon: 'svg-bold', title: '粗体', method: this.setBold},
        {icon: 'svg-center', title: '居中', method: this.setAlign},
        {icon: 'svg-quote', title: '引用', method: this.setQuote},
        {icon: 'svg-more', title: '插入预览符', method: this.setMore},
        {icon: 'svg-list', title: '列表', method: this.setList},
        {icon: 'svg-link', title: '插入链接', method: this.setLink},
        {icon: 'svg-image', title: '插入图片', method: () => { this.additionalToolType = 'image' }},
        {icon: 'svg-code', title: '插入代码段', method: this.setCode},
        {icon: 'svg-codes', title: '插入代码块', method: this.setCodeBlock},
        {icon: 'svg-table', title: '插入表格', method: () => { this.additionalToolType = 'table' }}
      ],
      functionalTools: [
        {icon: 'svg-undo', title: '撤销改动', method: null},
        {icon: 'svg-redo', title: '恢复改动', method: null},
        {icon: 'svg-fullscreen', title: '全屏编辑', method: this.setFullscreen},
        {icon: 'svg-save', title: '保存', method: this.save}
      ],
      editHeight: 0,
      isFullscreen: false,
      inputValue: '',
      mouseScrollType: -1,
      inputSelection: {
        start: 0,
        end: 0,
        prev: '',
        selected: '',
        next: ''
      },
      additionalToolType: -1
    }
  },
  computed: {
    compileHTML () {
      const {inputValue} = this
      const articleStructure = preProcess(markdown, inputValue)
      const {title, codeText} = articleStructure
      const renderString = title || codeText ? `<div class="article-title">${articleStructure.title}</div>\n\n${articleStructure.body}` : ''
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
    focusSelection (start, end) {
      const {$refs: {input}} = this
      this.$nextTick(() => {
        input.selectionStart = start
        input.selectionEnd = end
        input.focus()
      })
    },
    setTitle () {
      const {inputSelection: {start, selected, next}} = this
      if (start === 0) {
        this.inputValue = `#t ${(selected || '标题') + (next.startsWith('\n') ? '' : '\n')}` + next
        this.focusSelection(3, 3 + (selected.length || 2))
      }
    },
    setBold () {
      const {inputSelection: {start, prev, selected, next}} = this
      this.inputValue = prev + `**${selected || '粗体'}**` + next
      this.focusSelection(start + 2, start + (selected.length || 2) + 2)
    },
    setAlign () {
      const {inputSelection: {start, prev, selected, next}} = this
      const isPrevWrap = prev.endsWith('\n')
      this.inputValue = (isPrevWrap ? prev : prev + '\n') + `**center\n${selected || '居中'}\n**\n` + next
      this.focusSelection(start + 9 + Number(!isPrevWrap), start + (selected.length || 2) + 9 + Number(!isPrevWrap))
    },
    setQuote () {
      const {inputSelection: {start, prev, selected, next}} = this
      const isPrevWrap = prev.endsWith('\n')
      this.inputValue = (isPrevWrap ? prev : (prev + '\n')) + `> ${selected || '块级引用'}\n` + next
      this.focusSelection(start + 2 + Number(!isPrevWrap), start + (selected.length || 4) + 2 + Number(!isPrevWrap))
    },
    setList () {
      const {inputSelection: {start, prev, selected, next}} = this
      const isPrevWrap = prev.endsWith('\n')
      this.inputValue = (isPrevWrap ? prev : (prev + '\n')) + `* ${selected || '列表项1'}\n* 列表项2\n` + next
      this.focusSelection(start + 2 + Number(!isPrevWrap), start + (selected.length || 4) + 2 + Number(!isPrevWrap))
    },
    setLink () {
      const {inputSelection: {start, prev, selected, next}} = this
      this.inputValue = prev + `[${selected || 'link'}](http:// "title")` + next
      this.focusSelection(start + 1, start + (selected.length || 4) + 1)
    },
    setImage (path) {
      if (path) {
        const {inputSelection: {start, prev, selected, next}} = this
        const isPrevWrap = prev.endsWith('\n')
        this.inputValue = (isPrevWrap ? prev : (prev + '\n')) + `![${selected || 'alt'}](${path} "title")\n` + next
        this.focusSelection(start + 2 + Number(!isPrevWrap), start + (selected.length || 3) + 2 + Number(!isPrevWrap))
      }
    },
    triggerSelectImage () {
      this.$refs.uploadImageInput.click()
    },
    onFileUpload () {
      const file = this.$refs.uploadImageInput.files[0]
      const fileType = file.type.split('/')
      if (fileType[0] && fileType[0] === 'image') this.$emit('imageUpload', file, this.setImage.bind(this))
      else alert('上传文件非图片')
      // hide
      this.additionalToolType = -1
    },
    confirmAdditionalTool () {
      const {additionalToolType} = this
      if (additionalToolType === 'image') {
        const image = this.$refs.imageFromNet.value
        if (image && image.match(/http(s)*:\/\/[\s\S]+\.(jpg|png|jpeg|gif)/)) this.setImage(image)
      } else if (additionalToolType === 'table') {
        const {$refs: {tableColumnNumber, tableRowNumber}} = this
        const row = parseInt(Number(tableRowNumber.value), 10)
        const column = parseInt(Number(tableColumnNumber.value), 10)
        this.setTable(row, column)
      }
      // hide
      this.additionalToolType = -1
    },
    setCode () {
      const {inputSelection: {start, prev, selected, next}} = this
      this.inputValue = prev + '` ' + (selected || 'code') + ' `' + next
      this.focusSelection(start + 2, start + (selected.length || 4) + 2)
    },
    setMore () {
      const {inputSelection: {prev, selected, next}} = this
      // this.inputValue = prev + '` ' + (selected || 'code') + ' `' + next
      // this.focusSelection(start + 2, start + (selected.length || 4) + 2)
      if (prev) {
        const isPrevWrap = prev.endsWith('\n')
        this.inputValue = prev + (isPrevWrap ? '' : '\n') + '<!-- more -->\n' + selected + next
      }
    },
    setCodeBlock () {
      const {inputSelection: {start, prev, selected, next}} = this
      const isPrevWrap = prev.endsWith('\n')
      this.inputValue = prev + (isPrevWrap ? '' : '\n') + '``` javascript\n' + (selected || 'code') + '\n```\n' + next
      this.focusSelection(start + 15 + Number(!isPrevWrap), start + (selected.length || 4) + 15 + Number(!isPrevWrap))
    },
    setFullscreen () {
      if (this.isFullscreen) {
        this.isFullscreen = false
        this.editHeight = notFullHeight
      } else {
        this.isFullscreen = true
        this.editHeight = document.documentElement.clientHeight - this.$refs.tool.offsetHeight
      }
    },
    setTable (row, column) {
      row = row || 3
      column = column || 3
      const {inputSelection: {prev, selected, next}} = this
      const isPrevWrap = prev.endsWith('\n')
      this.inputValue = prev + (isPrevWrap ? '' : '\n') + `|${' column |'.repeat(row)}\n|${' :- |'.repeat(row)}\n` + `|${' x |'.repeat(row)}\n`.repeat(column) + selected + next
    },
    save () {
      const {inputValue} = this
      const articleStructure = preProcess(markdown, inputValue)
      this.$emit('save', articleStructure)
    }
  },
  watch: {
    inputValue () {
      this.updateSelection()
    }
  },
  mounted () {
    this.editHeight = notFullHeight = document.documentElement.clientHeight - this.$refs.edit.offsetTop - 20
  }
}
</script>

<style lang="scss" scoped>
  .v-editor {
    box-shadow: 0 -1px 4px 1px #ddd;
    border-radius: 3px;
    background-color: #fff;
    &.fullscreen {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
    .tools {
      position: relative;
      padding: 10px 20px;
      box-shadow: 0 1px 8px #ddd;
    }
    .additional-tool {
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translate(-50%, 1px);
      padding: 10px 20px;
      background-color: #fff;
      box-shadow: 0 1px 8px #ddd;
      .additional-image {
        > div { padding: 10px 0;}
        .image-net { outline: 0; border: 0; border-bottom: 1px solid #bbb; height: 30px;}
        .upload-image + input { display: none;}
      }
      .additional-table {
        padding: 10px 20px;
        input { outline: 0; border: 0; border-bottom: 1px solid #bbb; width: 60px; height: 30px; padding: 0 4px;}
      }
      .controls { padding: 14px 0 8px;}
      .btn { padding: 5px 18px; background-color: #666; color: #fff; border-radius: 3px; cursor: pointer; border: 1px solid #666;}
      .btn.cancel { background-color: #fff; color: #666; border-color: #999; margin-right: 10px;}
    }
    .edit-container {
      font-size: 0;

      .v-area-item {
        display: inline-block;
        height: 100%;
        width: 50%;
        padding: 10px;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        white-space: normal;
        word-break: break-all;
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
