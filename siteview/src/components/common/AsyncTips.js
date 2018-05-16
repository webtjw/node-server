import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './AsyncTips.css';

class AsyncTips extends Component {
  constructor () {
    super();
    this.state = {
      status: 'loading'
    }
  }
  
  calculateHeight () {
    const {rootElement} = this.refs;
    const top = rootElement.offsetTop
    const clientHeight = document.documentElement.clientHeight
    rootElement.style.minHeight = parseInt((clientHeight - top) * 0.7, 10) + 'px'
    rootElement.style.opacity = 1
  }
  async doAsyncAction () {
    this.state.status !== 'loading' && this.setState({status: 'loading'});
    const {action, callback} = this.props;
    if (!action || !callback) throw new ReferenceError('property action or callback is not defined in component AsyncTips');
    else {
      const result = await action();
      if (!result) this.setState({status: 'error'});
      else if (!result.data) this.setState({status: 'network'});
      else {
        const {data} = result;
        if (!data.success || !data.data || (Array.isArray(data.data) && data.data.length === 0)) this.setState({status: 'empty'});
        else {
          this.setState({status: ''});
          callback(data.data);
        }
      }
    }
  }

  componentDidMount () {
    this.calculateHeight();
    this.doAsyncAction();
  }
  render () {
    const {customStyle} = this.props;
    const {status} = this.state;

    return <div className={`async-loader relative ${status} ${customStyle || ''}`} ref="rootElement">
      {
        status === 'loading' ? <div className="loading-animation absolute font-0 a-c">
          <i className="iblock" style={{animationDelay: '.3s'}}></i>
          <i className="iblock" style={{animationDelay: '.2s'}}></i>
          <i className="iblock" style={{animationDelay: '.1s'}}></i>
          <i className="iblock" style={{animationDelay: '0s'}}></i>
        </div> : null
      }
      {status === '' ? this.props.children : null}
    </div>
  }
}

AsyncTips.propTypes = {
  customStyle: PropTypes.string,
  action: PropTypes.func,
  callback: PropTypes.func
}

export default AsyncTips;