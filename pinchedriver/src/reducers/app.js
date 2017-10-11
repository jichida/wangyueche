import { createReducer } from 'redux-act';
import {
  notify_socket_connected,
  getsystemconfig_result
} from '../actions';


const initial = {
  app: {
    socketconnected:false,
  },
};

const app = createReducer({
  [getsystemconfig_result]:(state,payload)=>{
    return {...state,...payload};
  },
  [notify_socket_connected]:(state,socketconnected)=>{
    return {...state,socketconnected};
  },
}, initial.app);

export default app;
