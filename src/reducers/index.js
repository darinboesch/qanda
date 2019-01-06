import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import urls from './urlReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  user,
  urls
});

export default rootReducer;
