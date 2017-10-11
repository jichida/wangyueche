let winston = require('../log/log.js');
const _ =  require('lodash');
const notifymessage_all = require('./common/notifymessage.js');

/*
topic:allpushmsg

topic:request.id+data<---通知司机端更新
{
    datafrom:'xxx'
    datatype:'request/order/requestandorder',
    triprequestid:xxx
    triporderid:xxx
    dataresult:{
     triprequest:xxx
     triporder:xxx
    }
}
*/
let updatecurrentrequestandorder =  (socket,ctx,data)=> {
    //更新当前请求&订单状态
    if(typeof ctx.curtriprequestid !== 'string'){
        ctx.curtriprequestid = ctx.curtriprequestid.toString();
    }
    if(typeof ctx.curtriporderid !== 'string'){
        ctx.curtriporderid = ctx.curtriporderid.toString();
    }
    if(data.hasOwnProperty('triprequestid')){
        if(typeof data.triprequestid !== 'string'){
            data.triprequestid = data.triprequestid.toString();
        }
    }
    if(data.hasOwnProperty('triporderid')){
        if(typeof data.triporderid !== 'string'){
            data.triporderid = data.triporderid.toString();
        }
    }


    if(data.datatype === 'request'){
        if(ctx.curtriprequestid === data.triprequestid) {
            let triprequest = data.dataresult.triprequest;
            ctx.curtriprequest = triprequest;
            socket.emit('serverpush_triprequest', {triprequest});
            winston.getlog().info('推送给app===>serverpush_triprequest');
        }
    }
    else if(data.datatype === 'order'){
        if(ctx.curtriporderid === data.triporderid) {
            let triporder = data.dataresult.triporder;
            ctx.curtriporder = triporder;
            socket.emit('serverpush_triporder', {triporder});
            winston.getlog().info('推送给app===>serverpush_triporder');
        }
    }
    else if(data.datatype === 'requestandorder') {
        if((ctx.curtriprequestid === data.triprequestid) && (ctx.curtriporderid === data.triporderid)) {
            let triprequest = data.dataresult.triprequest;
            ctx.curtriprequest = triprequest;
            let triporder = data.dataresult.triporder;
            ctx.curtriporder = triporder;
            socket.emit('serverpush_triprequestandorder', {
                triprequest,triporder
            });
            winston.getlog().info('推送给app===>serverpush_triprequestandorder');
        }
    }
    else if(data.datatype === 'orderprice'){
        if(ctx.curtriporderid === data.triporderid) {
            let realtimepricedetail = data.dataresult.realtimepricedetail;
            socket.emit('serverpush_orderprice', {realtimepricedetail,triporderid:data.triporderid});
            winston.getlog().info('推送给app价格');
        }
    }
    else if(data.datatype === 'driverlocation'){
        if(ctx.curtriporderid === data.triporderid) {
            let driverlocation = data.dataresult.driverlocation;
            socket.emit('serverpush_driverlocation', {driverlocation});
            winston.getlog().info('推送给app位置');
        }
    }

    winston.getlog().info('data.datatype:' + data.datatype);
    winston.getlog().info('data.curtriprequestid1?:' + ctx.curtriprequestid );
    winston.getlog().info('data.curtriprequestid2?:' + data.triprequestid);
    winston.getlog().info('data.datatype?:' + (data.datatype === 'requestandorder'));
    winston.getlog().info('data.curtriprequestid?:' + (ctx.curtriprequestid === data.triprequestid));
    winston.getlog().info('data.curtriporderid?:' + (ctx.curtriporderid === data.triporderid));

    if(data.datatype === 'request' || data.datatype === 'requestandorder'){
        //订单取消
        if(ctx.curtriprequestid === data.triprequestid) {//当前请求<--//请求中,已接单,待上车,已结束（已接单已到达视为已结束），已取消
            if (data.dataresult.triprequest.requeststatus === '已取消'
                ||data.dataresult.triprequest.requeststatus === '已结束') {//curtriprequestid,curtriporderid,curtriporder,curtriprequest
                ctx.curtriprequestid = '0';
                ctx.curtriporderid = '0';
                ctx.curtriporder = {};
                ctx.curtriprequest = {};
                if(ctx.usertype === 'driver'){
                  ctx.driverstatus = '未接单';
                }
                ctx.bizstatus = 3;//3 :空驶
            }
        }
    }
};

let driverupdatedrequest = (socket,ctx,data)=>{
    if(ctx.curtriprequestid === '0' && ctx.usertype === 'driver') {
        //未接单状态，取消请求
        if(data.datatype === 'request' || data.datatype === 'requestandorder'){
            if(data.dataresult.triprequest.requeststatus === '已取消'
                || data.dataresult.triprequest.requeststatus === '已接单' ){
                //从司机端中删除
                socket.emit('serverpush_nearbyrequests_removeone',data.dataresult.triprequest);
            }
        }
    }
}

let handlerrequest = (socket,ctx,data)=>{
    winston.getlog().info('处理请求数据:'+JSON.stringify(ctx));
    winston.getlog().info('处理请求数据:'+JSON.stringify(data));
    //更新当前请求&订单状态(司机端&乘客端通用）

    updatecurrentrequestandorder(socket,ctx,data);
    //司机端接收到来自乘客端请求的更新（取消，被接单）
    driverupdatedrequest(socket,ctx,data);
};


exports.usersubfn  = (socket,ctx)=>{
  ctx.userReqSubscriber = ( msg, data )=>{
      winston.getlog().info('r-->用户订阅请求,用户信息:'+JSON.stringify(ctx));
      winston.getlog().info('r-->用户订阅消息:'+msg);
      winston.getlog().info('r-->用户订阅数据:'+data);

      let topicsz = msg.split('.');
      if(topicsz.length === 2 && topicsz[0] === 'request'){
        if(data.datafromside !== ctx.usertype || data.datatype === 'orderprice'){
          handlerrequest(socket,ctx,data);
        }
      }
  };//for eachuser

  ctx.userUserSubscriber = ( msg, data )=>{
      winston.getlog().info('u-->用户订阅请求,用户信息:'+JSON.stringify(ctx));
      winston.getlog().info('u-->用户订阅消息:'+msg);
      winston.getlog().info('u-->用户订阅数据:'+data);

      let topicsz = msg.split('.');
      if(topicsz.length === 3 && topicsz[0] === 'user'){
        if(ctx.usertype === topicsz[1] && ctx.userid.toString() === topicsz[2]){
          //针对该user@
          let eventobj = data;
          let shouldsend = true;
          if(eventobj.cmd === 'serverpush_nearbyrequests_addone'){
            //特殊处理下,看是否已经发布过,没发布过就发布
            shouldsend = false;//默认不发送
            if(ctx.driverstatus === '未接单'){
              shouldsend = _.indexOf(ctx.nearbyrequestlist,eventobj.data._id) === -1;
              if(shouldsend){
                //发送推送消息
                notifymessage_all.pushnotifymessage({
                  messagetype:'driver',
                  driveruserid:ctx.userid,
                  messagetitle:notifymessage_all.getmsgtxt('getnewrequest',eventobj.data),
                  subtype:'map'
                });
              }
            }
          }

          if(shouldsend){
            socket.emit(eventobj.cmd,eventobj.data);
          }
        }
      }
  };//for eachuser
};
