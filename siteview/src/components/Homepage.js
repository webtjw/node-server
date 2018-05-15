import React, {Component} from 'react';
import AsyncTips from './common/AsyncTips';

class Homepage extends Component {
  render () {
    return <div className="index">
      <AsyncTips action={() => 123} callback={data => console.log(data)}></AsyncTips>
    </div>
  }
}

export default Homepage;