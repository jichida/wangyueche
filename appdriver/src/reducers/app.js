import { createReducer } from 'redux-act';
import {
  showpopmessage,
  hidepopmessage,
  notify_socket_connected,
  getsystemconfig_result
} from '../actions';


const initial = {
  app: {
    servicephonenumber:'',//客服电话
    commenttagsforrider:[],//评论标签

    socketconnected:false,
    type:'error',
    title:'',
    msg:'',
    ispop:false
  },
};

const app = createReducer({
  [getsystemconfig_result]:(state,payload)=>{
    return {...state,...payload};
  },
  [notify_socket_connected]:(state,socketconnected)=>{
    return {...state,socketconnected};
  },
  [showpopmessage]:(state, payload) => {
    return { ...state,msg:payload.msg,title:payload.title,type:payload.type,ispop:true};
  },
  [hidepopmessage]:(state, payload) => {
    return { ...state,msg:'',title:'',ispop:false};
  },
}, initial.app);

export default app;
