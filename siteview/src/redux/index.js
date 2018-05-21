import {createStore} from 'redux';
import reducer from './reducer';

const store = createStore(reducer, {
  user: null
});

export default store;