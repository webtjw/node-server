import React, {Component} from 'react';
import './assets/editor.css';
import svgTitle from './assets/images/title.svg';
import svgBold from './assets/images/bold.svg';
import svgCenter from './assets/images/center.svg';
import svgQuote from './assets/images/quote.svg';
import svgMore from './assets/images/more.svg';
import svgList from './assets/images/list.svg';
import svgLink from './assets/images/link.svg';
import svgImage from './assets/images/image.svg';
import svgCode from './assets/images/code.svg';
import svgCodes from './assets/images/codes.svg';
import svgTable from './assets/images/table.svg';
import svgFullscreen from './assets/images/fullscreen.svg';
import svgRedo from './assets/images/redo.svg';
import svgUndo from './assets/images/undo.svg';
import svgSave from './assets/images/save.svg';


class RobinEditor extends Component {
  state = {
    editTools: [
      {icon: svgTitle, title: '设置为标题', method: this.setTitle},
      {icon: svgBold, title: '粗体', method: this.setBold},
      {icon: svgCenter, title: '居中', method: this.setAlign},
      {icon: svgQuote, title: '引用', method: this.setQuote},
      {icon: svgMore, title: '插入预览符', method: this.setMore},
      {icon: svgList, title: '列表', method: this.setList},
      {icon: svgLink, title: '插入链接', method: this.setLink},
      {icon: svgImage, title: '插入图片', method: () => { this.additionalToolType = 'image' }},
      {icon: svgCode, title: '插入代码段', method: this.setCode},
      {icon: svgCodes, title: '插入代码块', method: this.setCodeBlock},
      {icon: svgTable, title: '插入表格', method: () => { this.additionalToolType = 'table' }}
    ],
    functionalTools: [
      {icon: svgUndo, title: '撤销改动', method: null},
      {icon: svgRedo, title: '恢复改动', method: null},
      {icon: svgFullscreen, title: '全屏编辑', method: this.setFullscreen},
      {icon: svgSave, title: '保存', method: this.save}
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

  setHeight (type) {
    const docHeight = document.documentElement.clientHeight;
    const toolbar = document.querySelector('.robin-editor > .toolbar');
    const toolbarHeight = parseInt(getComputedStyle(toolbar).height, 10);

    this.setState({editHeight: type === 'fullscreen' ? docHeight - toolbarHeight - 20 : docHeight - toolbarHeight - toolbar.offsetTop - 20})
  }

  componentDidMount () {
    this.setHeight();
  }
  render () {
    const {state: {editTools, functionalTools, editHeight}} = this;

    return <div className="robin-editor">
      {/* toolbar on the top */}
      <div className="toolbar relative" data-flex="dir:left">
        <div data-flex-box="1">
        {
          editTools.map(tool => <img className="tools-item pointer" key={tool.title} src={tool.icon} alt={tool.title} title={tool.title}/>)
        }
        </div>
        <div data-flex-box="0">
        {
          functionalTools.map(tool => <img className="tools-item pointer" key={tool.title} src={tool.icon} alt={tool.title} title={tool.title}/>)
        }
        </div>
      </div>
      {/* edit area & preview area */}
      <div className="edit-and-preview font-0" style={{height: `${editHeight}px`}}>
        <textarea className="half font-15"></textarea>
        <div className="article-compile half font-15"></div>
      </div>
    </div>;
  }
}

export default RobinEditor;