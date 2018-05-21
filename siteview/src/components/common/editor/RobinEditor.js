import React, {Component} from 'react';

class RobinEditor extends Component {
  state = {
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

  render () {
    return <div className="robin-editor">
    
    </div>;
  }
}