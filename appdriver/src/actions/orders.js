/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';
//获取当前订单
export const getmytriporders_request = createAction('getmytriporders_request');
export const getmytriporders_result = createAction('getmytriporders_result');
export const wait_getmytriporders_request = createAction('wait_getmytriporders_request');
export const wait_getmytriporders_result = createAction('wait_getmytriporders_result');
//现金支付
export const payorderwithcash_request = createAction('payorderwithcash_request');
export const payorderwithcash_result = createAction('payorderwithcash_result');
//新增一条订单记录
export const triporder_addone = createAction('triporder_addone');
export const triporder_updateone = createAction('triporder_updateone');
//订单详情
export const ui_setorderdetail = createAction('ui_setorderdetail');
export const ui_setorderdetail_reset = createAction('ui_setorderdetail_reset');
export const getcommenttags_request = createAction('getcommenttags_request');
export const getcommenttags_result = createAction('getcommenttags_result');
export const updateorder_comment_request = createAction('updateorder_comment_request');
export const updateorder_comment_result = createAction('updateorder_comment_result');

export const ui_setselcommenttag = createAction('ui_setselcommenttag');
