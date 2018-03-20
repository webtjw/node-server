<template>
  <div class="v-editor">
    <!-- tools -->
    <div class="tools">
      <!-- tools list -->
      <div flex="dir:left main:justify cross:center">
        <div class="edit-tools">
          <vue-svg v-for="tool in editTools" :key="tool.icon" :icon="tool.icon" :title="tool.title" @click.native="tool.method" class="svg-18 pointer m-h-4 p-4"></vue-svg>
        </div>
        <div class="functional-tools">
          <vue-svg v-for="tool in functionalTools" :key="tool.icon" :icon="tool.icon" class="svg-18 pointer m-h-4 p-2"></vue-svg>
        </div>
      </div>
      <!-- additional dialog -->
      <div class="additional-tool" v-show="additionalToolType !== -1">
        <div class="additional-image" v-show="additionalToolType === 'image'">
          <div flex="dir:left cross:center">
            <label flex-box="0">网络图片：</label>
            <input class="image-net" ref="imageFromNet" type="text" style="width: 300px;">
          </div>
          <div flex="dir:left cross:center">
            <label flex-box="0">本地图片：</label>
            <div class="btn upload-image">上传</div>
            <input type="file">
          </div>
        </div>
        <div class="controls" flex="dir:left main:center cross:center">
          <div class="btn cancel" @click="additionalToolType = -1">取消</div>
          <div class="btn" @click="confirmAdditionalTool">确认</div>
        </div>
      </div>
    </div>
    <!-- edit area -->
    <div class="edit-container" ref="edit" :style="{height: editHeight + 'px'}">
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

export default {
  data () {
    return {
      editTools: [
        {icon: 'svg-title', title: '设置为标题', method: this.setTitle},
        {icon: 'svg-bold', title: '粗体', method: this.setBold},
        {icon: 'svg-center', title: '居中', method: this.setAlign},
        {icon: 'svg-quote', title: '引用', method: this.setQuote},
        {icon: 'svg-list', title: '列表', method: this.setList},
        {icon: 'svg-link', title: '插入链接', method: this.setLink},
        {icon: 'svg-image', title: '插入图片', method: () => { this.additionalToolType = 'image' }},
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
      },
      additionalToolType: 'image'
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
      const {inputSelection: {start, prev, selected, next}} = this
      const isPrevWrap = prev.endsWith('\n')
      this.inputValue = (isPrevWrap ? prev : (prev + '\n')) + `![${selected || 'alt'}](${path} "title")\n` + next
      this.focusSelection(start + 2 + Number(!isPrevWrap), start + (selected.length || 3) + 2 + Number(!isPrevWrap))
    },
    confirmAdditionalTool () {
      const {inputSelection: {start, prev, selected, next}} = this
      if (this.additionalToolType === 'image') {
        const image = this.$refs.imageFromNet.value
        if (image) this.setImage(image)
      }
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
        background-color: #fff;
        overflow-y: auto;
        overflow-x: hidden;
        white-space: normal;
        word-break: break-all;
        font: 300 14px/1.6 consolas, "Miscrosoft Yahei";
        &.preview { border-left: 1px solid #ededed;}
        &::-webkit-scrollbar { width: 8px;}
        &::-webkit-scrollbar-track { display: none;}
        &::-webkit-scrollbar-button { display: none;}
        &::-webkit-scrollbar-thumb { background-color: #aaa;}
      }
      /deep/ code {
        font-family: consolas, "Miscrosoft Yahei";
      }
      /deep/ blockquote {
        display: inline-block;
        padding: 20px 40px;
        margin: 10px 0;
        background: no-repeat left top url(../../../assets/images/quote-left.png);
        background-size: 24px auto;
      }
      /deep/ ul, /deep/ ul li { list-style-type: disc; list-style-position: inside;}
      /deep/ ol, /deep/ ol li { list-style-type: decimal; list-style-position: inside;}
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
