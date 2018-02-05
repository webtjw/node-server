import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SvgSprite from '../../ui/svg/SvgSprite';

import '../../../assets/images/svg/index.svg';
import '../../../assets/images/svg/category.svg';
import '../../../assets/images/svg/tag.svg';
import '../../../assets/images/svg/about.svg';

class NavItem extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    const {name, icon} = this.props;

    return <div className="nav-item p-v-8 m-v-10 p-h-20 a-c">
      <SvgSprite name={icon} className="svg-16"></SvgSprite>
      <div className="p-l-6">{name}</div>
    </div>
  }
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default NavItem;
