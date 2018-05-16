import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AsyncTips from './common/AsyncTips';
import {getArticleByTag} from '../request';
import '../assets/style/tag.css';
import svgTag from '../assets/images/svg/svg-tag.svg';

class TagItem extends Component {
  constructor () {
    super();

    this.state = {
      articles: [],
      tag: ''
    }
  }

  loadData (data) { 
    this.setState({articles: data});
  }
  goToDetail (id) {
    this.props.history.push(`/article/detail/${id}`);
  }
  articleTagClick (e, tag) {
    e.stopPropagation();
    this.props.history.push(`/tag/${tag}`);
  }

  componentWillMount () {
    this.setState({tag: this.props.match.params.tag});
  }
  componentDidUpdate () {
    const {tag} = this.props.match.params;
    const prevTag = this.state.tag;
    if (tag !== prevTag) {
      this.refs.asyncTips.doAsyncAction();
      this.setState({tag});
    }
  }
  render () {
    const {articles} = this.state;
    const {tag} = this.props.match.params;

    return <AsyncTips ref="asyncTips" action={async () => getArticleByTag(tag)} callback={data => this.loadData(data)}>
      <div className="tag-item">
        <div className="title" data-flex="dir:left cross:center">
          <img className="svg-16" src={svgTag} alt="tag"/>
          <h1 className="font-18">"{tag}"</h1>
        </div>
        <ul className="article-list">
        {
          articles.map(article => <li key={article.id} onClick={() => this.goToDetail(article.id)} className="article-item font-16 pointer" data-flex="dir:left cross:center">
            <div data-flex-box="0" className="article-title">{article.title}</div>
            {
              article.tags && article.tags.length ? <div className="tag-list font-13" data-flex-box="1" data-flex="dir:left cross:center">
                <img className="svg-14" src={svgTag} alt="tag"/>
                {
                  article.tags.map(tag => <div key={tag} onClick={e => this.articleTagClick(e, tag)} data-flex-box="0" className="tag-another c-999">{tag}</div>)
                }
              </div> : null
            }
            <span className="time font-13" flex-box="0">{article.time}</span>
          </li>)
        }
        </ul>
      </div>
    </AsyncTips>
  }
}

export default TagItem;