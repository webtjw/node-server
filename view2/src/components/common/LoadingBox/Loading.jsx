import React, {Component} from 'react';
import SvgSprite from '../../ui/svg/SvgSprite';
import '../../../assets/images/svg/loading-a.svg';
import './Loading.scss';

class Loading extends Component {
  static defaultProps = {
    size: 'default',
    text: 'loading...'
  }

  render () {
    const {size, text} = this.props;

    return <div className="loading-container iblock font-0 a-c">
      <SvgSprite name="loading-a" className="svg-40"></SvgSprite>
      <div className="text font-12 p-t-18">{text}</div>
    </div>
  }
}

export default Loading;