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
import TagItem from './components/TagItem';
import Archive from './components/Archive';
import About from './components/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route component={Topbar}></Route>
        <div className="main wrapper">
          <Route exact path="/" component={Homepage} />
          <Route path="/article/detail/:id" component={ArticleDetail} />
          <Route exact path="/tag" component={TagIndex} />
          <Route path="/tag/:tag" component={TagItem} />
          <Route path="/archive" component={Archive} />
          <Route path="/about" component={About} />
        </div>
      </div>
    );
  }
}

export default App;
