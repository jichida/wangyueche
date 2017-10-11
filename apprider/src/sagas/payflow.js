/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import {put,takeEvery,call,take,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  payorder
} from '../env/pay.js';
import Decimal from 'decimal.js';
import {
  payorder_result,
  getpaysign_request,
  getpaysign_result,
  triporder_updateone,
  serverpush_userbalance,
  queryuserbalance_request,
  queryuserbalance_result,
} from '../actions';
import { goBack } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

function takepay(paysign,orderinfo) {
    return new Promise(resolve => {
      payorder(paysign,orderinfo,(result)=>{
        resolve(result);
      });
    });
}

function accMul(arg1,arg2)
{
var m=0,s1=arg1.toString(),s2=arg2.toString();
try{m+=s1.split(".")[1].length}catch(e){}
try{m+=s2.split(".")[1].length}catch(e){}
return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
return accMul(arg, this);
}

export function* payflow() {
    console.log(`payflow======>`);

    yield takeEvery(`${payorder_result}`, function*(action) {
          let {payload:result} = action;
          console.log(`payorder_result:${JSON.stringify(result)}`);
          const {orderinfo} = result;
          let orderdoc = {
             out_trade_no: orderinfo._id,
             subject: orderinfo.ordertitle || '商品名称',
             body: orderinfo.orderdetail|| '商品详情',
             total_fee: orderinfo.realprice
           };
           if(orderinfo.paytype === 'weixin'){
             let totalfee = new Decimal(orderinfo.realprice);
             orderdoc.total_fee = totalfee.times(100).toNumber();
           }
          yield put(getpaysign_request({
              paytype:orderinfo.paytype,
              paypage:'orderdetailpage',
              orderdoc:orderdoc,
          }));
          const { response, timeout } = yield race({
             response: take(`${getpaysign_result}`),
             timeout: call(delay, 10000)
          });

          console.log(`response===>${JSON.stringify(response)}`);

          let { payload:paysign } =  response;
          if(!!paysign){//失败情况下，发送paysign 为NULL
            let payresult = yield call(takepay,paysign,orderinfo);
            console.log(`payresult:${JSON.stringify(payresult)},orderinfo.triptype:${orderinfo.triptype}`);
            if(orderinfo.triptype === '充值'){
              yield put(queryuserbalance_request({}));
              const { response, timeout } = yield race({
                 response: take(`${serverpush_userbalance}`),
                 timeout: call(delay, 3000)
              });
              if(!!response){
                yield put(queryuserbalance_result(response.payload));
              }
            }
            else if(orderinfo.paytype === 'leftbalance'){
              //payresult为orderinfo
              yield put(triporder_updateone(payresult));
            }
            console.log(`返回到上一页面`);
            yield put(goBack());//返回上一页面
          }
    });


}
