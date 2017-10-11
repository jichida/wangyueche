/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';
export const carmap_setmapinited = createAction('carmap_setmapinited');
//抢单模式开启
export const acceptrequest = createAction('acceptrequest');
export const acceptrequest_request = createAction('acceptrequest_request');
export const acceptrequest_result = createAction('acceptrequest_result');
//更新状态
export const updaterequeststatus = createAction('updaterequeststatus');
export const updaterequeststatus_request = createAction('updaterequeststatus_request');
export const updaterequeststatus_result = createAction('updaterequeststatus_result');

//取消订单
export const canceltriprequestorder_request = createAction('canceltriprequestorder_request');
export const canceltriprequestorder_result = createAction('canceltriprequestorder_result');

//设置放大级别
export const carmap_setenableddrawmapflag = createAction('carmap_setenableddrawmapflag');
export const carmap_setzoomlevel = createAction('carmap_setzoomlevel');
//重置状态
export const carmap_resetmap = createAction('carmap_resetmap');
export const carmap_resetmap_url = createAction('carmap_resetmap_url');
//发起请求
export const setcurlocation = createAction('setcurlocation');
export const sendcurlocationtoserver = createAction('sendcurlocationtoserver');
//服务端主动推送更新当前request
export const serverpush_driverlocation = createAction('serverpush_driverlocation');
export const serverpush_orderprice = createAction('serverpush_orderprice');
export const serverpush_triprequest = createAction('serverpush_triprequest');
export const serverpush_triporder = createAction('serverpush_triporder');
export const serverpush_triprequestandorder = createAction('serverpush_triprequestandorder');

export const selrequest = createAction('selrequest');
export const carmap_setmapcenter = createAction('carmap_setmapcenter');

export const carmapshow_createmap= createAction('carmapshow_createmap');
export const carmapshow_destorymap= createAction('carmapshow_destorymap');
