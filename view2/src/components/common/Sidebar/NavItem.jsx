import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SvgSprite from '../../ui/svg/SvgSprite';

import '../../../assets/images/svg/index.svg';
import '../../../assets/images/svg/category.svg';
import '../../../assets/images/svg/tag.svg';
import '../../../assets/images/svg/about.svg';
import '../../../assets/images/svg/archive.svg';

class NavItem extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    const {name, icon} = this.props;

    return <div className="nav-item p-v-8 m-v-10" data-flex="dir:left main:center cross:center">
      <SvgSprite name={icon} className="svg-14"></SvgSprite>
      <div style={{lineHeight: 1}} className="" data-flex-box="0">{name}</div>
    </div>
  }
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default NavItem;
