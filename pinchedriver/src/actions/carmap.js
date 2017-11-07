import { createAction } from 'redux-act';

export const carmap_setmapinited = createAction('carmap_setmapinited');

export const carmap_setmapcenter = createAction('carmap_setmapcenter');

export const carmap_setzoomlevel = createAction('carmap_setzoomlevel');
export const carmapshow_createmap = createAction('carmapshow_createmap');
export const carmapshow_destorymap = createAction('carmapshow_destorymap');
export const carmap_setenableddrawmapflag = createAction('carmap_setenableddrawmapflag');

export const driveroute_request = createAction('driveroute_request');
export const driveroute_result = createAction('driveroute_result');

export const sendcurlocationtoserver = createAction('sendcurlocationtoserver');
export const setcurlocation = createAction('setcurlocation');