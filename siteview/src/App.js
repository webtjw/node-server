import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import 'reset.css';
import 'flex.css/dist/data-flex.css';
import './assets/style/common.css';
import Topbar from './components/Topbar';
import Homepage from './components/Homepage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route component={Topbar}></Route>
        <Route path="/" component={Homepage} />
      </div>
    );
  }
}

export default App;
