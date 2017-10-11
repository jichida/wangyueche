/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';
//发送验证码/登录相关
export const loginsendauth_request = createAction('loginsendauth_request');
export const loginsendauth_result = createAction('loginsendauth_result');

export const loginwithauth_request = createAction('loginwithauth_request');
export const loginwithtoken_request = createAction('loginwithtoken_request');
export const login_result = createAction('login_result');
export const login_err = createAction('login_err');
//发送编辑信息请求
export const fillprofile_request = createAction('fillprofile_request');
export const fillprofile_result = createAction('fillprofile_result');

export const logout_request = createAction('logout_request');
export const logout_result = createAction('logout_result');

export const serverpush_userbalance = createAction('serverpush_userbalance');
export const queryuserbalance_request = createAction('queryuserbalance_request');
export const queryuserbalance_result = createAction('queryuserbalance_result');
