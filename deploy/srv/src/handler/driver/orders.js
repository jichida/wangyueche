const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose  = require('mongoose');
let PubSub = require('pubsub-js');
const winston = require('../../log/log.js');
const notifymessage_all = require('../common/notifymessage.js');

let getorderdetail_command =(socket,actiondata,ctx,commandstring)=>{
  let isvaild = false;
  if(!!actiondata.query){
    if(!!actiondata.query._id){
      isvaild = true;
    }
  }

  if(!isvaild){
    socket.emit('common_err',{errmsg:`参数错误,必须包含query以及_id`,type:`${commandstring}`});
    return;
  }

  let orderModel = DBModels.TripOrderModel;
  if(typeof actiondata.query._id === 'string'){
    actiondata.query._id = mongoose.Types.ObjectId(actiondata.query._id);
  }
  actiondata.query.driveruserid = ctx.userid;

  dbModel.findOne(actiondata.query,(err,triporder)=>{
    if(!err && !!triporder){
        socket.emit(`${commandstring}_result`,{triporder});
    }
    else{
      socket.emit('common_err',{errmsg:`找不到符合条件的订单,query:${JSON.stringify(actiondata.query)}`,type:`${commandstring}`});
    }
  });

}
exports.getorderdetail = (socket,actiondata,ctx)=>{
  getorderdetail_command(socket,actiondata,ctx,'getorderdetail');
}

exports.queryorder =  (socket,actiondata,ctx)=>{
  const commtripr = require('../common/triprequest.js');
  commtripr.pushtriporder(socket,actiondata.triporderid);
}

exports.getorderroute = (socket,payloadata,ctx)=>{
}


exports.payorderwithcash = (socket,actiondata,ctx)=>{
  let isvaild = !!actiondata.query;
  if(!isvaild){
    socket.emit('common_err',{errmsg:`参数错误,必须包含query`,type:`payorderwithcash`});
    return;
  }
  let orderModel = DBModels.TripOrderModel;
  let payload = {
      paytype: "cash",
      orderstatus : '已支付',
      paystatus: '已支付',
      pay_at:new Date(),
  };
  //payload.realprice = payload.realprice;
  if(typeof actiondata.query._id === 'string'){
    actiondata.query._id = mongoose.Types.ObjectId(actiondata.query._id);
  }
  actiondata.query.driveruserid = ctx.userid;
  console.log(`查询条件:${JSON.stringify(actiondata.query)}`);
  console.log(`更新:${JSON.stringify(payload)}`);
  orderModel.findOneAndUpdate(actiondata.query,{$set:payload},{new: true},(err,triporder)=>{
      if(!err){
        if(!!triporder){
          winston.getlog().info(`更新订单:(${JSON.stringify(triporder)})`);
          socket.emit('payorderwithcash_result',{triporder});
          //通知乘客更新订单状态
          PubSub.publish(`user.rider.${triporder.rideruserid}`, {
            cmd:'serverpush_triporder',
            data:{triporder}
          });

          notifymessage_all.pushnotifymessage({
            messagetype:'rider',
            rideruserid:triporder.rideruserid,
            messagetitle:notifymessage_all.getmsgtxt('payorderwithcash',ctx.driverinfo),
            messagecontent:`/orderdetail/${triporder._id}`,
            subtype:'order'
          });

          //功能缺失！
          //   PubSub.publish('Platformmsgs', {
          //     action:'Insert',
          //     type:'Platform_ratedDriver',
          //     payload:{
          //       triporderid:triporder._id,
          //       scoreservice:triporder.ratedriverinfo.ratenum,
          //       detail:triporder.ratedriverinfo.comment
          //     }
          // });
        }
        else{
          socket.emit('common_err',{errmsg:`找不到相应的订单:${JSON.stringify(actiondata)}`,title:'支付',type:'payorderwithcash'});
        }
      }
      else {
          socket.emit('common_err',{errmsg:`订单更新错误${JSON.stringify(err)}`,title:'支付',type:'payorder'});
      }
  });
}

exports.getmytriporders = (socket,actiondata,ctx)=>{
  let orderModel = DBModels.TripOrderModel;
  let query = actiondata.query;
  if(ctx.usertype === 'rider'){
    socket.emit('common_err',{errmsg:`仅司机端有效`,type:'getmytriporders'});
    return;
  }
  else if(ctx.usertype === 'driver'){
    query.driveruserid = ctx.userid;
  }
  actiondata.options.populate = [
    {path:'triprequest', select:'srcaddress dstaddress'},
  ];
  orderModel.paginate(query,actiondata.options,(err,result)=>{
    if(!err){
      socket.emit('getmytriporders_result',{result});
    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'getmytriporders'});
      winston.getlog().error(`获取到我的订单失败${err.message}`);
    }
  });
}



let updateorder = (socket,actiondata,ctx)=>{
  let orderModel = DBModels.TripOrderModel;
  let order = actiondata;
  if(ctx.usertype === 'rider'){
    order.rideruserid = ctx.userid;
  }
  else if(ctx.usertype === 'driver'){
    order.driveruserid = ctx.userid;
    socket.emit('common_err',{errmsg:`仅乘客端有效`,type:'getmytriporders'});
  }
  orderModel.findOneAndUpdate(actiondata.query,{$set:actiondata.data},{new: true},(err,triporder)=>{
    if(!err && triporder){
      socket.emit('updateorder_result',{triporder:triporder});
      if(actiondata.triptype === '拼车' || actiondata.triptype === '旅游大巴' || actiondata.triptype === '充值'){

      }
      else{
        if(ctx.usertype === 'rider' && !!triporder.driveruserid){
          PubSub.publish(`user.driver.${triporder.driveruserid}`, {
            cmd:'serverpush_triporder',
            data:{triporder}
          });
        }
        else if(ctx.usertype === 'driver' && !!triporder.rideruserid){
          PubSub.publish(`user.rider.${triporder.rideruserid}`, {
            cmd:'serverpush_triporder',
            data:{triporder}
          });
        }
      }
    }
    else{
      socket.emit('common_err',{errmsg:`更新订单失败(${err.message})`,type:'updateorder'});
      winston.getlog().error(`更新订单失败(${err.message})`);
    }
  });
}


let updateorder_comment = (socket,actiondata,ctx)=>{
  // rateriderinfo:Schema.Types.Mixed, //对乘客评价,评级、评价时间、评论
  // ratedriverinfo:Schema.Types.Mixed,//对司机评价,评级、评价时间、评论
  if(ctx.usertype === 'rider'){
      socket.emit('common_err',{errmsg:`仅司机端有效`,type:'getmytriporders'});
      return;

  }
  else if(ctx.usertype === 'driver'){
    if(!actiondata.data.rateriderinfo.hasOwnProperty('created_at')){
      actiondata.data.rateriderinfo.created_at = new Date();
    }
  }
  let orderModel = DBModels.TripOrderModel;
  let order = actiondata;
  orderModel.findOneAndUpdate(actiondata.query,{$set:actiondata.data},{new: true},(err,orderEntity)=>{
    if(!err && orderEntity){
      //socket.emit('action', {type:'orderdetailpage_orderinfo', data:orderEntity});
      socket.emit('updateorder_comment_result',orderEntity);
      // targetid:String,//被评价人
      // driverid:String,
      // riderid:String,
      // ratestar:Number,
      // orderid:String,
      // comment:String,
      // created_at:Date,
      let rateobj = {
        driverid:orderEntity.driveruserid,
        riderid:orderEntity.rideruserid,
        orderid:orderEntity._id,
        created_at:new Date()
      };
      if(ctx.usertype === 'rider'){//通知司机已评论
        rateobj.targetid = orderEntity.driveruserid;
        rateobj.ratestar = orderEntity.ratedriverinfo.ratenum;
        rateobj.comment = orderEntity.ratedriverinfo.comment;
      }
      else if(ctx.usertype === 'driver'){//通知乘客已评论
        rateobj.targetid = orderEntity.rideruserid;
        rateobj.ratestar = orderEntity.rateriderinfo.ratenum;
        rateobj.comment = orderEntity.rateriderinfo.comment;
      }
      //插入一条rate记录
      let rateModel = DBModels.RateModel;
      let entity = new rateModel(rateobj);
      entity.save((err,result)=>{
        if(!err && result){
          //=================publish出去=================
          let triporder = orderEntity;

          if(ctx.usertype === 'rider' && !!triporder.driveruserid){
            PubSub.publish(`user.driver.${triporder.driveruserid}`, {
              cmd:'serverpush_triporder',
              data:{triporder}
            });
          }
          else if(ctx.usertype === 'driver' && !!triporder.rideruserid){
            PubSub.publish(`user.rider.${triporder.rideruserid}`, {
              cmd:'serverpush_triporder',
              data:{triporder}
            });
          }
          //================通知平台====================
          if(ctx.usertype === 'rider'){//乘客-》司机评论
            //功能缺失！
            //   PubSub.publish('Platformmsgs', {
            //     action:'Insert',
            //     type:'Platform_ratedDriver',
            //     payload:{
            //       triporderid:triporder._id,
            //       scoreservice:triporder.ratedriverinfo.ratenum,
            //       detail:triporder.ratedriverinfo.comment
            //     }
            // });
          }
          else if(ctx.usertype === 'driver'){//司机=》乘客评论
              PubSub.publish('Platformmsgs', {
                action:'Update',
                type:'Platform_ratedPassenger',
                payload:{
                  triporderid:triporder._id,
                  scoreservice:triporder.rateriderinfo.ratenum,
                  detail:triporder.rateriderinfo.comment
                }
            });
          }

        }
      });
    }
    else{
      socket.emit('common_err',{errmsg:`更新订单评论失败(${err.message})`,type:'updateorder_comment'});
      winston.getlog().error(`更新订单评论失败(${err.message})`);
    }
  });
}
exports.updateorder = updateorder;
exports.updateorder_comment = updateorder_comment;
