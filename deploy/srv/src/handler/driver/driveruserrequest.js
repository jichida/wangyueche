let PubSub = require('pubsub-js');
const triprequestmo = require('../common/triprequest.js');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const order = require('./orders.js');
let DBModels = require('../../db/models.js');
const price = require('../common/price');
const geolib = require('geolib');
const async = require('async');
const _ = require('lodash');

const notifymessage_all = require('../common/notifymessage.js');

let getdistance =(fromlocation,tolocation)=>{
    let distance = geolib.getDistance(
        {latitude: fromlocation[1], longitude: fromlocation[0]},
        {latitude: tolocation[1], longitude: tolocation[0]}
    );
    return distance;
}
// ctx.realtimeprice = {
//     fareid:ctx.fareid,
//     totaldistance:0,
//     totalduring:0,
//     totalprice:0,
//     starttime:datenow,
//     lastlocationtime:datenow,
//     lastlocation:actiondata.curlocation,
//     driverrouteingrealtime
// };
let calcpriceanddistance = (ctx,curlocation,forceupdate=false)=>{
    let ctxrealtimeprice = ctx.realtimeprice;
    let distance = getdistance(ctxrealtimeprice.lastlocation,curlocation);
    let datenow = new Date();
    let difftime = (datenow.getTime() - ctxrealtimeprice.lastlocationtime.getTime())/1000;
    if(distance > 50 || difftime > 10 || forceupdate){
        //50米或10秒保存一次
        ctxrealtimeprice.totaldistance += distance;
        ctxrealtimeprice.totalduring += difftime;

        ctxrealtimeprice.lastlocationtime = datenow;
        ctxrealtimeprice.lastlocation = curlocation;

        price.getBaseInfoCompanyFare({
            distance:ctxrealtimeprice.totaldistance,
            during:ctxrealtimeprice.totalduring,
            curtime:ctxrealtimeprice.starttime,
            fareid:ctxrealtimeprice.fareid
        },(err,realtimepricedetail)=> {

            let TripOrderModel = DBModels.TripOrderModel;
            TripOrderModel.findOneAndUpdate({_id: ctx.curtriporderid},
                {
                    $set: {
                        realtimepricedetail,
                        ctxrealtimeprice,
                        updated_at: new Date(),
                        driverlocation: curlocation,
                        orderprice:realtimepricedetail.price,
                    }
                }, {new: true}, (err, triporder)=> {
                    if (!err && triporder) {
                        //从性能考虑，只publish价格部分
                        PubSub.publish(`request.${ctx.curtriprequestid}`, {
                            datafromside:ctx.usertype,
                            datafrom:'定时订单价格',
                            datatype:'orderprice',
                            triporderid:ctx.curtriporderid,
                            dataresult:{
                                triporderid:ctx.curtriporderid,
                                realtimepricedetail,
                            }//通知乘客更新状态
                        });
                    }

                });//findOneAndUpdate
        });//getBaseInfoCompanyFare
    }
}

exports.sendcurlocationtoserver = (socket,actiondata,ctx)=>{
  if(ctx.approvalstatus === '已审核'){
    let param = {
      driverlocation:actiondata.driverlocation,
      userid:ctx.userid,
      registertype:ctx.registertype
    };

    if(ctx.driverstatus === '未接单'){
      triprequestmo.getnearbyrequests(param,(issuc,list)=>{
          winston.getlog().info("sendcurlocationtoserver issuc===>" + issuc);
          winston.getlog().info("sendcurlocationtoserver list===>" + JSON.stringify(list));
          if(issuc){
            PubSub.unsubscribe( ctx.userReqSubscriber );//清除所有请求
            ctx.nearbyrequestlist = [];
            _.map(list,(reqobj)=>{
               ctx.nearbyrequestlist.push(reqobj._id);
               PubSub.subscribe(`request.${reqobj._id}`, ctx.userReqSubscriber);
               winston.getlog().info("订阅请求=>" + 'request.' + reqobj._id);
            });
            socket.emit('serverpush_nearbyrequests',{list});
          }
      });
    }
    else if(ctx.driverstatus === '已接单'){
    }
    //??????????????????????????????????????????????????
    //如果是进行中的订单，则需要动态修改价格和里程（todo）
      if(!!ctx.realtimeprice){
          calcpriceanddistance(ctx,param.driverlocation);
      }
      //??????????????????????????????????????????????????
      if(!!ctx.curtriprequestid ){
        if(ctx.curtriprequestid != '' && ctx.curtriprequestid != '0'){
          PubSub.publish(`request.${ctx.curtriprequestid}`, {
              datafromside:ctx.usertype,
              datafrom:'定时司机位置',
              datatype:'driverlocation',
              triporderid:ctx.curtriporderid,
              dataresult:{
                  driverlocation:param.driverlocation,
              }//通知乘客更新状态
          });
        }
      }

    //===========插入平台的处理===========
        let postdata = {
              vehicleno: ctx.driverinfo.VehicleNo,
              licenseld: ctx.driverinfo.Licenseld,
              vehicleregioncode:ctx.driverinfo.VehicleRegionCode,
              riverregioncode:actiondata.DriverRegionCode,//注:DriverRegionCode由参数发送过来<--------------------------------
              driverlocation: actiondata.driverlocation,//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
              bizstatus:ctx.bizstatus,//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
              triporderid:ctx.curtriporderid,
              triprequestid:ctx.curtriprequestid,
          };
          //通知平台插入
          PubSub.publish('Platformmsgs', {
              action:'Insert',
              type:'Platform_positionDriver',
              payload:postdata
          });
          //通知平台插入
          PubSub.publish('Platformmsgs', {
              action:'Insert',
              type:'Platform_positionVehicle',
              payload:postdata
          });
      }

}

exports.acceptrequest = (socket,actiondata,ctx)=>{
  let param = actiondata;
  param.driveruserid= ctx.userid;
  param.driverinfo = ctx.driverinfo;
  param.requeststatus = '已接单';
  let TripRequestModel = DBModels.TripRequestModel;
  TripRequestModel.findOneAndUpdate({_id:param._id,requeststatus:'请求中'},{$set:param},{new: true},(err,triprequest)=>{
    winston.getlog().info("acceptrequest err===>" + JSON.stringify(err));
    winston.getlog().info("acceptrequest triprequest===>" + JSON.stringify(triprequest));

    if(!err && triprequest){
      let TripOrderModel = DBModels.TripOrderModel;
      TripOrderModel.findOneAndUpdate({triprequest:triprequest._id},
          {$set:{driverinfo:ctx.driverinfo,driveruserid:ctx.userid,updated_at:new Date(),driverlocation:param.driverlocation}},{new: true},(err,triporder)=>{
        winston.getlog().info("acceptrequest err===>" + JSON.stringify(err));
        winston.getlog().info("acceptrequest triporder===>" + JSON.stringify(triporder));

        if(!err && triporder){
            //设置上下文
          ctx.fareid = triporder.resultpricedetail.fareid;
          ctx.curtriporderid = triporder._id;
          ctx.curtriprequestid=triprequest._id;

          ctx.driverstatus = '已接单';
          ctx.bizstatus = 2;//2.接单

          PubSub.unsubscribe( ctx.userReqSubscriber );//清除所有请求
          PubSub.subscribe(`request.${triprequest._id}`, ctx.userReqSubscriber);

          socket.emit('acceptrequest_result',{
            triprequest:triprequest,
            triporder:triporder
          });

          PubSub.publish(`request.${triprequest._id}`, {
            datafromside:ctx.usertype,
            datafrom:'司机主动接单',
            datatype:'requestandorder',
            triprequestid:triprequest._id,
            triporderid:triporder._id,
            dataresult:{
              triprequest:triprequest,
              triporder:triporder
            }//通知乘客更新状态
          });

          notifymessage_all.pushnotifymessage({
            messagetype:'rider',
            rideruserid:triporder.rideruserid,
            messagetitle:notifymessage_all.getmsgtxt('acceptorder',ctx.driverinfo),
            subtype:'map'
          });
          //通知平台插入
          PubSub.publish('Platformmsgs', {
            action:'Insert',
            type:'Platform_orderMatch',
            payload:{
              triprequest:triprequest,
              triporder:triporder
            }
          });
        }
        else{
          socket.emit('common_err',{errmsg:err.message,type:'acceptrequest'});
        }

      });
    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'acceptrequest'});
    }
  });
}


exports.updaterequeststatus = (socket,actiondata,ctx)=>{
  let param = actiondata;
  let TripRequestModel = DBModels.TripRequestModel;
  let datenow = new Date();
  let updatedorder = {
      updated_at:datenow,
      driverlocation:actiondata.driverlocation
  };
  let updatedrequest = {
      requeststatus:param.requeststatus,
      driverlocation:actiondata.driverlocation
  };
  if(actiondata.requeststatus === "行程中") {
      ctx.bizstatus = 1;//1:载客
      updatedrequest.getindate_at = datenow;//上车时间
      updatedrequest.getinlocation = actiondata.driverlocation;//上车位置
      updatedorder.orderstatus = '待支付';//该状态不能被取消
      updatedorder.getindate_at = datenow;//上车时间
      updatedorder.getinlocation = actiondata.driverlocation;//上车位置
      ctx.realtimeprice = {
          fareid:ctx.fareid,
          totaldistance:0,
          totalduring:0,
          totalprice:0,
          starttime:datenow,
          lastlocationtime:datenow,
          lastlocation:actiondata.driverlocation,
      };
      calcpriceanddistance(ctx,actiondata.driverlocation,true);
  }
  else if(actiondata.requeststatus === "行程完成") {
      ctx.bizstatus = 3;//3 :空驶
      updatedrequest.getoffdate_at = datenow;//下车时间
      updatedrequest.getofflocation = actiondata.driverlocation;//下车位置
      updatedorder.getoffdate_at = datenow;//上车时间
      updatedorder.getofflocation = actiondata.driverlocation;//下车位置
      //<------动态计算价格，然后设置ctx.realtimeprice为空
      //注意：仍需监听支付消息!!!!!<--user..
      calcpriceanddistance(ctx,actiondata.driverlocation,true);
  }
  TripRequestModel.findOneAndUpdate({_id:param.triprequestid},{$set:updatedrequest},{new: true}, (err,triprequest)=>{
    if(!err && !!triprequest){
      if(triprequest.requeststatus === "行程中" || triprequest.requeststatus === "行程完成") {
          let TripOrderModel = DBModels.TripOrderModel;
          TripOrderModel.findOneAndUpdate({_id: param.triporderid}, {$set: updatedorder}, {new: true}, (err, triporder)=> {
                  if (!err && !!triporder) {
                      socket.emit('updaterequeststatus_result', {triprequest, triporder});
                      PubSub.publish(`request.${triprequest._id}`, {
                          datafromside:ctx.usertype,
                          datafrom: `司机更新状态(${triprequest.requeststatus})`,
                          datatype: 'requestandorder',
                          triprequestid: triprequest._id,
                          triporderid: triporder._id,
                          dataresult: {
                              triprequest: triprequest,
                              triporder: triporder
                          }//通知乘客更新状态
                      });
                      if(triprequest.requeststatus === "行程完成"){
                        ctx.driverstatus = '未接单';
                        delete ctx.realtimeprice;
                        ctx.fareid ='0';
                        ctx.curtriporderid ='0';
                        ctx.curtriprequestid='0';

                        notifymessage_all.pushnotifymessage({
                          messagetype:'rider',
                          rideruserid:triporder.rideruserid,
                          messagetitle:notifymessage_all.getmsgtxt('tripordertopay',ctx.driverinfo),
                          messagecontent:`/orderdetail/${triporder._id}`,
                          subtype:'order'
                        });
                      }
                      //通知平台插入
                      let platformtype = triprequest.requeststatus === "行程中"?'Platform_operateDepart':'Platform_operateArrive';
                      PubSub.publish('Platformmsgs', {
                          action: 'Insert',
                          type: platformtype,
                          payload: {
                              triprequest: triprequest,
                              triporder: triporder
                          }
                      });
                  }
                  else {
                      socket.emit('common_err', {errmsg: err.message,type:'updaterequeststatus'});
                  }
              });
      }//if(triprequest.requeststatus === "行程中" || triprequest.requeststatus === "行程完成") {
      else{
          socket.emit('updaterequeststatus_result', {triprequest});

          PubSub.publish(`request.${triprequest._id}`, {
            datafromside:ctx.usertype,
            datafrom: '司机更新状态',
            datatype: 'request',
            triprequestid: triprequest._id,
            dataresult: {
              triprequest: triprequest
            }//通知乘客更新状态
          });
        }
      }//if(!err && triprequest){
      else{
          socket.emit('common_err',{errmsg:err.message,type:'updaterequeststatus'});
      }
  });
}



//===========================================================
let getfn_cancelorder =(socket,actiondata,ctx)=>{
    return ((callbackfn)=>{
      let param = actiondata;
      let TripOrderModel = DBModels.TripOrderModel;
      TripOrderModel.findOneAndUpdate({
        _id:param.triporderid,
        orderstatus:{ '$nin': ['待支付','已支付','已取消'] }
      },{$set:{orderstatus:'已取消',updated_at:new Date()}},{new: true},(err,triporder)=>{
        if(!err){
          callbackfn(null,triporder);
        }
        else{
          callbackfn(err,null);
        }
      });
    });
}

let getfn_cancelrequest = (socket,actiondata,ctx)=>{
  return ((callbackfn)=>{
    let param = actiondata;
    let TripRequestModel = DBModels.TripRequestModel;
    TripRequestModel.findOneAndUpdate({
      _id:param.triprequestid,
      requeststatus:{ '$nin': ['行程中','行程完成','已取消'] }
    },{$set:{requeststatus:'已取消',updated_at:new Date()}},{new: true},(err,triprequest)=>{
      if(!err){
        callbackfn(null,triprequest);
      }
      else{
        callbackfn(err,null);
      }
    });
  });
}

exports.canceltriprequestorder_request =(socket,actiondata,ctx)=>{
  let asyncfnsz = [];
  asyncfnsz.push(getfn_cancelorder(socket,actiondata,ctx));
  asyncfnsz.push(getfn_cancelrequest(socket,actiondata,ctx));
  async.parallel(asyncfnsz,(err,result)=>{
    if(!err){
      let triporder = result[0];
      let triprequest = result[1];

      if(!!triporder && !!triprequest){
        socket.emit('canceltriprequestorder_result',{triporder:triporder,triprequest:triprequest});

        PubSub.publish(`request.${triprequest._id}`, {
          datafromside:ctx.usertype,
          datafrom:'司机主动取消请求',
          datatype:'requestandorder',
          triprequestid:triprequest._id,
          triporderid:triporder._id,
          dataresult:{
            triprequest:triprequest,
            triporder:triporder,
            canceltypecode:actiondata.canceltypecode||2
          }//通知所有司机端更新该请求状态
        });

        notifymessage_all.pushnotifymessage({
          messagetype:'rider',
          rideruserid:triporder.rideruserid,
          messagetitle:notifymessage_all.getmsgtxt('cancelorderbydriver',ctx.driverinfo),
          subtype:'map'
        });
        //取消后不再监听！！
        ctx.bizstatus = 3;//3 :空驶
        ctx.driverstatus = '未接单';
        ctx.curtriprequestid = '0';
        ctx.curtriporderid = '0';
        ctx.curtriprequest = {};
        ctx.curtriporder = {};

        winston.getlog().info("发布请求=>request." + triprequest._id);
        //通知平台插入
        PubSub.publish('Platformmsgs', {
          action:'Insert',
          type:'Platform_orderCancel',
          payload:{
            triprequest:triprequest,
            triporder:triporder
          }
        });
      }
      else{
        const commtripr = require('../common/triprequest.js');
        commtripr.pushtriporder(socket,actiondata.triporderid);
        socket.emit('common_err',{errmsg:'该订单无法取消',type:'canceltriprequestorder'});
      }

    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'canceltriprequestorder'});
    }
  });
}
