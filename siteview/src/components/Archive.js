import React, {Component} from 'react';
import AsyncTips from './common/AsyncTips';
import ArticleSchemaItem from './ArticleSchemaItem';
import {getArchive} from '../request';
import '../assets/style/archive.css';

export default class Archive extends Component {
  constructor () {
    super();

    this.state = {
      sorted: [] // 分类后的列表，按照月份划分
    }
  }

  loadData (data) {
    if (data) {
      const groupingData = [];
      const {recentMonth, lastMonth, recentYear, overAYear} = data;
      recentMonth && recentMonth.length && groupingData.push({title: '最近一个月', data: recentMonth});
      lastMonth && lastMonth.length && groupingData.push({title: '上个月', data: lastMonth});
      recentYear && recentYear.length && groupingData.push({title: '最近一年', data: recentYear});
      overAYear && overAYear.length && groupingData.push({title: '一年前', data: overAYear});
      this.setState({sorted: groupingData});
    }
  }
  goToTag (e, tag) {
    e.stopPropagation();
    this.props.history.push(`/tag/${tag}`);
  }

  render () {
    const {sorted} = this.state;

    return <AsyncTips action={getArchive} callback={data => this.loadData(data)}>
      <div className="main-archive">
      {
        sorted.map(monthItem => <div className="month-item" key={monthItem.title}>
          <h1 className="title font-20">"{monthItem.title}"</h1>
          <ul>
          {
            monthItem.data.map(article => <ArticleSchemaItem history={this.props.history} article={article} key={article.id} />)
          }
          </ul>
        </div>)
      }
      </div>
    </AsyncTips>
  }
}