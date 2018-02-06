import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SvgSprite from '../../ui/svg/SvgSprite';
import './NavItem.scss';

import '../../../assets/images/svg/index.svg';
import '../../../assets/images/svg/category.svg';
import '../../../assets/images/svg/tag.svg';
import '../../../assets/images/svg/about.svg';
import '../../../assets/images/svg/archive.svg';

class NavItem extends Component {
  render () {
    const {name, icon, path} = this.props;

    return <div className="nav-item m-v-4">
      <Link to={path} className="p-v-8 p-h-8" data-flex="dir:left cross:center">
        <SvgSprite name={icon} className="svg-14"></SvgSprite>
        <div className="p-l-8 p-t-2">{name}</div>
      </Link>
    </div>
  }
}

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default NavItem;
