/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';
//
//开始接单了！
export const startoperate  = createAction('startoperate');
//停止接单了！
export const stopoperate = createAction('stopoperate');


export const operatelogin  = createAction('operatelogin');
export const operatelogout  = createAction('operatelogout');
// export const getnearbyrequests_request = createAction('getnearbyrequests_request');
// export const getnearbyrequests_result = createAction('getnearbyrequests_result');
export const serverpush_nearbyrequests = createAction('serverpush_nearbyrequests');
export const serverpush_nearbyrequests_addone = createAction('serverpush_nearbyrequests_addone');
export const serverpush_nearbyrequests_removeone = createAction('serverpush_nearbyrequests_removeone');

//
export const setbizstatus = createAction('setbizstatus');