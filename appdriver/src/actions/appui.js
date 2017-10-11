/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';


//点击展开左侧菜单
export const ui_setsidebaropen = createAction('ui_setsidebaropen');
export const ui_setpagetype = createAction('ui_setpagetype');
export const ui_setmyorderstabheader = createAction('ui_setmyorderstabheader');

export const ui_registerfillwizard = createAction('ui_registerfillwizard');
export const ui_createcarwizard = createAction('ui_createcarwizard');

export const ui_isdateopen = createAction('ui_isdateopen');
export const ui_outcarselregistertype = createAction('ui_outcarselregistertype');
export const ui_outcarexpand = createAction('ui_outcarexpand');
