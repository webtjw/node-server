import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../assets/style/Topbar.css';
import Avatar from '../assets/images/avatar.jpg';

class Topbar extends Component {
  state = {
    navList: [
      {name: '首页', path: '/'},
      {name: '标签', path: '/tag'},
      {name: '归档', path: '/archive'},
      {name: '关于', path: '/about'},
    ]
  }
  
  render () {
    const {props: {developer}, state: {navList}} = this;

    return <div id="topbar">
      <div className="wrapper">
        <div data-flex="dir:left cross:center">
          <Link to={developer ? '/article/edit' : '/login'} data-flex-box="0"><img className="avatar pointer" src={Avatar} alt="Robin's avatar"/></Link>
          <nav className="a-r font-0" data-flex-box="1">
            {
              navList.map(item => <NavLink to={item.path} key={item.path} exact activeClassName="selected" className="nav-item relative c-666 iblock font-15">{item.name}</NavLink>)
            }
          </nav>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    developer: state.developer
  }
}
export default connect(mapStateToProps)(Topbar);