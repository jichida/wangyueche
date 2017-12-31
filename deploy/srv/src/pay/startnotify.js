let DBModels = require('../db/models.js');
const _  = require('lodash');
const moment  = require('moment');
let notifypay = require('./notifypay');
let winston = require('../log/log.js');
const CryptoJS = require("crypto-js");
const globalpayparam = require('./payparam.js');
let PubSub = require('pubsub-js');
const crypto = require("crypto");
const fs = require('fs');
const alipaysigner = require('./alipay_signer.js');

/**
 *
 *
 * https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
 *
 * 支付完成后，微信会把相关支付结果和用户信息发送给商户，商户需要接收处理，并返回应答。
对后台通知交互时，如果微信收到商户的应答不是成功或超时，微信认为通知失败，微信会通过一定的策略定期重新发起通知，尽可能提高通知的成功率，但微信不保证通知最终能成功。 （通知频率为15/15/30/180/1800/1800/1800/1800/3600，单位：秒）
注意：同样的通知可能会多次发送给商户系统。商户系统必须能够正确处理重复的通知。
推荐的做法是，当收到通知进行处理时，首先检查对应业务数据的状态，判断该通知是否已经处理过，如果没有处理过再进行处理，如果处理过直接返回结果成功。在对业务数据进行状态检查和处理之前，要采用数据锁进行并发控制，以避免函数重入造成的数据混乱。
特别提醒：商户系统对于支付结果通知的内容一定要做签名验证,并校验返回的订单金额是否与商户侧的订单金额一致，防止数据泄漏导致出现“假通知”，造成资金损失。
 *
 *
 *
 */
 let setordersuccessandnotify = (order,fncallback)=>{
   fncallback({
     type:'rider',
     cmd:'serverpush_triporder',
     data:{triporder:order}
   });

   if(order.triptype === '快车' ||
   order.triptype === '出租车' ||
   order.triptype === '代驾'){
     if(!!order.driveruserid){
       fncallback({
         type:'driver',
         cmd:'serverpush_triporder',
         data:{triporder:order}
       });
     }
   }

   let userModel = DBModels.UserRiderModel;
   userModel.findOne({_id:order.rideruserid},(err,targetuser)=>{
     if(!err && !!targetuser){
       const ordercallback = require('../handler/rider/ordercallback');
       ordercallback.ordersuccess(order,targetuser,fncallback);
     }
   });
 }

let setorderpaid = (out_trade_no)=>{
  let dbModel = DBModels.TripOrderModel;
  console.log(`alipaytest====>${out_trade_no}`);
  dbModel.findOne({out_trade_no: out_trade_no},(err,orderinfo)=>{
      if(!err && !!orderinfo){
          let orderid = orderinfo._id;
          let updatedpaydata = {
               orderstatus : '已支付',
               paystatus: '已支付',
               pay_at:moment().format('YYYY-MM-DD HH:mm:ss')
          };

          if(orderinfo.triptype === '充值'){
            updatedpaydata.orderstatus = '已充值';
            dbModel.findOneAndUpdate({
                _id: orderid,
                paystatus: { $ne: '已支付' }
            },{$set:updatedpaydata}, {new: true}, (err, updateditem)=> {
              if(!err && !!updateditem){
                setordersuccessandnotify(updateditem,(eventobj)=>{
                  console.log(`eventobj========>${JSON.stringify(eventobj)}`);
                  PubSub.publish(`user.rider.${updateditem.rideruserid}`,eventobj);
                });
                //PubSub.publish(`order.${updateditem.creator}`,updateditem);
              }
            });
            return;//充值单独处理
          }

          dbModel.findOneAndUpdate({
                _id: orderid,
                paystatus: { $ne: '已支付' }
            },{$set:updatedpaydata}, {new: true}, (err, updateditem)=> {
              if(!err && !!updateditem){
                setordersuccessandnotify(updateditem,(eventobj)=>{
                  if(eventobj.type === 'rider'){
                    PubSub.publish(`user.rider.${updateditem.rideruserid}`,eventobj);
                  }
                  else if(eventobj.type=== 'driver'){
                    PubSub.publish(`user.driver.${updateditem.driveruserid}`,eventobj);
                  }
                  else{
                    PubSub.publish(`user.rider.${updateditem.rideruserid}`,eventobj);
                    PubSub.publish(`user.driver.${updateditem.driveruserid}`,eventobj);
                  }
                });

              }
             else if(err){
                winston.getlog().error(`修改我的订单失败:${err.message}`);
              }
          });//
        }
    });//dbModel.findOne
}



  //   let postdata =
  //   {
  //         "appid":"wx59d5d49c9d5f47df",
  //         "attach":"测试数据",
  //         "bank_type":"CMB_CREDIT",
  //         "cash_fee":"1",
  //         "fee_type":"CNY",
  //         "is_subscribe":"N",
  //         "mch_id":"1286763701",
  //         "nonce_str":"jtl67d74kxdxj7ym0bg8b3b435k4fsdr",
  //         "openid":"o22U5xFzZ_0i76KGm7xgQpuyb7wk",
  //         "out_trade_no":"58f4294791a7d1099977075f",
  //         "result_code":"SUCCESS",
  //         "return_code":"SUCCESS",
  //         "sign":"628C89C28CAF423CC708C5F4B0C63B1B",
  //         "time_end":"20170417103248",
  //         "total_fee":"1",
  //         "trade_type":"APP",
  //         "transaction_id":"4004932001201704177306553849"
  // };
let startmodule = (app)=>{
  app.post('/pay/weixin',notifypay.notifywexin((msg, req, res, next)=>{
      winston.getlog().warn(`这里处理！接收到微信支付回调:${JSON.stringify(msg)}`);

      let payobj = globalpayparam.weixin;
      if(msg.appid !== payobj.appid || msg.mch_id !== payobj.mch_id){
          winston.getlog().warn(`${msg.appid}-->${payobj.appid}${msg.mch_id}${payobj.mch_id}`);
          res.end('fail');
          return;
      }

      if(msg.return_code !== 'SUCCESS'){
          res.end('fail');
          return;
      }

      let param = msg;
      let querystring = Object.keys(param).filter((key)=>{
          return param[key] !== undefined && param[key] !== '' && ['pfx', 'partner_key', 'sign', 'key'].indexOf(key) < 0;
        }).sort().map((key)=>{
          return key + '=' + param[key];
       }).join("&") + "&key=" + payobj.keystring;

     let checkedsign = CryptoJS.MD5(querystring).toString().toUpperCase();
     if(checkedsign !== param.sign){
         //验证key成功！
         winston.getlog().warn(`${checkedsign}|${param.sign}`);
         res.end('fail');
         return;
     }

    //处理订单支付消息
    let orderid = msg.out_trade_no;
    setorderpaid(orderid);
    res.end('success');
  }));
//====================================================================
  app.post('/pay/alipaytest',(req,res)=>{
    let msg = req.body;
    let orderid = msg.out_trade_no;
    setorderpaid(orderid);
    res.status(200).json({
      paid:true,
    });
  });//app.post('/pay/alipaytest',(req,res)=>{
//====================================================================
  app.post('/pay/alipay',notifypay.notify_alipay((msg, req, res, next)=>{
     winston.getlog().warn(`这里处理！接收到支付宝回调:${JSON.stringify(msg)}`);
     console.log(`==>${JSON.stringify(msg)}`);
     if(msg.trade_status === 'TRADE_SUCCESS'){
       let payobj = globalpayparam.alipay;
       if(msg.seller_id !== payobj.partner || msg.seller_email !== payobj.seller_id){
           //这个判断好坑
           winston.getlog().warn(`${msg.seller_id}${payobj.partner}${msg.seller_email}${payobj.seller_id}`);
           res.end('fail');
           return;
       }

       {
         console.log(`==>原始数据<===`);
         var keys = Object.keys(msg).sort();
         var prestr = [];
         keys.forEach(function (e) {
             prestr.push(e+'='+msg[e]);
         });
         prestr = prestr.join('&');
         winston.getlog().warn(`==>原始数据<===:${prestr}`);
         console.log(`==>${prestr}`);
       }

       const result = alipaysigner.verifyAlipaySign(msg);
       console.log(`==>result:${result}<===`);
       if(!result){
         winston.getlog().warn(`==>验证失败找原因啊<===:${prestr}`);
       }
       else{
         winston.getlog().warn(`==>验证成功啦<===:${prestr}`);
       }
       let orderid = msg.out_trade_no;
       setorderpaid(orderid);
     }
      res.end('success');
  }));

}

module.exports=  startmodule;
//
// let base64toPem =(base64)=>
// {
//   for(var result="", lines=0;result.length-lines < base64.length;lines++) {
//     result+=base64.substr(result.length-lines,64)+"\n"
//   }
//   return "-----BEGIN PUBLIC KEY-----\n" + result + "-----END PUBLIC KEY-----";
// }
//
// let test = ()=>{
//   let payobj = globalpayparam.alipay;
//   // let msg =
//   // {
//   //   "discount":"0.00",
//   //   "payment_type":"1",
//   //   "subject":"旅游大巴订单",
//   //   "trade_no":"2017061221001004110205933772",
//   //   "buyer_email":"xiaoqingwang@126.com",
//   //   "gmt_create":"2017-06-12 16:18:26",
//   //   "notify_type":"trade_status_sync",
//   //   "quantity":"1",
//   //   "out_trade_no":"593e4e41c9131303d0d0aaf2",
//   //   "seller_id":"2088621524129196",
//   //   "notify_time":"2017-06-12 16:42:43",
//   //   "body":"旅游大巴订单100元",
//   //   "trade_status":"WAIT_BUYER_PAY",
//   //   "is_total_fee_adjust":"Y",
//   //   "total_fee":"0.01",
//   //   "seller_email":"1307868760@qq.com",
//   //   "price":"0.01",
//   //   "buyer_id":"2088002017478113",
//   //   "notify_id":"7a3bdbf233e6b4207998b961bb41e73gum",
//   //   "use_coupon":"N",
//   //   "sign_type":"RSA",
//   //   "sign":"JfH0bCynqL1w5Wdmh7noj8l544TLLm8ZVj/BfDliEefBBgqKyDnD8jK6ZMzhJdKu2vcki2jETSq4nU1PWjCiJo0N+34cTjWG99pF4dLWCgIRsQHcvrm1a2DznLd4n5ek7LygAGRJU8/djJr64iKkcQdd840geN8NVkN7enW7EBU="
//   // };
//
//   const msg = { total_amount: '0.01',
//       buyer_id: '2088102017182972',
//       trade_no: '2017012121001004970266746517',
//       body: '描述',
//       notify_time: '2017-01-21 17:30:44',
//       subject: 'nodejs实战',
//       sign_type: 'RSA',
//       buyer_logon_id: 'ram***@gmail.com',
//       auth_app_id: '2016101002076612',
//       charset: 'utf-8',
//       notify_type: 'trade_status_sync',
//       invoice_amount: '0.01',
//       out_trade_no: '14849910336269548',
//       trade_status: 'TRADE_SUCCESS',
//       gmt_payment: '2017-01-21 17:30:44',
//       version: '1.0',
//       point_amount: '0.00',
//       sign: 'Plk792sKMypBAViKW2QzAwEJKBJmQixx4eWyW777NDBsojEXLBQ56krkXJ8DfwXCjo6fX9Op3ZgLUGH8sIRmi6uOyp+l6Md8mYRaoO+edWY0gXTm7cH05fXFjystzN1ljMvuPqJ99lAlLvqmSenyXlhZ5zAmfoHtj00lDeYbtnE=',
//       gmt_create: '2017-01-21 17:30:43',
//       buyer_pay_amount: '0.01',
//       receipt_amount: '0.01',
//       fund_bill_list: '[{"amount":"0.01","fundChannel":"ALIPAYACCOUNT"}]',
//       app_id: '2016101002076612',
//       seller_id: '2088221872110871',
//       notify_id: 'c1757296faa70e7a943bb6105d5f705nhi',
//       seller_email: '1144709265@qq.com' };
//   {
//     console.log(`==>原始数据<===`);
//     var keys = Object.keys(msg).sort();
//     var prestr = [];
//     keys.forEach(function (e) {
//         prestr.push(e+'='+msg[e]);
//     });
//     prestr = prestr.join('&');
//     console.log(`==>${prestr}`);
//   }
//
//   const result = alipaysigner.verifyAlipaySign(msg);
//   if(!result){
//     console.log(`==>找原因啊！<===`);
//   }
//   else{
//     console.log(`==>成功啦！<===`);
//   }
//
// }
//
// test();
