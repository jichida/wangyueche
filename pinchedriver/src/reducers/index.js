import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import weui from './weui';
import app from './app';
import notifymessage from './messagecenter';
import userlogin from './userlogin';
import route from './route';
import about from './about';
import carmap from './carmap';

export default combineReducers({
  route,
  app,
  notifymessage,
  userlogin,
  weui,
  about,
  carmap,
  form: formReducer,
  router: routerReducer
});
