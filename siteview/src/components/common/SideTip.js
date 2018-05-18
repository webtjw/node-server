import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../assets/style/sideTip.css';

class SideTip extends Component {
  render () {
    return <div className="side-tip fixed" data-flex="dir:top cross:center">
      <SideTipItem text="我是提示我是提示我是提示"></SideTipItem>
    </div>
  }
}

class SideTipItem extends Component {
  static propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired
  }

  render () {
    const {text} = this.props;

    return <div className="side-tip-item" data-flex="dir:left cross:center">
      {text}
    </div>;
  }
}

export default SideTip;