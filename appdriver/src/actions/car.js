/**
 * Created by wangxiaoqing on 2017/4/26.
 */
import { createAction } from 'redux-act';
export const carcreate_request = createAction('carcreate_request');
export const carcreate_result = createAction('carcreate_result');

export const cardelete_request = createAction('cardelete_request');
export const cardelete_result = createAction('cardelete_result');

export const cargetall_request = createAction('cargetall_request');
export const cargetall_result = createAction('cargetall_result');

export const carupdate_request = createAction('carupdate_request');
export const carupdate_result = createAction('carupdate_result');

export const cargetallbrands_request = createAction('cargetallbrands_request');
export const cargetallbrands_result = createAction('cargetallbrands_result');

export const cargetallmodelfrombrandid_request = createAction('cargetallmodelfrombrandid_request');
export const cargetallmodelfrombrandid_result = createAction('cargetallmodelfrombrandid_result');

export const cargetallcolors_request = createAction('cargetallcolors_request');
export const cargetallcolors_result = createAction('cargetallcolors_result');

export const carsetdefault_request = createAction('carsetdefault_request');
export const carsetdefault_result = createAction('carsetdefault_result');
