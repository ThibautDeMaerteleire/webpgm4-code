import { combineReducers } from 'redux';
import greeting from './greeting';
import todos from './todos';

export default combineReducers({
  todos,
  greeting
});
