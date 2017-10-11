/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const login_request = createAction('login_request');
export const login_result = createAction('login_result');

export const logout_request = createAction('logout_request');
export const logout_result = createAction('logout_result');
