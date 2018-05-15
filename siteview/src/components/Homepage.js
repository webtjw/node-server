import React, {Component} from 'react';
import {connect} from 'react-redux';
import AsyncTips from './common/AsyncTips';
import {getHomeArticle} from '../request'

class Homepage extends Component {

  loadData (data) {
    if (Array.isArray(data) && data.length) {
      console.log(data);
    }
  }

  render () {
    return <div className="index">
      <AsyncTips action={getHomeArticle} callback={this.loadData}></AsyncTips>
    </div>
  }
}

export default connect()(Homepage);