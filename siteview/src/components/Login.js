import React, {Component} from 'react';
import RobinInput from './common/RobinInput';
import '../utils/utils';
import '../assets/style/login.css';
import utils from '../utils/utils';

class Login extends Component {
  constructor () {
    super();
    this.state = {
      token: ''
    }
  }

  async checkSubmit () {
    const {token} = this.state;
    if (typeof token === 'string' && token.trim()) {
      const result = await utils.login(token);
      if (result && result.success && result.data) utils.addSideTip({text: `欢迎登入，${result.data}`});
      else utils.addSideTip({text: '登入失败', type: 'error'});
    } else utils.addSideTip({text: '请输入口令', type: 'error'});
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