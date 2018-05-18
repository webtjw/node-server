import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils/utils';
import '../../assets/style/sideTip.css';

// settings
const maxTipSize = 3;
const delay = 3000;

class SideTip extends Component {
  constructor () {
    super();
    this.state = {
      tips: []
    }
  }

  addTip (tip) {
    const {tips} = this.state;
    tip.id = new Date().getTime();
    tips.unshift(tip);
    this.setState({tips});
  }
  removeTip (tip) {
    const {tips} = this.state;
    this.setState({tips: tips.filter(item => tip !== item)});
  }

  componentDidMount () {
    if (!utils.sigleSideTip) utils.sigleSideTip = this;
    else console.error('the instance of SideTip component has been set already.');
  }
  componentWillMount () {
    utils.sigleSideTip = null;
  }
  render () {
    const {tips} = this.state;
    
    return <div className="side-tip fixed" data-flex="dir:top cross:center">
      {tips.map(tip => <SideTipItem text={tip.text} type={tip.type} key={tip.id} onRemove={() => this.removeTip(tip)} />)}
    </div>
  }
}

class SideTipItem extends Component {
  constructor () {
    super();
    this.timer = null;
  }
  static propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  remove () {
    const {onRemove} = this.props;

    this.timer && clearTimeout(this.timer);
    onRemove && onRemove();
  }

  componentDidMount () {
    this.timer = setTimeout(() => this.remove(), delay);
  }
  render () {
    const {text} = this.props;

    return <div className="side-tip-item" data-flex="dir:left cross:center">
      {text}
    </div>;
  }
}

export default SideTip;