import React, {Component} from 'react';
import RobinInput from './common/RobinInput';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      token: ''
    }
  }

  componentDidMount () {
    const {clientHeight} = document.documentElement;
  }
  render () {
    const {token} = this.state;

    return <div className="main-login">
      <h3>开发者入口</h3>
      <RobinInput valueHandle={val => this.setState({token: val})} value={token}></RobinInput>
    </div>;
  }
}

export default Login;