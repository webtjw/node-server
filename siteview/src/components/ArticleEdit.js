import React, {Component} from 'react'
import {connect} from 'react-redux'
import utils from '../utils/utils'
import {uploadFile, getEditArticleData, saveArticle} from '../request'
import RobinEditor from './common/editor/RobinEditor'
import '../assets/style/articleEdit.css'

class ArticleEdit extends Component {
  state = {
    remoteTags: [],
    tags: [],
    showRemoteTags: false,
    newTag: '',
    codeText: '',
    time: ''
  }

  removeTag (index) {
    const {state: {tags}} = this
    tags.splice(index, 1)
    this.setState({tags})
  }
  selectTag (tag) {
    const {state: {tags}} = this
    
    if (tags.length >= 3) utils.addSideTip({text: '为保证文章的倾向准确度，文章标签不能大于3个', type: 'warning'})
    else {
      this.hideRemote()
      tags.push(tag)
      this.setState({tags})
    }
  }
  showRemote () {
    this.setState({showRemoteTags: true})
  }
  hideRemote () {
    setTimeout(() => this.setState({showRemoteTags: false}), 200)
  }
  addNewTag (e) {
    const {state: {newTag, remoteTags, tags}} = this
    
    if (newTag && e.keyCode === 13) {
      if (tags.length >= 3) utils.addSideTip({text: '为保证文章的倾向准确度，文章标签不能大于3个', type: 'warning'})
      else {
        const confirmAdd = window.confirm(`确定要新增标签 ${newTag} 吗`)
        if (confirmAdd) {
          tags.push(newTag)
          remoteTags.push({name: newTag})
          this.setState({
            tags,
            remoteTags,
            newTag: ''
          })
        }
      }
    }
  }
  async uploadImage (img, callback) {
    const result = await uploadFile(img)
    callback && callback(result.success ? result.data : false)
  }
  async fillEditArticle () {
    const {id} = this.props.match.params

    if (id) {
      const result = await getEditArticleData(id)
      if (result && result.success && result.data) this.setState({
        codeText: result.data.article.codeText,
        tags: result.data.article.tags,
        remoteTags: result.data.tags,
        time: result.data.article.time || ''
      })
    }

  }
  async saveArticle (article) {
    const {id} = this.props.match.params
    const {tags, time} = this.state

    if (id) article.id = id
    if (tags.length > 0 && article.title && article.codeText) {
      article.tags = tags
      if (time) article.time = time
      const {success, data} = await saveArticle(article)
      if (success && data && data.id) {
        utils.addSideTip({text: '保存成功', type: 'success'})
        this.props.history.push(`/article/detail/${data.id}`)
      }
    }
  }

  componentWillMount () {
    if (!this.props.user) {
      alert('sorry，请先登入！')
      if (this.props.history.action === 'PUSH') this.props.history.goBack()
      else this.props.history.replace('/login')
    }
  }
  componentDidMount () {
    this.fillEditArticle()
  }
  render () {
    const {state: {remoteTags, tags, showRemoteTags, newTag, codeText}, props: {user}} = this

    return <div className="main-article-edit" style={{display: user ? '' : 'none'}}>
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
              return tags.indexOf(tag.name) === -1 ? <li key={tag.name} className="pointer" onClick={() => this.selectTag(tag.name)}>{tag.name}</li> : null
            })
          }
          </ul>
        </div>
      </div>
      <RobinEditor
        onUpload={(file, cb) => this.uploadImage(file, cb)}
        value={codeText}
        updateValue={(val, cb)=> this.setState({codeText: val}, () => cb && cb())}
        onSave={(d) => this.saveArticle(d)} />
    </div>
  }
}

export default connect(state => {
  return {user: state.user}
})(ArticleEdit)