import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import 'reset.css';
import 'flex.css/dist/data-flex.css';
import './assets/style/common.css';
import './assets/style/article.css';
import Topbar from './components/Topbar';
import SideTip from './components/common/SideTip';
import Homepage from './components/Homepage';
import ArticleDetail from './components/ArticleDetail';
import TagIndex from './components/TagIndex';
import TagItem from './components/TagItem';
import Archive from './components/Archive';
import About from './components/About';
import Login from './components/Login';
import ArticleEdit from './components/ArticleEdit';

class App extends Component {
  render() {
    return <div className="App">
      <SideTip></SideTip>
      <Topbar></Topbar>
      <div className="main wrapper">
        <Route path="/" component={Homepage} exact />
        <Route path="/article/detail/:id" component={ArticleDetail} />
        <Route path="/tag" component={TagIndex} exact />
        <Route path="/tag/:tag" component={TagItem} />
        <Route path="/archive" component={Archive} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/article/edit" component={ArticleEdit} />
      </div>
    </div>;
  }
}

export default App;
