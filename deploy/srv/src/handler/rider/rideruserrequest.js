let winston = require('../../log/log.js');
let PubSub = require('pubsub-js');
const config = require('../../config.js');
const moment = require('moment');
let DBModels = require('../../db/models.js');
const async = require('async');
const rr = require('./recharge.js');
const userlogin = require('./rideruserlogin');

const notifymessage_all = require('../common/notifymessage.js');

let starttriprequestorder = (socket,actiondata,ctx)=>{

  let datatriprequest = actiondata.triprequest;
  let dataorder = actiondata.order;
  datatriprequest.resultpricedetail = dataorder.resultpricedetail;
  datatriprequest.rideruserid = ctx.userid;
  datatriprequest.created_at = new Date();
  datatriprequest.createtime = moment().format('YYYY-MM-DD HH:mm:ss');
  if(!!datatriprequest.showtimestring){
    datatriprequest.showtimestring = moment().format('MM月DD日 HH:mm');
  }
  if(!datatriprequest.isrealtime){
    if(typeof datatriprequest.dated_at === 'string'){
      datatriprequest.dated_at =  new Date(Date.parse(datatriprequest.dated_at));
    }
  }
  datatriprequest.srclocation = [datatriprequest.srcaddress.location.lng,datatriprequest.srcaddress.location.lat];
  datatriprequest.dstlocation = [datatriprequest.dstaddress.location.lng,datatriprequest.dstaddress.location.lat];
  datatriprequest.requeststatus = '请求中';//请求中
  console.log("starttriprequest data:" + JSON.stringify(datatriprequest));
  let TripRequestModel = DBModels.TripRequestModel;
  let entitytriprequest = new TripRequestModel(datatriprequest);
  entitytriprequest.save((err,triprequest)=>{
    if(!err){
      let TripOrderModel = DBModels.TripOrderModel;
      dataorder.triprequest = triprequest._id;
      dataorder.rideruserid = triprequest.rideruserid;
      dataorder.triptype = triprequest.triptype;
      dataorder.ordertitle = triprequest.triptype + '订单';
      dataorder.created_at = new Date();
      dataorder.updated_at = new Date();
      dataorder.paystatus = '未支付';
      dataorder.srcaddress = triprequest.srcaddress;
      dataorder.dstaddress = triprequest.dstaddress;
      dataorder.isrealtime =  datatriprequest.isrealtime;
      dataorder.dated_at = triprequest.dated_at;
      dataorder.riderinfo = ctx.riderinfo;

      let entitytriporder = new TripOrderModel(dataorder);
      entitytriporder.save((err,triporder)=>{
        if(!err){
          ctx.curtriprequestid = triprequest._id;
          ctx.curtriporderid = triporder._id;
          ctx.curtriprequest = triprequest;
          ctx.curtriporder = triporder;
          //订阅这个请求
          PubSub.subscribe(`request.${triprequest._id}`, ctx.userReqSubscriber);

          socket.emit('starttriprequestorder_result',{
            triprequest:triprequest,
            triporder:triporder
          });
          //通知平台插入
          PubSub.publish('Platformmsgs', {
            action:'Insert',
            type:'Platform_orderCreate',
            payload:{
              triprequest:triprequest,
              triporder:triporder
            }
          });
        }
        else{
          socket.emit('common_err',{errmsg:err.message,type:'starttriprequestorder'});
        }
      });
    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'starttriprequestorder'});
    }
  });
}


exports.starttriprequestorder_request = (socket,actiondata,ctx)=>{
  let datatriprequest = actiondata.triprequest;
  let dataorder = actiondata.order;
  if(!!dataorder.resultpricedetail){
    if(dataorder.resultpricedetail.fareid === '' && datatriprequest.triptype !== '出租车'){
      socket.emit('common_err',{errmsg:'未设置运价',type:'starttriprequestorder'});
      return;
    }
  }
  else{
    socket.emit('common_err',{errmsg:'未获取到价格信息',type:'starttriprequestorder'});
    return;
  }

  if(datatriprequest.triptype === '代驾'){  //代驾判断余额是否充足
    //判断用户余额是否大于系统设置的余额（todo）
    let getsystemconfigfn = (callbackfn)=>{
        let dbModel = DBModels.SystemConfigModel;
        dbModel.findOne({},(err,systemconfig)=>{
            if(!err && !!systemconfig){
              callbackfn(null,{
                daijialeastbalance:systemconfig.daijialeastbalance,
                daijiacancelprice:systemconfig.daijiacancelprice,
              });
            }
            else{
              callbackfn(err,null);
            }
        });
    };
    let getuserbalancefn = (callbackfn)=>{
      let userModel = DBModels.UserRiderModel;
      userModel.findOne({_id:ctx.userid},(err,userEntity)=>{
        if(!err && !!userEntity){
          callbackfn(null,{
            balance:userEntity.balance,
          });
        }
        else{
          callbackfn(err,null);
        }

      });
    }
    let asyncfnsz = [];
    asyncfnsz.push(getsystemconfigfn);
    asyncfnsz.push(getuserbalancefn);

    async.parallel(asyncfnsz,(err,result)=>{
        if(!err){
          if(result[0].daijiacancelprice > result[1].balance){
            socket.emit('common_err',{errmsg:`用户余额${result[1].balance}元小于代驾取消金额${result[0].daijiacancelprice}元`,type:'starttriprequestorder'});
            return;
          }
          if(result[0].daijialeastbalance > result[1].balance){
            socket.emit('common_err',{errmsg:`用户余额${result[1].balance}元小于最少代驾金额${result[0].daijialeastbalance}元`,type:'starttriprequestorder'});
            return;
          }
          starttriprequestorder(socket,actiondata,ctx);
        }
        else{
          socket.emit('common_err',{errmsg:'获取不到余额或代驾设置',type:'starttriprequestorder'});
        }
    });
    return;
  }
  starttriprequestorder(socket,actiondata,ctx);

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

let paydaijiacancelprice =(socket,ctx,orderinfo)=>{
  if(orderinfo.triptype === '代驾' && !!orderinfo.driveruserid){
    //Accept with driver,but canceled by passenager.pay with leftbalance.
    dbModel = DBModels.SystemConfigModel;
    dbModel.findOne({},(err,systemconfig)=>{
        if(!err && !!systemconfig){
          systemconfig.daijiacancelprice= systemconfig.daijiacancelprice || 10;
          let userModel = DBModels.UserRiderModel;
          userModel.findOne({_id:ctx.userid},(err,targetuser)=>{
            if(targetuser.balance < systemconfig.daijiacancelprice){
              socket.emit('common_err', {errmsg:`用户余额不足,用户余额:${targetuser.balance},代驾取消价格:${systemconfig.daijiacancelprice}`,type:'canceltriprequestorder'});
              return;
            }
            rr.paywithleftbalance_daijiacancel(ctx,orderinfo,systemconfig,targetuser,(err,result)=>{
              if(!!err){
                socket.emit('common_err', {errmsg:JSON.stringify(err),type:'canceltriprequestorder'});
              }
              //send balance
              userlogin.queryuserbalance(socket,{},ctx);
            });
          });
        }
        else{
          socket.emit('common_err', {errmsg:`无法获取系统设置代驾取消价格`,type:'canceltriprequestorder'});
        }
    });

  }
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

        paydaijiacancelprice(socket,ctx,triporder);

        PubSub.publish(`request.${triprequest._id}`, {
          datafromside:ctx.usertype,
          datafrom:'乘客主动取消请求',
          datatype:'requestandorder',
          triprequestid:triprequest._id,
          triporderid:triporder._id,
          dataresult:{
            triprequest:triprequest,
            triporder:triporder,
            canceltypecode:actiondata.canceltypecode||1
          }//通知所有司机端更新该请求状态
        });

        if(!!triporder.driveruserid){
          notifymessage_all.pushnotifymessage({
            messagetype:'driver',
            driveruserid:triporder.driveruserid,
            messagetitle:notifymessage_all.getmsgtxt('cancelorderbyrider',ctx.driverinfo),
            messagecontent:`/orderdetail/${triporder._id}`,
            subtype:'order'
          });
        }


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
//===========================================================
//triprequestid,triporderid


// exports.handlegetnearestdrivers = (socket,actiondata,ctx)=>{
//   let param = actiondata;
//   if(ctx.hasOwnProperty(userid)){
//     param.userid = ctx.userid;
//   }
//   triprequest.getnearestdrivers(param,(issuc,result)=>{
//       console.log("getnearestdrivers=>" + JSON.stringify(result));
//       if(issuc){
//         socket.emit('action', {type:'mappagerequest_nearestdrivers', data:result});
//       }
//   });
// }
