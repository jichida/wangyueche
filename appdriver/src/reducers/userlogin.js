import { createReducer } from 'redux-act';
import {
  //登录
    login_result,
    loginsendauth_result,
    logout_result,
    fillrealnameprofile_result,
    queryuserbalance_result,
    startoperate,
    stopoperate,
    getrealnameprofile_result
} from '../actions';

const initial = {
  userlogin:{
    isstartoperate:false,
    loginsuccess:false,
    commenttagsforrider:[],
    username:'',
    token:'',
    authtoken:'',
    registertype:'快车',
    approvalstatus:'',
    profile:{},
    avatarURL:'',
    Platform_baseInfoDriver:
    {
      DriverName:'',
      DriverPhone:''
    },
    Platform_baseInfoVehicle:
    {
      VehicleNo:''
    },
  },
};

const userlogin = createReducer({
  [startoperate]:(state,payload)=>{
    return { ...state,isstartoperate:true};
  },
  [stopoperate]:(state,payload)=>{
    return { ...state,isstartoperate:false};
  },
  [queryuserbalance_result]: (state, payload) => {
    return { ...state,...payload};
  },
  [logout_result]: (state, payload) => {
    localStorage.removeItem('zhongnan_driver_token');
    return { ...initial.userlogin};
  },
  [login_result]: (state, payload) => {
    localStorage.setItem('zhongnan_driver_token',payload.token);
    return { ...state, ...payload,loginsuccess:true};
  },
  [getrealnameprofile_result]:(state,payload)=> {
    return { ...state, ...payload};
  },
  [fillrealnameprofile_result]: (state, payload) => {
    return { ...state, ...payload};
  },
  [loginsendauth_result]:(state,authtoken)=>{
    return { ...state, authtoken};
  }
}, initial.userlogin);

export default userlogin;
