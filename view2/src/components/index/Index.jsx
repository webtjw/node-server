import React, {Component} from 'react';
import LoadingBox from '../common/LoadingBox/LoadingBox';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[]
    }
  }
  
  fetchData (data) {

  }
  componentDidMount () {
    // TODO: load the index data
  }
  render () {
    // TODO: analyze that would vdom rerender even if there's no state in JSX.
    // In this case, you should remove all states and only fill with method 'loadData'.
    const {state, fetchData} = this;
    const {data} = state;

    return <div className="index-container">
      <LoadingBox load={fetchData}></LoadingBox>
    </div>
  }
}

export default Index;