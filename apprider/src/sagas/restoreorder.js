import { select,put,takeEvery,call } from 'redux-saga/effects';
import {
    serverpush_restoreorder,
    serverpush_restoreorder_effect,
    triporder_addone,
    queryorder,
    serverpush_userloginsuccess_notify,
} from '../actions';
import { push } from 'react-router-redux';
import {delay} from 'redux-saga';

const getcurmap_triporderid = (state) => {
  let triporderid = state.carmap.curmappageorder._id;
  return {triporderid};
};


export function* createrestoreorderflow(){
    yield takeEvery(`${serverpush_restoreorder}`, function*(restoreorderaction) {
      const {payload} = restoreorderaction;
      console.log("恢复订单===>" + JSON.stringify(payload));
      yield put(triporder_addone(payload.triporder));
      //yield put(serverpush_restoreorder(payload));
      yield put(push('/requestorderstarting'));
      yield call(delay,1000);
      yield put(serverpush_restoreorder_effect(payload));
    });

    yield takeEvery(`${serverpush_userloginsuccess_notify}`, function*(restoreorderaction) {
      //查看当前页面是否在请求中，如果是则发送queryorder，带triporderid
      const {triporderid} = yield select(getcurmap_triporderid);
      if(!!triporderid){
        yield put(queryorder({triporderid}));
      }
    });
}
