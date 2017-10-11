import { createAction } from 'redux-act';
import { take,put, call,race,takeLatest } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import config from '../config.js';
const synccallreq = createAction('synccallreq');

//以下导出放在视图
export function callthen(actionreq,actionres,payload){
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(synccallreq({actionreq,actionres,resolve,reject,...payload}));
    });
  }
}

//以下导出放在saga中
export function* createsagacallbackflow(){
  yield takeLatest(`${synccallreq}`,function*(action){
    const {payload:{actionreq,actionres,resolve,reject,...data}} = action;
    yield put(actionreq(data));//发送请求

    console.log('createflowsz==>payload:' +JSON.stringify(data));
    const { response, timeout } = yield race({
       response: take(actionres),
       timeout: call(delay, config.requesttimeout)
    });
    if(!!timeout){
      reject('请求超时!');
    }
    else{
      let {payload:{err,result}} = response;
      if (!!err) {
        reject(err);
      }
      else{
        resolve({result});
      }
    }
  });
}
