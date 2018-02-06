import React, {Component} from 'react';
import './Sidebar.scss';
import avatar from '../../../assets/images/avatar.png';
import NavItem from './NavItem';

class Topbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navList: [
        {name: '首页', path: '/', icon: 'index'},
        {name: '分类', path: '/category', icon: 'category'},
        {name: '标签', path: '/tags', icon: 'tag'},
        {name: '归档', path: '/archives', icon: 'archive'},
        {name: '关于', path: '/about', icon: 'about'}
      ]
    }
  }
  
  makeNavItem () {
    const { navList } = this.state;
    return navList.map(item => <NavItem key={item.name} name={item.name} icon={item.icon} path={item.path} />)
  }
  render () {
    return <div className="side-bar p-t-40">
      <div data-flex="dir:top cross:center">
        <img src={avatar} className="avatar" alt="avatar"/>

        <nav className="p-t-30" data-flex="dir:top cross:center">
          {this.makeNavItem()}
        </nav>
      </div>
    </div>
  }
}

export default Topbar;
