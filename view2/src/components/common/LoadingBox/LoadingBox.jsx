import React, {Component} from 'react';
import PropTypes from 'prop-types';

class LoadingBox extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {load} = this.props;
    
    load()
  }
  render () {
    return <div>
      
    </div>
  }
}

LoadingBox.propTypes = {
  load: PropTypes.func.isRequired
}

export default LoadingBox;