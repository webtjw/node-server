import React, {Component} from 'react';
import LoadingBox from '../common/LoadingBox/LoadingBox';
import IndexItem from './IndexItem';
import './Index.scss';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[]
    }
  }
  
  async fetchData () {
    // Add redux or mobx
  }
  componentDidMount () {
    this.fetchData();
  }
  makeIndexListJsx (list) {
    if (Array.isArray(list) && list.length > 0) {
      return list.map(item => <IndexItem title={item.title} list={list.data} />)
    } else return null;
  }
  render () {
    // TODO: analyze that would vdom rerender even if there's no state in JSX.
    // In this case, you should remove all states and only fill with method 'loadData'.
    const {state, makeIndexListJsx} = this;
    const {data} = state;

    return <div className="index-container">
      <LoadingBox className="a-c">
        {makeIndexListJsx(data)}
      </LoadingBox>
    </div>
  }
}

export default Index;