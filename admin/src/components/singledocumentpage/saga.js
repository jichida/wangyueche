import { put, takeEvery,takeLatest,call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'admin-on-rest';
import {
    FINDONE,
    FINDONE_LOADING,

    FINDONE_FAILURE,
    FINDONE_SUCCESS,

} from './action';
import { fetchJson } from '../../util/fetch.js';
import config from '../../env/config';

export default function* singleDoucmentPageSaga() {

  yield takeLatest(FINDONE, function* (action) {
    const {payload} = action;
    try{
      const url = `${config.serverurl}/findone/${payload.resource}`;
      const options = {
        method:'POST',
      };
      yield put({type:FINDONE_LOADING,payload:{resource:payload.resource}});
      const {json} = yield call(fetchJson,url,options);
      yield put({type:FINDONE_SUCCESS,payload:{resource:payload.resource,json}});
    }
    catch(e){
      yield put({type:FINDONE_FAILURE,payload:{resource:payload.resource}});
    }
  });

}
