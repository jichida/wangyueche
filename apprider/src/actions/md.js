import { createAction } from 'redux-act';

//需经过saga复杂处理的特殊消息
export const md_serverpush_triporder = createAction('md_serverpush_triporder');
export const md_loginsendauth_result = createAction('md_loginsendauth_result');
export const md_serverpush_triprequestandorder = createAction('md_serverpush_triprequestandorder');
export const md_starttriprequestorder_result = createAction('md_starttriprequestorder_result');
export const md_canceltriprequestorder_result = createAction('md_canceltriprequestorder_result');
export const md_queryuserbalance_result = createAction('md_queryuserbalance_result');

export const md_getrechargerecords= createAction('md_getrechargerecords');
export const md_getnotifymessage= createAction('md_getnotifymessage');
export const md_getmytriporders= createAction('md_getmytriporders');
export const md_mycoupongetall= createAction('md_mycoupongetall');
export const md_oauthbinduser= createAction('md_oauthbinduser');

export const md_map_dragging = createAction('md_map_dragging');
export const md_map_dragend = createAction('md_map_dragend');
