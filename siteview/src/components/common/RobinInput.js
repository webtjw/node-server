import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
    if (typeof width === 'number' && width === width) return `${width}px`;
    else if (typeof width === 'string') return width;
  }
  updateValue (e) {
    console.log(e.target.value)
  }

  componentDidMount () {
    if (this.props.autoFocus) this.refs.input.focus();
  }
  render () {
    const {value, label, placeholder, width, type} = this.props;

    return <label className="robin-input iblock m-t-20 font-14 relative" style={{width: this.setWidth(width)}}>
      <input type={type} value={value} onChange={this.updateValue} className="p-h-10" ref="input" />
      <div className="hint-text absolute p-h-10">{value ? label : placeholder}</div>
    </label>;
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
  valueHandle: PropTypes.func.isRequired
}

export default RobinInput;