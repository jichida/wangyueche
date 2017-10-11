import { createReducer } from 'redux-act';
import {
  //登录
    login_result,
    logout_result,
} from '../actions';

const initial = {
  userlogin:{
    loginsuccess:false,
    username:'',
    token:'',
  },
};

const userlogin = createReducer({
  [logout_result]: (state, payload) => {
    localStorage.removeItem('zhongnan_driver_token');
    return { ...initial.userlogin};
  },
  [login_result]: (state, payload) => {
    localStorage.setItem('zhongnan_driver_token',payload.token);
    return { ...state, ...payload,loginsuccess:true};
  },
}, initial.userlogin);

export default userlogin;
