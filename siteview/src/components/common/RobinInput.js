import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../assets/style/robinInput.css';

class RobinInput extends Component {
  static defaultProps = {
    value: '',
    width: 300,
    label: '输入内容',
    placeholder: '请输入内容',
    type: 'text',
    fullWidth: false,
    autoFocus: false
  }

  setWidth (width) {
    if (parseInt(width, 10) === width) return `${width}px`;
    else if (typeof width === 'string') return width;
  }
  updateValue (e) {
    const {value} = e.target;
    const {valueHandle} = this.props;
    valueHandle && valueHandle(value);
  }
  handleKeypress (e) {
    const {onEnter} = this.props;
    e.key === 'Enter' && onEnter && onEnter();
  }

  componentDidMount () {
    if (this.props.autoFocus) this.refs.input.focus();
  }
  render () {
    const {value, label, placeholder, width, type} = this.props;

    return <form className="robin-input iblock font-14 relative" style={{width: this.setWidth(width)}}>
      <label>
        <input type={type} value={value} autoComplete="new-password" onChange={e => this.updateValue(e)} className={(value ? 'not-empty ' : '') + 'font-14'} ref="input" onKeyPress={e => this.handleKeypress(e)} />
        <div className="hint-text absolute">{value ? label : placeholder}</div>
      </label>
    </form>;
  }
}

RobinInput.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  autoFocus: PropTypes.bool,
  valueHandle: PropTypes.func.isRequired,
  onEnter: PropTypes.func
}

export default RobinInput;