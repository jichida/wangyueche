/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

//发送验证码/登录相关
export const loginsendauth_request = createAction('loginsendauth_request');
export const loginsendauth_result = createAction('loginsendauth_result');

export const loginwithauth_request = createAction('loginwithauth_request');
export const loginwithtoken_request = createAction('loginwithtoken_request');

export const findpwd_request = createAction('findpwd_request');
export const findpwd_result = createAction('findpwd_result');

export const login_request = createAction('login_request');
export const login_result = createAction('login_result');

export const logout_request = createAction('logout_request');
export const logout_result = createAction('logout_result');

export const register_request = createAction('register_request');
export const register_result = createAction('register_result');

export const fillrealnameprofile_request = createAction('fillrealnameprofile_request');
export const fillrealnameprofile_result = createAction('fillrealnameprofile_result');
export const getrealnameprofile_request = createAction('getrealnameprofile_request');
export const getrealnameprofile_result = createAction('getrealnameprofile_result');

export const serverpush_userbalance = createAction('serverpush_userbalance');
export const queryuserbalance_request = createAction('queryuserbalance_request');
export const queryuserbalance_result = createAction('queryuserbalance_result');
