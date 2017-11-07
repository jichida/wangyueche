import { createAction } from 'redux-act';

export const notify_socket_connected = createAction('notify_socket_connected');

export const common_err  = createAction('common_err');

export const getsystemconfig_request = createAction('getsystemconfig_request');
export const getsystemconfig_result = createAction('getsystemconfig_result');

export const ui_showleftmenu = createAction('ui_showleftmenu');


