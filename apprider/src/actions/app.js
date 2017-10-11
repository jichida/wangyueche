/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const common_err = createAction('common_err');

export const notify_socket_connected = createAction('notify_socket_connected');
export const serverpush_restoreorder = createAction('serverpush_restoreorder');//恢复订单
export const serverpush_restoreorder_effect = createAction('serverpush_restoreorder_effect');//恢复订单后的操作
export const serverpush_userloginsuccess_notify = createAction('serverpush_userloginsuccess_notify');//服务端登录成功
export const queryorder = createAction('queryorder');//查询第一个订单状态（防止已经在打车页面断开连接后订单已经过期 恢复）

export const getsystemconfig_result = createAction('getsystemconfig_result');
