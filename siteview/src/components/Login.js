import React, {Component} from 'react';
import RobinInput from './common/RobinInput';
import '../assets/style/login.css';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      token: ''
    }
  }

  checkSubmit () {
    const {token} = this.state;
    console.log(token);
    if (token) {
      
    }
  }

  render () {
    const {token} = this.state;

    return <div className="main-login a-c">
      <h3 className="font-18">开发者入口</h3>
      <RobinInput valueHandle={val => this.setState({token: val})} value={token} type="password" label="开发者口令" placeholder="请输入你的开发者口令" onEnter={() => this.checkSubmit()} />
    </div>;
  }
}

export default Login;