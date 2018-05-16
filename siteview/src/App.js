import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import 'reset.css';
import 'flex.css/dist/data-flex.css';
import './assets/style/common.css';
import './assets/style/article.css';
import Topbar from './components/Topbar';
import Homepage from './components/Homepage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route component={Topbar}></Route>
        <div className="main wrapper">
          <Route path="/" component={Homepage} />
        </div>
      </div>
    );
  }
}

export default App;
