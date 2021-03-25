import { combineReducers } from 'redux';
import asyncReducer from '../async/asyncReducer';
import authReducer from '../auth/authReducer';
import pdfReducer from '../screens/pdfReducer';
import profileReducer from '../screens/ProfileComponent/profileReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  pdf: pdfReducer,
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
