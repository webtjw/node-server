import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AsyncTips from './common/AsyncTips';
import {getArchive} from '../request';
import '../assets/style/archive.css';
import svgTag from '../assets/images/svg/svg-tag.svg';

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
            monthItem.data.map(article => <li key={article.id} onClick={() => this.props.history.push(`/article/detail/${article.id}`)} className="article-item font-16 pointer" data-flex="dir:left cross:center">
              <div data-flex-box="0" className="article-title">{article.title}</div>
              {
                article.tags && article.tags.length ? <div className="tag-list font-13" data-flex-box="1" data-flex="dir:left cross:center">
                  <img src={svgTag} alt="tag" className="svg-14" />
                  {article.tags.map(tag => <div key={tag} onClick={e => this.goToTag(e, tag)} data-flex-box="0" className="tag-item m-l-8">{tag}</div>)}
                </div> : null
              }
              <span className="time font-13" flex-box="0">{article.time}</span>
            </li>)
          }
          </ul>
        </div>)
      }
      </div>
    </AsyncTips>
  }
}