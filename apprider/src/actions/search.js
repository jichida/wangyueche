/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';
//搜索
export const setsearchtxt = createAction('setsearchtxt');
export const searchtext_request = createAction('searchtext_request');
export const searchtext_result = createAction('searchtext_result');
export const placesearchresult = createAction('placesearchresult');

//设置常用地址【搜索页】
export const setoftenuseaddress_request = createAction('setoftenuseaddress_request');
export const setoftenuseaddress_result = createAction('setoftenuseaddress_result');
