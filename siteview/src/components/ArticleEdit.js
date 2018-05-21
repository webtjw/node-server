import React, {Component} from 'react';
import utils from '../utils/utils';
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
    showRemoteTags: false,
    newTag: ''
  }

  removeTag (index) {
    const {state: {tags}} = this;
    tags.splice(index, 1);
    this.setState({tags});
  }
  selectTag (tag) {
    const {state: {tags}} = this;
    
    if (tags.length >= 3) utils.addSideTip({text: '为保证文章的倾向准确度，文章标签不能大于3个', type: 'warning'});
    else {
      this.hideRemote();
      tags.push(tag);
      this.setState({tags});
    }
  }
  showRemote () {
    this.setState({showRemoteTags: true});
  }
  hideRemote () {
    setTimeout(() => this.setState({showRemoteTags: false}), 200);
  }
  addNewTag (e) {
    const {state: {newTag, remoteTags, tags}} = this;
    console.log(newTag, e.keyCode)
    if (newTag && e.keyCode === 13) {
      const confirmAdd = window.confirm(`确定要新增标签${newTag}吗`);
      if (confirmAdd) {
        tags.push(newTag);
        remoteTags.push({name: newTag});
        this.setState({
          tags,
          remoteTags,
          newTag: ''
        });
      }
    }
  }

  render () {
    const {state: {remoteTags, tags, showRemoteTags, newTag}} = this;

    return <div className="main-article-edit">
      <div className="tag-box" data-flex="dir:left cross:center">
        <div>选择标签：</div>
        {
          tags.map((tag, index) => <span className="tag-item pointer" key={tag} onClick={() => this.removeTag(index)}>{tag}</span>)
        }
        <div className="tag-add relative">
          <input type="text" onFocus={() => this.showRemote()} onBlur={() => this.hideRemote()} onKeyDown={e => this.addNewTag(e)} value={newTag} onChange={e => this.setState({newTag: e.target.value})} />
          <ul className="select absolute" style={{display: showRemoteTags ? 'block' : 'none'}}>
          {
            remoteTags.map((tag, index) => {
              return tags.indexOf(tag.name) === -1 ? <li key={tag.name} className="pointer" onClick={() => this.selectTag(tag.name)}>{tag.name}</li> : null;
            })
          }
          </ul>
        </div>
      </div>
    </div>;
  }
}

export default ArticleEdit;