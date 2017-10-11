/**
 * Created by wangxiaoqing on 2017/3/25.
 */

import { createAction } from 'redux-act';
export const getnotifymessage_request = createAction('getnotifymessage_request');
export const getnotifymessage_result = createAction('getnotifymessage_result');
export const wait_getnotifymessage_request = createAction('wait_getnotifymessage_request');
export const wait_getnotifymessage_result = createAction('wait_getnotifymessage_result');

export const getnotifymessageone_request= createAction('getnotifymessageone_request');
export const getnotifymessageone_result= createAction('getnotifymessageone_result');
