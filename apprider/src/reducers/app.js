import { createReducer } from 'redux-act';
import {
  notify_socket_connected,
  getsystemconfig_result
} from '../actions';


const initial = {
  app: {
    socketconnected:false,
    type:'error',
    title:'',
    msg:'',
    ispop:false,
    pinchecitylist:[],

    hotcity:[],
    servicephonenumber:'',
    daijiacancelprice:50,
    daijialeastbalance:50,
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
