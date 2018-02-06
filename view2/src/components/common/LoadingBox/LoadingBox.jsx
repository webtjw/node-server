import React, {Component} from 'react';
import PropTypes from 'prop-types';

class LoadingBox extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showType: 1 // 0-none / 1-loading / 2-no data / 3-fail
    }
  }
  
  render () {
    const {children} = this.props;

    return <div className="loading-box">
      {children}
    </div>
  }
}

LoadingBox.propTypes = {
  className: PropTypes.string
}

export default LoadingBox;