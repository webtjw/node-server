import React, {Component} from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils/utils';
import '../../assets/style/sideTip.css';

// settings
const maxTipSize = 3,
  delay = 3000,
  dismissDuration = .4;

class SideTip extends Component {
  constructor () {
    super();
    this.state = {
      tips: []
    }
  }

  addTip (tip) {
    const {tips} = this.state;
    if (tips.length >= maxTipSize) {
      this.refs[`tip${tips[maxTipSize - 1].id}`].remove();
    }
    tip.id = new Date().getTime();
    tips.unshift(tip);
    this.setState({tips});
  }
  removeTip (tip) {
    const {tips} = this.state;
    setTimeout(() => {
      this.setState({tips: tips.filter(item => tip !== item)});
    }, dismissDuration * 1000);
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
      {tips.map(tip => <SideTipItem text={tip.text} type={tip.type} key={tip.id} ref={`tip${tip.id}`} onRemove={() => this.removeTip(tip)} />)}
    </div>
  }
}

class SideTipItem extends Component {
  constructor () {
    super();
    this.timer = null;
    this.state = {
      triggerDismiss: false
    }
  }
  static propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  remove () {
    const {onRemove} = this.props;

    this.setState({triggerDismiss: true});
    this.cancelTimer();
    onRemove && onRemove();
  }
  cancelTimer () {
    this.timer && clearTimeout(this.timer);
  }

  componentDidMount () {
    this.timer = setTimeout(() => this.remove(), delay);
  }
  componentWillUnmount () {
    this.cancelTimer();
  }
  render () {
    const {props: {text}, state: { triggerDismiss}} = this;

    return <div className={`side-tip-item ${triggerDismiss ? 'dismiss' : ''}`} style={{animationDuration: `${dismissDuration}s`}} data-flex="dir:left cross:center">
      {text}
    </div>;
  }
}

export default SideTip;