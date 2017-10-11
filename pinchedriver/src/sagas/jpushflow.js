import {takeEvery,put,call} from 'redux-saga/effects';
import {
    login_result,
    logout_result,
    jpushlistenInMessage,
    jpushpostNotification,
    set_weui
} from '../actions';
import {
    setJPushAlias,
    cancelJPushAlisa
} from '../env/jpush';
import _ from 'lodash';
import { push } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

let async_setJPushAlias =(userid)=> {
  return new Promise(resolve => {
    setJPushAlias(userid);
    resolve();
  });
};

let async_cancelJPushAlisa =()=> {
  return new Promise(resolve => {
    cancelJPushAlisa();
    resolve();
  });
};

//获取地理位置信息，封装为promise
export function* jpushflow(){//仅执行一次
   yield takeEvery(`${login_result}`, function*(action) {
      let {payload:{userid}} = action;
      yield call(async_setJPushAlias,userid);
      console.log(`login_result ===>${JSON.stringify(userid)}`);
    });

    yield takeEvery(`${logout_result}`, function*(action) {
      let {payload:msgobj} = action;
      yield call(async_cancelJPushAlisa);
      console.log(`logout_result ===>${JSON.stringify(msgobj)}`);
    });

    yield takeEvery(`${jpushlistenInMessage}`, function*(action) {
       let {payload:msgobj} = action;
        try{
          //yield call(alertmessage,`jpushlistenInMessage ===>${JSON.stringify(msgobj)}`);
          if(!!msgobj){
            let message = '接收到一条消息';
            message = _.get(msgobj,'aps.alert',message);
            yield put(set_weui({
              toast:{
              text:message,
              show: true,
              type:'success'
            }}));
            if(!!msgobj._id){
              if(msgobj.subtype==='msg'){
                yield put(push(`/mymessagedetail/${msgobj._id}`));
              }
              // else{
              //   yield put(push(`${msgobj.messagecontent}`));
              // }
            }
            else{
              alert(`err->jpushlistenInMessage ===>${JSON.stringify(msgobj)}`);
            }
          }
        }
          catch(e){
            alert(`err->jpushlistenInMessage ===>${JSON.stringify(msgobj)},e:${JSON.stringify(e)}`);
          }

    });

    yield takeEvery(`${jpushpostNotification}`, function*(action) {
      let {payload:msgobj} = action;
        // 按 2，模拟发送（点击了推送消息）
        try{
          //alert(`jpushpostNotification ===>${JSON.stringify(msgobj)}`);
          //yield call(alertmessage,`jpushpostNotification ===>${JSON.stringify(msgobj)}`);
          if(!!msgobj){
            if(!!msgobj._id){
              if(msgobj.subtype==='msg'){
                yield put(push(`/mymessagedetail/${msgobj._id}`));
              }
              // else{
              //   yield put(push(`${msgobj.messagecontent}`));
              // }
            }
            else{
              alert(`err->jpushlistenInMessage ===>${JSON.stringify(msgobj)}`);
              // let message = '接收到一条消息';
              // message = _.get(msgobj,'aps.alert',message);
              // yield put(set_weui({
              //   toast:{
              //   text:message,
              //   show: true,
              //   type:'success'
              // }}));
            }
          }

        }
        catch(e){
          alert(`err->jpushlistenInMessage ===>${JSON.stringify(msgobj)},e:${JSON.stringify(e)}`);
        }

    });
}
