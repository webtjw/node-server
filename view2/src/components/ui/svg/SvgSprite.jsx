import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CatSvg extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }
  
  render () {
    const {name, className} = this.props;
    
    return <svg className={`svg-fill-color ${className}`}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  }
}

CatSvg.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}

export default CatSvg;