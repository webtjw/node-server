import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AsyncTips from './common/AsyncTips';
import {getArticleDetail} from '../request';
import {compileMarkdown} from '../utils/article';
import svgTag from '../assets/images/svg/svg-tag.svg';
import '../assets/style/ArticleDetail.css';

class ArticleDetail extends Component {
  constructor () {
    super();

    this.state = {
      article: {},
      isDeveloper: false
    }
  }

  loadData (data) {
    this.setState({article: data});
  }

  render () {
    const {article, isDeveloper} = this.state;
    const {id} = this.props.match.params;

    return <AsyncTips action={async () => getArticleDetail(id)} callback={data => this.loadData(data)}>
      <article className="article-detail">
        <h1 className="font-24">{article.title} {isDeveloper ? <Link to={`/article/edit/${id}`}>edit</Link> : null}</h1>
        <div className="article-attrs font-13" data-flex="cross:center">
          <div className="time">{article.time}</div>
          {
            article.tags && article.tags.length ? <div data-flex="dir:left main:center cross:center">
              <img src={svgTag} alt="tag" className="svg-14 icon-tag" />
              {
                article.tags.map(tag => <Link key={tag} to={`/tag/${tag}`} className="tag-item">{tag}</Link>)
              }
            </div> : null
          }
        </div>
        <div dangerouslySetInnerHTML={compileMarkdown(article.codeText || '')} className="article-compile"></div>
        <div className="a-c font-20">（完）</div>
      </article>
    </AsyncTips>
  }
}

export default ArticleDetail;