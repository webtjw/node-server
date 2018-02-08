import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class LoadingBox extends Component {

  static defaultProps = {
    type: 'loading' // loading / empty / fail /  hide
  }
  
  reflectStatus (children, type) {
    if (children) return children;
    else if (type === 'empty') return <div>empty</div>
    else return <Loading></Loading>
  }
  render () {
    const {reflectStatus} = this;
    const {children, type, className} = this.props;

    return <div className={`loading-box ${className}`}>
      {reflectStatus(children, type)}
    </div>
  }
}

LoadingBox.propTypes = {
  className: PropTypes.string
}

export default LoadingBox;