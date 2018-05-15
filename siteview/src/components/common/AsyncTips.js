import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AsyncTips extends Component {
  
  async doAsyncAction () {
    const {action, callback} = this.props;
    if (!action || !callback) throw new ReferenceError('property action or callback is not defined in component AsyncTips');
    else {
      const result = await action();
      console.log('AsyncTips', result);
      callback(result);
    }
  }

  componentDidMount () {
    this.doAsyncAction()
  }
  render () {
    const { customStyle } = this.props;

    return <div className={`async-loader ${customStyle}`}>

    </div>
  }
}

AsyncTips.propTypes = {
  customStyle: PropTypes.string,
  action: PropTypes.func,
  callback: PropTypes.func
}

export default AsyncTips;