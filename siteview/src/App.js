import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import 'reset.css';
import 'flex.css/dist/data-flex.css';
import './assets/style/common.css';
import './assets/style/article.css';
import Topbar from './components/Topbar';
import Homepage from './components/Homepage';
import ArticleDetail from './components/ArticleDetail';
import TagIndex from './components/TagIndex';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route component={Topbar}></Route>
        <div className="main wrapper">
          <Route exact path="/" component={Homepage} />
          <Route path="/article/detail/:id" component={ArticleDetail} />
          <Route path="/tag" component={TagIndex} />
        </div>
      </div>
    );
  }
}

export default App;
