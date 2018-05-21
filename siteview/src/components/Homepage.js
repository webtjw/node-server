import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AsyncTips from './common/AsyncTips';
import {getHomeArticle} from '../request';
import {compileMarkdown} from '../utils/article';
import '../assets/style/Homepage.css';
import svgTag from '../assets/images/svg/svg-tag.svg';

class Homepage extends Component {

  constructor () {
    super();
    this.state = {
      articles: []
    }
  }

  loadData (data) {
    if (Array.isArray(data) && data.length) this.setState({articles: data});
  }
  buildArticleJSX (articles) {
    return articles.length ? articles.map(item => <article key={item.id} className="index-article-item">
      <h1><Link className="font-24 c-333" to={`/article/detail/${item.id}`}>{item.title}</Link></h1>
      <div className="time font-14" data-flex="cross:center">{item.time}</div>
      <div dangerouslySetInnerHTML={compileMarkdown(item.description || item.codeText)} className="article-compile"></div>
      {
        item.tags && item.tags.length ? <div className="attribute font-14" data-flex="dir:left cross:center">
          <img className="svg-14" src={svgTag} alt="tag"/>
          {
            item.tags.map(tag => <Link key={tag} to={`/tag/${tag}`} className="tag-item">{tag}</Link>)
          }
        </div> : null
      }
      <div className="more font-14 a-c">
        <Link to={`/article/detail/${item.id}`} className="iblock p-v-8 p-h-20">阅读全文</Link>
      </div>
    </article>) : null;
  }

  render () {
    const {articles} = this.state;

    return <AsyncTips action={getHomeArticle} callback={data => this.loadData(data)}>
      {this.buildArticleJSX(articles)}
    </AsyncTips>
  }
}

export default Homepage;