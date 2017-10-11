/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

//点击展开左侧菜单
export const ui_setsidebaropen = createAction('ui_setsidebaropen');
//【拼车页】点击显示日期是否显示
export const ui_pinchesetdateshow = createAction('ui_pinchesetdateshow');
//【拼车页】点击拼车类型
export const ui_clickpinchetypebtn = createAction('ui_clickpinchetypebtn');
//【旅游大巴】点击借车时间
export const ui_lvyoudabasetdateshow1 = createAction('ui_lvyoudabasetdateshow1');
//【旅游大巴】点击还车时间
export const ui_lvyoudabasetdateshow2 = createAction('ui_lvyoudabasetdateshow2');
//【编辑个人资历】点击生日
export const ui_editprofilesetbirthdayshow = createAction('ui_editprofilesetbirthdayshow');
//是否停留在首页地图页面
export const ui_setindexmapvisiable = createAction('ui_setindexmapvisiable');
//地图
export const ui_setcarmap = createAction('ui_setcarmap');

export const ui_setmyorderstabheader = createAction('ui_setmyorderstabheader');