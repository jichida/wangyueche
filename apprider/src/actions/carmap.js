/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const nav_drawroute = createAction('nav_drawroute');


export const serverpush_driverlocation = createAction('serverpush_driverlocation');
export const serverpush_orderprice = createAction('serverpush_orderprice');
export const serverpush_triprequest = createAction('serverpush_triprequest');
export const serverpush_triporder = createAction('serverpush_triporder');
export const serverpush_triprequestandorder = createAction('serverpush_triprequestandorder');

//获取地址信息和附近司机列表
export const changestartposition = createAction('changestartposition');

export const getnearestdrivers_request = createAction('getnearestdrivers_request');
export const getnearestdrivers_result = createAction('getnearestdrivers_result');
//推送给附近所有司机该订单
export const pushrequesttodrivers_request = createAction('pushrequesttodrivers_request');
export const pushrequesttodrivers_result  = createAction('pushrequesttodrivers_result');
//==============地图相关==============
export const carmap_setenableddrawmapflag= createAction('carmap_setenableddrawmapflag');
//设置起始位置&坐标【搜索页】
export const carmap_setstartaddress = createAction('carmap_setstartaddress');
//设置目的位置&坐标【搜索页】
export const carmap_setendaddress = createAction('carmap_setendaddress');
//开始拖动
export const carmap_setdragging = createAction('carmap_setdragging');
//开始设置起始点
export const carmap_changemarkerstartlatlng = createAction('carmap_changemarkerstartlatlng');
//设置地图位置中心点
export const carmap_setmapcenter = createAction('carmap_setmapcenter');
//设置放大级别
export const carmap_setzoomlevel = createAction('carmap_setzoomlevel');
//
export const driveroute_request = createAction('driveroute_request');
export const driveroute_result = createAction('driveroute_result');
//获取价格
export const getprice_request = createAction('getprice_request');
export const getprice_result= createAction('getprice_result');
//地图请求表单，点击改变属性
export const carmap_setcurlocation = createAction('carmap_setcurlocation');
export const carmap_settriptype = createAction('carmap_settriptype');
//开始请求
export const starttriprequestorder_request= createAction('starttriprequestorder_request');
export const starttriprequestorder_result= createAction('starttriprequestorder_result');
//取消请求
export const canceltriprequestorder_request= createAction('canceltriprequestorder_request');
export const canceltriprequestorder_result= createAction('canceltriprequestorder_result');
//重置
export const carmap_resetmap = createAction('carmap_resetmap');
export const carmap_resetmap_url = createAction('carmap_resetmap_url');
export const carmap_setmapinited = createAction('carmap_setmapinited');
//拖动
export const carmap_getaddr = createAction('carmap_getaddr');
export const carmap_dragging  = createAction('carmap_dragging');
export const carmap_dragend = createAction('carmap_dragend');

export const carmapshow_createmap  = createAction('carmapshow_createmap');
export const carmapshow_destorymap = createAction('carmapshow_destorymap');
