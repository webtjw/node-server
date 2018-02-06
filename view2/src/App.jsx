import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar/Sidebar';
import Index from './components/index/Index';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper" data-flex="dir:left">
          <Sidebar></Sidebar>
          <div className="main p-t-40" data-flex-box="1">
            <Route path="/" component={Index} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
