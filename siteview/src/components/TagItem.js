import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AsyncTips from './common/AsyncTips';
import ArticleSchemaItem from './ArticleSchemaItem';
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
          articles.map(article => <ArticleSchemaItem key={article.id} article={article} />)
        }
        </ul>
      </div>
    </AsyncTips>
  }
}

export default TagItem;