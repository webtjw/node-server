import React, {Component} from 'react';
import '../assets/style/articleEdit.css';

class ArticleEdit extends Component {
  state = {
    remoteTags: [
      {name: 'javascript'},
      {name: 'vs code'},
      {name: 'html'},
      {name: 'css'}
    ],
    tags: ['javascript', 'css'],
    showRemoteTags: false
  }

  removeTag () {}
  selectTag () {
    // const {searchTag, remoteTags, tags, isShowSelect} = this
    // if (tags.length === 3) alert('为保证文章的倾向准确度，文章标签不能大于3个')
    // else if (tag && index !== undefined) {
    //   if (isShowSelect) this.isShowSelect = false
    //   tags.push(tag.name)
    //   remoteTags.splice(index, 1)
    // } else {
    //   const value = searchTag.replace(/\s/g, '')
    //   if (value) {
    //     if (tags.some(item => item === value)) {
    //       const inRemoteItem = remoteTags.filter(item => item.name === value)
    //       if (inRemoteItem && inRemoteItem.length === 1) {
    //         tags.push(inRemoteItem[0])
    //         remoteTags.splice(remoteTags.indexOf(inRemoteItem[0]), 1)
    //       }
    //     } else if (confirm(`确定添加标签 ${value} ？`)) tags.push(value)
    //     this.searchTag = ''
    //   }
    // }
  }
  showRemote () {
    this.setState({showRemoteTags: true});
  }
  hideRemote () {
    setTimeout(() => this.setState({showRemoteTags: false}), 200);
  }

  render () {
    const {state: {remoteTags, tags, showRemoteTags}, removeTag} = this;

    return <div className="main-article-edit">
      <div className="tag-box" data-flex="dir:left cross:center">
        <div>选择标签：</div>
        {
          tags.map((tag, index) => <a href="javascript:void(0)" className="tag-item" key={tag} onClick={() => removeTag(tag, index)}>{tag}</a>)
        }
        <div className="tag-add relative">
          <input type="text" onFocus={() => this.showRemote()} onBlur={() => this.hideRemote()} onKeyDown={selectTag} v-model="searchTag" />
          <ul className="select absolute" style={{display: showRemoteTags ? 'block' : 'none'}}>
          {
            remoteTags.map((tag, index) => <li key={tag.name} className="pointer" onClick={() => this.selectTag(tag, index)}>{tag.name}</li>)
          }
          </ul>
        </div>
      </div>
    </div>;
  }
}

export default ArticleEdit;