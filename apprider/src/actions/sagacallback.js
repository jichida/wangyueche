
import {
    getrechargerecords_request,wait_getrechargerecords_request,wait_getrechargerecords_result,
    getnotifymessage_request,wait_getnotifymessage_request,wait_getnotifymessage_result,
    getmytriporders_request,wait_getmytriporders_request,wait_getmytriporders_result,
    mycoupongetall_request,wait_mycoupongetall_request,wait_mycoupongetall_result,
    oauthbinduser_request,wait_oauthbinduser_request,wait_oauthbinduser_result,
} from '../actions/index.js';

import { take, call, race ,takeLatest} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import config from '../config.js';

let synccall=(payload,waitfn,fn)=>{
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(waitfn({resolve,reject,payload}));
      dispatch(fn({...payload}));
    });
  }
}


//以下导出放在视图中
//<--
export function getrechargerecords(payload){
  return synccall(payload,wait_getrechargerecords_request,getrechargerecords_request);
}
export function getnotifymessage(payload){
  return synccall(payload,wait_getnotifymessage_request,getnotifymessage_request);
}
export function getmytriporders(payload){
  return synccall(payload,wait_getmytriporders_request,getmytriporders_request);
}
export function mycoupongetall(payload){
  return synccall(payload,wait_mycoupongetall_request,mycoupongetall_request);
}

export function oauthbinduser(payload){
  return synccall(payload,wait_oauthbinduser_request,oauthbinduser_request);
}
//2.
function* createflowsz(fnwatres,action){
    let {payload:{resolve,reject,payload:data}} = action;
    console.log('createflowsz==>payload:' +JSON.stringify(data));
    const { response, timeout } = yield race({
       response: take(fnwatres),
       timeout: call(delay, config.requesttimeout)
    });
    if(timeout){
      reject('请求超时!');
    }
    else{
      let {payload:{err,result}} = response;
      if (err) {
        reject(err);
      }
      else{
        resolve(result);
      }
    }
}
//以下导出放在saga中
export function* createsagacallbackflow(){
  let waitfnsz = [];
  waitfnsz.push([`${wait_getrechargerecords_request}`,`${wait_getrechargerecords_result}`]);
  waitfnsz.push([`${wait_getnotifymessage_request}`,`${wait_getnotifymessage_result}`]);
  waitfnsz.push([`${wait_getmytriporders_request}`,`${wait_getmytriporders_result}`]);
  waitfnsz.push([`${wait_mycoupongetall_request}`,`${wait_mycoupongetall_result}`]);
  waitfnsz.push([`${wait_oauthbinduser_request}`,`${wait_oauthbinduser_result}`]);

  for(let i=0;i <waitfnsz.length; i++){
     let fnsz = waitfnsz[i];
     yield takeLatest(fnsz[0],createflowsz, fnsz[1]);
  }

}
