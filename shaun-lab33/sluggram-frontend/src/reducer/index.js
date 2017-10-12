import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
import photo from './photo';

export default combineReducers({
  auth,
  profile,
  photo,
});