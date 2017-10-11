import { put,takeEvery,call,select } from 'redux-saga/effects';
import {
  loginsendauth_result,

  serverpush_triporder,
  triporder_updateone,

  serverpush_triprequestandorder,
  starttriprequestorder_result,

  insertorder_result,
  canceltriprequestorder_result,
  getpaysign_result,
  triporder_addone,

  common_err,
  changestartposition,

  md_serverpush_triporder,
  md_loginsendauth_result,
  md_serverpush_triprequestandorder,
  md_canceltriprequestorder_result,

  updateorder_comment_result,
  ui_setorderdetail,

  rechargepay_result,
  set_weui,

  mycoupongetall_result,
  wait_mycoupongetall_result,
  md_mycoupongetall,
  getnotifymessage_result,
  wait_getnotifymessage_result,
  md_getnotifymessage,
  getrechargerecords_result,
  wait_getrechargerecords_result,
  md_getrechargerecords,
  getmytriporders_result,
  wait_getmytriporders_result,
  md_getmytriporders,

  getorderdetail_result,
  md_starttriprequestorder_result,
  pushrequesttodrivers_request
} from '../actions';
import { push,replace } from 'react-router-redux';
import _ from 'lodash';

const waitfnsz = [
  [
    mycoupongetall_result,
    wait_mycoupongetall_result,
    `${md_mycoupongetall}`,
  ],
  [
    getnotifymessage_result,
    wait_getnotifymessage_result,
    `${md_getnotifymessage}`,
  ],
  [
    getrechargerecords_result,
    wait_getrechargerecords_result,
    `${md_getrechargerecords}`,
  ],
  [
    getmytriporders_result,
    wait_getmytriporders_result,
    `${md_getmytriporders}`,
  ],
];

const getnearbydrivers = (state)=>{
  let driverlist = state.carmap.driveruserlist;
  let driverids = [...driverlist];
  return driverids;
}

export function* wsrecvsagaflow() {
  for(let i = 0; i < waitfnsz.length; i ++){
      let fnsz = waitfnsz[i];
      yield takeEvery(fnsz[2], function*(action) {
          let {payload:result} = action;
          console.log(`takeEvery===>result:${JSON.stringify(result)}`);
          yield put(fnsz[0](result));
          yield put(fnsz[1]({result:result}));
      });
  }


  yield takeEvery(`${updateorder_comment_result}`, function*(action) {
      let {payload:result} = action;
      //返回一个订单object
      yield put(triporder_updateone(result));
      yield put(ui_setorderdetail({showaddevaluate:false}));
  });

  yield takeEvery(`${getorderdetail_result}`, function*(action) {
      let {payload:result} = action;
      //返回一个订单object
      yield put(triporder_updateone(result.triporder));
  });



  yield takeEvery(`${rechargepay_result}`, function*(action) {
      let {payload:result} = action;
      //返回一个订单object
      yield put(triporder_addone(result.triporder));
      yield put(push(`/rechargepay/${result.triporder._id}`));
  });


  yield takeEvery(`${md_serverpush_triporder}`, function*(action) {
      let {payload:result} = action;
      yield put(serverpush_triporder(result));
      yield put(triporder_updateone(result.triporder));
  });

  yield takeEvery(`${md_loginsendauth_result}`, function*(action) {
      let {payload:result} = action;
      yield put(loginsendauth_result(result));
      let toast = {
          show : true,
          text : result.msg,
          type : "success"
      }
      yield put(set_weui({ toast }));
  });

  yield takeEvery(`${common_err}`, function*(action) {
      let {payload:result} = action;
      if(result.type === 'getpaysign'){
        yield put(getpaysign_result());//payload:null
      }
      yield put(set_weui({
        toast:{
        text:result.errmsg,
        show: true,
        type:'warning'
      }}));

  });

  yield takeEvery(`${md_serverpush_triprequestandorder}`, function*(action) {
      let {payload:result} = action;
      yield put(serverpush_triprequestandorder(result));
      yield put(triporder_updateone(result.triporder));
  });

  yield takeEvery(`${md_starttriprequestorder_result}`, function*(action) {
      let {payload:result} = action;
      yield put(starttriprequestorder_result(result));
      yield put(triporder_addone(result.triporder));

      //推送给所有司机该订单
      let driveridlist = yield select(getnearbydrivers);
      if(driveridlist.length > 0){
        yield put(pushrequesttodrivers_request({
            orderid:result.triporder._id,
            requestid:result.triprequest._id,
            driveridlist:driveridlist
        }));
      }
      yield put(push('/requestorderstarting'));
  });

  //===========
  yield takeEvery(`${insertorder_result}`, function*(action) {
      let {payload:result} = action;
      yield put(triporder_addone(result.triporder));
      yield put(replace(`/orderdetail/${result.triporder._id}`));
  });

  yield takeEvery(`${md_canceltriprequestorder_result}`, function*(action) {
      let {payload:result} = action;
      yield put(canceltriprequestorder_result(result));
      yield put(triporder_updateone(result.triporder));
  });
}
