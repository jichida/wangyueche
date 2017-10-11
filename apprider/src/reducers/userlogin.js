import { createReducer } from 'redux-act';
import {
  //登录
    login_result,
    login_err,
    loginsendauth_result,
    fillprofile_result,
    logout_result,
    queryuserbalance_result
} from '../actions';

const initial = {
  userlogin:{
    loginsuccess:false,
    username:'',
    token:'',
    authtoken:'',
    balance:0,
    profile:{
      avatar:'images/user.jpg',
      nickname:''
    },
  },
};

const userlogin = createReducer({
  [queryuserbalance_result]: (state, payload) => {
    return { ...state,...payload};
  },
  [logout_result]: (state, payload) => {
    localStorage.removeItem('zhongnan_rider_token');
    return { ...initial.userlogin};
  },
  [fillprofile_result]: (state,payload) => {
    const {profile} = payload;
    return { ...state, profile};
  },
  [login_result]: (state, payload) => {
    localStorage.setItem('zhongnan_rider_token',payload.token);
    return { ...state, ...payload,loginsuccess:true};
  },
  [login_err]: (state, authtoken) => {
    return { ...state, loginsuccess:false};
  },
  [loginsendauth_result]:(state,payload)=>{
    const {authtoken} = payload;
    return { ...state, authtoken};
  }
}, initial.userlogin);

export default userlogin;
