import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compileMarkdown} from '../../../utils/article'
import './assets/editor.css'
import svgTitle from './assets/images/title.svg'
import svgBold from './assets/images/bold.svg'
import svgCenter from './assets/images/center.svg'
import svgQuote from './assets/images/quote.svg'
import svgMore from './assets/images/more.svg'
import svgList from './assets/images/list.svg'
import svgLink from './assets/images/link.svg'
import svgImage from './assets/images/image.svg'
import svgCode from './assets/images/code.svg'
import svgCodes from './assets/images/codes.svg'
import svgTable from './assets/images/table.svg'
import svgFullscreen from './assets/images/fullscreen.svg'
import svgRedo from './assets/images/redo.svg'
import svgUndo from './assets/images/undo.svg'
import svgSave from './assets/images/save.svg'
import utils from '../../../utils/utils'

// settings
let notFullEditHeight = 0
let fullEditHeight = 0
const compileDelay = 400

class RobinEditor extends Component {
  static propTypes = {
    onUpload: PropTypes.func,
    value: PropTypes.string.isRequired,
    updateValue: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired

  }
  constructor () {
    super()

    this.state = {
      editTools: [
        {icon: svgTitle, title: '设置为标题', method: () => this.setTitle()},
        {icon: svgBold, title: '粗体', method: () => this.setBold()},
        {icon: svgCenter, title: '居中', method: () => this.setAlign()},
        {icon: svgQuote, title: '引用', method: () => this.setQuote()},
        {icon: svgMore, title: '插入预览符', method: () => this.setMore()},
        {icon: svgList, title: '列表', method: () => this.setList()},
        {icon: svgLink, title: '插入链接', method: () => this.setLink()},
        {icon: svgImage, title: '插入图片', method: () => this.setState({additionalToolType: 'image'})},
        {icon: svgCode, title: '插入代码段', method: () => this.setCode()},
        {icon: svgCodes, title: '插入代码块', method: () => this.setCodeBlock()},
        {icon: svgTable, title: '插入表格', method: () => this.setState({additionalToolType: 'table'})}
      ],
      functionalTools: [
        {icon: svgUndo, title: '撤销改动', method: null},
        {icon: svgRedo, title: '恢复改动', method: null},
        {icon: svgFullscreen, title: '全屏编辑', method: () => this.setHeight()},
        {icon: svgSave, title: '保存', method: () => this.checkSave()}
      ],
      editHeight: 0,
      isFullscreen: false,
      mouseScrollType: -1,
      additionalToolType: -1,
      compileText: ''
    }

    this.selectState = {
      start: 0,
      end: 0,
      prev: '',
      selected: '',
      next: ''
    }
    this.launchInit = true
    this.compileTimer = null
    this.scrollType = -1
    // refs
    this.refUploadInput = React.createRef()
    this.refTextarea = React.createRef()
    this.refPreview = React.createRef()
    this.refImageOnline = React.createRef()
    this.refTableRow = React.createRef()
    this.refTableColumn = React.createRef()
  }

  setHeight () {
    const docHeight = document.documentElement.clientHeight
    const toolbar = document.querySelector('.robin-editor > .toolbar')
    const toolbarHeight = parseInt(getComputedStyle(toolbar).height, 10)
    notFullEditHeight = docHeight - toolbarHeight - toolbar.offsetTop - 20
    fullEditHeight = docHeight - toolbarHeight 

    this.setState({editHeight: notFullEditHeight})
    this.setHeight = () => {
      const {isFullscreen} = this.state
      this.setState({editHeight: isFullscreen ? notFullEditHeight : fullEditHeight, isFullscreen: !isFullscreen})
    }
  }
  setTitle () {
    const {value} = this.props
    const concatString = '#t 标题\n' + value
    this.updateInputValue(concatString, 3, 5)
  }
  setAlign () {
    const {selectState: {start, prev, selected, next}} = this
    const isPrevWrap = prev.endsWith('\n')
    this.updateInputValue((isPrevWrap ? prev : prev + '\n') + `**center\n${selected || '居中'}\n**\n` + next, start + 9 + Number(!isPrevWrap), start + (selected.length || 2) + 9 + Number(!isPrevWrap))
  }
  setBold () {
    const {selectState: {start, selected, prev, next}} = this
    this.updateInputValue(`${prev}**${selected || '粗体'}**${next}`, start + 2, start + 2 + (selected.length || 2))
  }
  setQuote () {
    const {selectState: {start, prev, selected, next}} = this
    const isPrevWrap = prev.endsWith('\n')
    this.updateInputValue((isPrevWrap ? prev : (prev + '\n')) + `> ${selected || '块级引用'}\n` + next, start + 2 + Number(!isPrevWrap), start + (selected.length || 4) + 2 + Number(!isPrevWrap))
  }
  setMore () {
    const {selectState: {prev, selected, next, start}} = this
    if (prev) {
      const isPrevWrap = prev.endsWith('\n')
      const postion = start + Number(isPrevWrap) + 14
      this.updateInputValue(prev + (isPrevWrap ? '' : '\n') + '<!-- more -->\n' + selected + next, postion, postion)
    }
  }
  setList () {
    const {selectState: {start, prev, selected, next}} = this
    const isPrevWrap = prev.endsWith('\n')
    this.updateInputValue((isPrevWrap ? prev : (prev + '\n')) + `* ${selected || '列表项1'}\n* 列表项2\n` + next, start + 2 + Number(!isPrevWrap), start + (selected.length || 4) + 2 + Number(!isPrevWrap))
  }
  setLink () {
    const {selectState: {start, prev, selected, next}} = this
    this.updateInputValue(prev + `[${selected || 'link'}](http:// "title")` + next, start + 1, start + (selected.length || 4) + 1)
  }
  updateInputValue (value, focusStart, focusEnd) {
    this.props.updateValue(value, () => {
      if (focusStart !== undefined && focusEnd !== undefined) {
        const textarea = this.refTextarea.current
        textarea.selectionStart = focusStart
        textarea.selectionEnd = focusEnd
        textarea.focus()
      }
      this.compileMarkdown(value, 1)
    })
  }
  compileMarkdown (md) {
    const {compileTimer} = this

    if (!compileTimer) {
      const compileResult = compileMarkdown(md)
      this.compileTimer = setTimeout(() => this.setState({compileText: compileResult.__html}), compileDelay)
    }
    else {
      clearTimeout(this.compileTimer)
      this.compileTimer = null
      this.compileMarkdown(md)
    }
  }
  updateSelection () {
    const {props: {value}} = this
    const textarea = this.refTextarea.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    this.selectState = {
      start,
      end,
      prev: value.slice(0, start),
      selected: value.slice(start, end),
      next: value.slice(end)
    }
  }
  onFileUpload (e) {
    const {props: {onUpload}} = this
    const file = e.target.files[0]
    const fileType = file.type.split('/')
    if (fileType[0] && fileType[0] === 'image') onUpload && onUpload(file, url => this.addImage(url))
    else utils.addSideTip({text: '上传文件非图片', type: 'error'})
    // hide
    this.setState({additionalToolType: -1})
  }
  addImage (path) {
    if (path) {
      const {selectState: {start, prev, selected, next}} = this
      const isPrevWrap = prev.endsWith('\n')
      this.updateInputValue((isPrevWrap ? prev : (prev + '\n')) + `![${selected || 'alt'}](${path} "title")\n` + next, start + 2 + Number(!isPrevWrap), start + (selected.length || 3) + 2 + Number(!isPrevWrap))
    }
  }
  confirmAdditionalTool() {
    const {state: {additionalToolType}} = this

    if (additionalToolType === 'image') {
      const image = this.refImageOnline.current.value
      if (image && image.match(/http(s)*:\/\/[\s\S]+\.(jpg|png|jpeg|gif)/)) this.addImage(image)
    } else if (additionalToolType === 'table') {
      const row = parseInt(Number(this.refTableRow.current.value), 10)
      const column = parseInt(Number(this.refTableColumn.current.value), 10)
      this.setTable(row, column)
    }
    // hide
    this.setState({additionalToolType: -1})
  }
  setTable (row, column) {
    row = row || 3
    column = column || 3
    const {selectState: {prev, selected, next}} = this
    const isPrevWrap = prev.endsWith('\n')
    this.updateInputValue(prev + (isPrevWrap ? '' : '\n') + `|${' column |'.repeat(row)}\n|${' :- |'.repeat(row)}\n` + `|${' x |'.repeat(row)}\n`.repeat(column) + selected + next)
  }
  synchronizeScroll (e, origin) {
    const {scrollType} = this
    if (scrollType === origin) return null
    const {target: {scrollTop, scrollHeight, clientHeight}} = e
    const synchronizeElement = scrollType ? this.refPreview.current : this.refTextarea.current
    const percentage = (scrollTop / (scrollHeight - clientHeight)).toFixed(2)
    const distance = +(((synchronizeElement.scrollHeight - synchronizeElement.clientHeight) * +percentage).toFixed(0))
    requestAnimationFrame(() => this.synchronizeScrollFrame(synchronizeElement, distance))
  }
  synchronizeScrollFrame (e, val) {
    e.scrollTop = val
  }
  checkSave () {
    const {value} = this.props
    const compile = compileMarkdown(value, 1)
    delete compile.__html
    this.props.onSave(compile)
  }

  componentDidMount () {
    this.setHeight(true)
  }
  componentWillReceiveProps (nextProps) {
    if (this.launchInit) {
      this.launchInit = false
      this.updateInputValue(nextProps.value)
    }
  }
  render () {
    const {
      state: {editTools, functionalTools, editHeight, isFullscreen, additionalToolType, compileText},
      props: {value},
      refUploadInput, refTextarea, refPreview, refImageOnline, refTableRow, refTableColumn
    } = this

    return <div className={`robin-editor${isFullscreen ? ' fullscreen' : ''}`}>
      {/* toolbar on the top */}
      <div className="toolbar relative">
        <div data-flex="dir:left">
          <div data-flex-box="1">
          {
            editTools.map(tool => <img className="tools-item pointer" key={tool.title} src={tool.icon} alt={tool.title} title={tool.title} onClick={tool.method}/>)
          }
          </div>
          <div data-flex-box="0">
          {
            functionalTools.map(tool => <img className="tools-item pointer" key={tool.title} src={tool.icon} alt={tool.title} title={tool.title} onClick={tool.method}/>)
          }
          </div>
        </div>
        {/* additional-tool */}
        <div className="additional-tool absolute" style={{display: additionalToolType !== -1 ? '' : 'none'}}>
          <div className="additional-image" style={{display: additionalToolType === 'image' ? '' : 'none'}}>
            <div data-flex="dir:left cross:center">
              <label data-flex-box="0">网络图片：</label>
              <input className="image-net" ref={refImageOnline} type="text" style={{width: '300px'}} />
            </div>
            <div data-flex="dir:left cross:center">
              <label data-flex-box="0">本地图片：</label>
              <div className="btn upload-image" onClick={() => this.refUploadInput.current.click()}>上传</div>
              <input type="file" ref={refUploadInput} onChange={e => this.onFileUpload(e)} />
            </div>
          </div>
          <div className="additional-table" style={{display: additionalToolType === 'table' ? '' : 'none'}}>
            <div data-flex="dir:left cross:center">
              <label data-flex-box="0">表格行数：</label><input type="text" ref={refTableRow} />
              <label data-flex-box="0" style={{marginLeft: '30px'}}>列数：</label><input type="text" ref={refTableColumn} />
            </div>
          </div>
          <div className="controls" data-flex="dir:left main:center cross:center">
            <div className="btn cancel" onClick={() => this.setState({additionalToolType: -1})}>取消</div>
            <div className="btn" onClick={() => this.confirmAdditionalTool()}>确认</div>
          </div>
        </div>
      </div>
      {/* edit area & preview area */}
      <div className="edit-and-preview font-0" style={{height: `${editHeight}px`}}>
        <textarea
          className="half font-15"
          ref={refTextarea}
          value={value}
          onChange={e => this.updateInputValue(e.target.value)}
          onSelect={() => this.updateSelection()}
          onKeyDown={() => this.updateSelection()}
          onScroll={e => this.synchronizeScroll(e, 0)}
          onMouseOver={() => this.scrollType = 1} />
        <div
          className="article-compile half font-15"
          dangerouslySetInnerHTML={{__html: compileText}}
          onScroll={e => this.synchronizeScroll(e, 1)}
          ref={refPreview}
          onMouseOver={() => this.scrollType = 0}
        ></div>
      </div>
    </div>
  }
}

export default RobinEditor