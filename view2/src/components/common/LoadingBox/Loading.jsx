import React, {Component} from 'react';
import SvgSprite from '../../ui/svg/SvgSprite';
import '../../../assets/images/svg/loading-a.svg';
import './Loading.scss';

class Loading extends Component {
  static defaultProps = {
    size: 'default',
    text: 'loading...'
  }

  computeSize (type) {
    if (type === 'big') return 'svg-50';
    else if (type === 'smal') return 'svg-30';
    else return 'svg-40';
  }

  render () {
    const {size, text} = this.props;
    const sizeClass = this.computeSize(size);

    return <div className="loading-container iblock font-0 a-c">
      <SvgSprite name="loading-a" className={sizeClass}></SvgSprite>
      <div className="text font-12 p-t-18">{text}</div>
    </div>
  }
}

export default Loading;