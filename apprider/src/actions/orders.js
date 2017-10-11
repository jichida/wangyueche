/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';


//获取当前订单
export const getorderdetail_request = createAction('getorderdetail_request');
export const getorderdetail_result = createAction('getorderdetail_result');

export const getmytriporders_request = createAction('getmytriporders_request');
export const getmytriporders_result = createAction('getmytriporders_result');
export const wait_getmytriporders_request = createAction('wait_getmytriporders_request');
export const wait_getmytriporders_result = createAction('wait_getmytriporders_result');

//新增一条订单记录
export const triporder_addone = createAction('triporder_addone');
export const triporder_updateone = createAction('triporder_updateone');
//获取支付验证字符串
export const payorder_request =  createAction('payorder_request');
export const payorder_result = createAction('payorder_result');

export const getpaysign_request = createAction('getpaysign_request');
export const getpaysign_result = createAction('getpaysign_result');

export const ui_setorderdetail = createAction('ui_setorderdetail');
export const ui_setorderdetail_reset = createAction('ui_setorderdetail_reset');
export const ui_setselcommenttag = createAction('ui_setselcommenttag');


export const getcommenttags_request = createAction('getcommenttags_request');
export const getcommenttags_result = createAction('getcommenttags_result');

export const updateorder_comment_request = createAction('updateorder_comment_request');
export const updateorder_comment_result = createAction('updateorder_comment_result');

export const insertorder_request = createAction('insertorder_request');
export const insertorder_result = createAction('insertorder_result');


//订单确认页面，传递数据
export const orderconfirm_settourbus = createAction('orderconfirm_settourbus');
export const orderconfirm_setpinche = createAction('orderconfirm_setpinche');
export const orderconfirm_setpincheseatnumber = createAction('orderconfirm_setpincheseatnumber');
export const orderconfirm_setpayway= createAction('orderconfirm_setpayway');
export const orderconfirm_selpinchestation = createAction('orderconfirm_selpinchestation');
