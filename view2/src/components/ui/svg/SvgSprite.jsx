import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SvgSprite.scss';

class SvgSprite extends Component {
  render () {
    const {name, className} = this.props;
    
    return <svg className={`svg svg-fill-color ${className}`}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  }
}

SvgSprite.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default SvgSprite;