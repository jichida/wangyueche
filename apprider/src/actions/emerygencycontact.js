/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';
//获取紧急联系人
export const getemerygencycontact_request = createAction('getemerygencycontact_request');
export const getemerygencycontact_result = createAction('getemerygencycontact_result');

export const insertemerygencycontact_request = createAction('insertemerygencycontact_request');
export const insertemerygencycontact_result = createAction('insertemerygencycontact_result');

export const deleteemerygencycontact_request = createAction('deleteemerygencycontact_request');
export const deleteemerygencycontact_result = createAction('deleteemerygencycontact_result');

export const getphoneconcatlist = createAction('getphoneconcatlist');
