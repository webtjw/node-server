import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/app-reset.css';
import './assets/style/common.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
