import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'admin-on-rest';
import {
    CREATERECORD_SUCCESS,
    CREATERECORD_FAILURE,
} from './mycopybuttonaction';

export default function* buscarpoolcopyrecordSaga() {
    yield [
        takeEvery(CREATERECORD_SUCCESS, function* ({payload:{data:{id}},meta:{resource}}) {
            console.log(`payload:${JSON.stringify(id)}`);
            yield put(showNotification('resources.buscarpool.notification.copyrecord_success'));
            let baseurl = `${resource}/${encodeURIComponent(id)}`;
            console.log(`baseurl:${baseurl}`);
            yield put(push(baseurl));
        }),
        takeEvery(CREATERECORD_FAILURE, function* ({ error }) {
            yield put(showNotification('resources.buscarpool.notification.copyrecord_error', 'warning'));
            console.error(error);
        }),
    ];
}
