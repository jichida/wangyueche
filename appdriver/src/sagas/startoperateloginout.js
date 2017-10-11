import {takeEvery, call, put,select } from 'redux-saga/effects';
import {
  startoperate,
  stopoperate,
  operatelogin,
  operatelogout,
  login_result,
} from '../actions';
import {getcurrentpos} from './getcurrentpos';

const getloginresult = (state) => {
  let {isstartoperate,approvalstatus,loginsuccess} = state.userlogin;
  return {isstartoperate,approvalstatus,loginsuccess};
};

export function* createstartoperateloginoutflow(){
  yield takeEvery(`${login_result}`, function*(action) {
    const {isstartoperate,approvalstatus,loginsuccess} = yield select(getloginresult);
    if(isstartoperate){
      console.log(`重新发送出车请求`);
      yield put(startoperate({approvalstatus,loginsuccess}));
    }
  }),
  yield takeEvery(`${startoperate}`, function*(action) {
    let {payload:loginresult} = action;
    if(loginresult.approvalstatus === '已审核' && loginresult.loginsuccess){
      let curlocation = yield call(getcurrentpos);
      let operateLogindoc = {
        driverlocation :[curlocation.lng,curlocation.lat]
      };
      yield put(operatelogin(operateLogindoc));
    }

    console.log("开始接单并且获取到当前位置");

  });

  yield takeEvery(`${stopoperate}`, function*(action) {
    let {payload:loginresult} = action;
    if(loginresult.approvalstatus === '已审核' && loginresult.loginsuccess){
      let curlocation = yield call(getcurrentpos);
      let operateLogoutdoc = {
        driverlocation :[curlocation.lng,curlocation.lat]
      };
      console.log("退出发送当前位置");
      yield put(operatelogout(operateLogoutdoc));
    }
  });
}
