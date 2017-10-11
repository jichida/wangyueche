import { CREATE } from 'admin-on-rest';

export const CREATERECORD = 'PINCHE_CREATERECORD';
export const CREATERECORD_LOADING = 'PINCHE_CREATERECORD_LOADING';
export const CREATERECORD_FAILURE = 'PINCHE_CREATERECORD_FAILURE';
export const CREATERECORD_SUCCESS = 'PINCHE_CREATERECORD_SUCCESS';

export const copyrecord = ( data, basePath) => ({
    type: CREATERECORD,
    payload: { data: { ...data }, basePath },
    meta: { resource: 'buscarpool', fetch: CREATE, cancelPrevious: true },
});