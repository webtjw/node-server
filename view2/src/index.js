import './assets/style/app-reset.scss';
import './assets/style/common.scss';
import './assets/style/data-flex.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import intialize from './utils/initialize';

intialize();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
