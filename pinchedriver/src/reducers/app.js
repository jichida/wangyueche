import { createReducer } from 'redux-act';
import {
  notify_socket_connected,
  getsystemconfig_result,
  ui_showleftmenu,
} from '../actions';


const initial = {
  app: {
    socketconnected:false,
    showleftmenu: false,
  },
};

const app = createReducer({
  [getsystemconfig_result]:(state,payload)=>{
    return {...state,...payload};
  },
  [notify_socket_connected]:(state,socketconnected)=>{
    return {...state,socketconnected};
  },
  [ui_showleftmenu]:(state,payload)=>{
    return {...state,showleftmenu: payload};
  },
}, initial.app);

export default app;
