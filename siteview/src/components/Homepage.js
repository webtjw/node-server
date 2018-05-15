import React, {Component} from 'react';
import {connect} from 'react-redux';
import AsyncTips from './common/AsyncTips';
import {getHomeArticle} from '../request'

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
    return articles.length ? articles.map(item => <div key={item.title}>123</div>) : null;
  }

  render () {
    const {articles} = this.state;

    return <div className="index">
      <AsyncTips action={getHomeArticle} callback={data => this.loadData(data)}>
        {this.buildArticleJSX(articles)}
      </AsyncTips>
    </div>
  }
}

export default connect()(Homepage);