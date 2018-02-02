import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Topbar from './components/common/Topbar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Topbar></Topbar>
        </div>
      </Router>
    );
  }
}

export default App;
