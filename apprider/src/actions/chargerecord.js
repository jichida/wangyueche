import { createAction } from 'redux-act';
//
//
export const getrechargerecords_request = createAction('getrechargerecords_request');
export const getrechargerecords_result = createAction('getrechargerecords_result');

export const wait_getrechargerecords_request = createAction('wait_getrechargerecords_request');
export const wait_getrechargerecords_result = createAction('wait_getrechargerecords_result');

export const rechargepay_request = createAction('rechargepay_request');//充值
export const rechargepay_result = createAction('rechargepay_result');//充值返回
