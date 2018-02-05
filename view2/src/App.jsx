import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar/Sidebar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Route path="/" component={Sidebar} />
        </div>
      </Router>
    );
  }
}

export default App;
