import {combineReducers, createStore} from 'redux';
import {topbarReducer} from './reducers';

const rootReducer = combineReducers({
  topbarReducer
})

export default createStore(rootReducer);