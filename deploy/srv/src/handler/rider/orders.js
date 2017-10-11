const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose  = require('mongoose');
let PubSub = require('pubsub-js');
const winston = require('../../log/log.js');
const async = require('async');
const Chance = require('chance');
const chance = new Chance();
const moment = require('moment');

let getorderdetail_command =(socket,actiondata,ctx,commandstring)=>{
  let isvaild = false;
  if(!!actiondata.query){
    if(!!actiondata.query._id && !!actiondata.query.triptype){
      isvaild = true;
    }
  }

  if(!isvaild){
    socket.emit('common_err',{errmsg:`参数错误,必须包含query以及_id和triptype`,type:`${commandstring}`});
    return;
  }

  let orderModel = DBModels.TripOrderModel;
  if(typeof actiondata.query._id === 'string'){
    actiondata.query._id = mongoose.Types.ObjectId(actiondata.query._id);
  }
  actiondata.query.rideruserid = ctx.userid;
  if(actiondata.query.triptype === '拼车'){
      orderModel.findOne(actiondata.query).populate([
        {path:'buscarpoolid', select:'_id startdate starttime seatnumber groupnumber startcity pinchetype endcity status carpoolstationtime'},
      ]).exec((err,triporder)=>{
      if(!err && !!triporder){
          triporder = triporder.toJSON();
          const adminaction = require('../../router/action');
          adminaction.gettakenseatfromorder(triporder.buscarpoolid,(err,result)=>{
            console.log(`result:${JSON.stringify(result)}`);
            socket.emit(`${commandstring}_result`,{triporder});
          });
      }
      else{
        socket.emit('common_err',{errmsg:`找不到符合条件的订单,query:${JSON.stringify(actiondata.query)}`,type:`${commandstring}`});
      }
    });
  }
  else{
      dbModel.findOne(actiondata.query,(err,triporder)=>{
        if(!err && !!triporder){
            socket.emit(`${commandstring}_result`,{triporder});
        }
        else{
          socket.emit('common_err',{errmsg:`找不到符合条件的订单,query:${JSON.stringify(actiondata.query)}`,type:`${commandstring}`});
        }
      });
  }

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


exports.payorder = (socket,actiondata,ctx)=>{
  let orderModel = DBModels.TripOrderModel;
  let payload = actiondata.data;
  if(!!payload.couponid){
    if(typeof payload.couponid === 'string'){
      payload.couponid = mongoose.Types.ObjectId(payload.couponid);
    }
  }
  if(!!payload.realprice){
    if(payload.realprice < 0){
      socket.emit('common_err',{errmsg:`实付价格${payload.realprice}不能小于0`,type:'payorder'});
      return;
    }
  }
  if(!!payload.orderprice){
    if(payload.orderprice < 0){
      socket.emit('common_err',{errmsg:`订单价格${payload.orderprice}不能小于0`,type:'payorder'});
      return;
    }
  }

  let curtime = moment().format("YYYYMMDDHHmmss");
  let randst = chance.string({length: 6,pool: '0123456789'});
  payload.out_trade_no = `${curtime}${randst}`;
  //payload.realprice = payload.realprice;
  if(typeof actiondata.query._id === 'string'){
    actiondata.query._id = mongoose.Types.ObjectId(actiondata.query._id);
  }
  actiondata.query.rideruserid = ctx.userid;
  console.log(`查询条件:${JSON.stringify(actiondata.query)}`);
  console.log(`更新:${JSON.stringify(payload)}`);
  orderModel.findOneAndUpdate(actiondata.query,{$set:payload},{new: true},(err,orderinfo)=>{
      if(!err){
        if(!!orderinfo){
          winston.getlog().info(`更新订单:(${JSON.stringify(orderinfo)})`);
          socket.emit('payorder_result',{orderinfo});
        }
        else{
          socket.emit('common_err',{errmsg:`找不到相应的订单:${JSON.stringify(actiondata)}`,title:'支付',type:'payorder'});
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
    query.rideruserid = ctx.userid;
  }
  else if(ctx.usertype === 'driver'){
    query.driveruserid = ctx.userid;
    socket.emit('common_err',{errmsg:`仅乘客端有效`,type:'getmytriporders'});
    return;
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

let insertorder_command = (socket,actiondata,ctx,commandstring)=>{
  if(ctx.usertype !== 'rider'){
    socket.emit('common_err',{errmsg:'该函数仅乘客端有效',type:commandstring});
    winston.getlog().error(`该函数仅乘客端有效${ctx.usertype}`);
    return;
  }

  if(actiondata.triptype !== '拼车' && actiondata.triptype !== '旅游大巴' && actiondata.triptype !== '充值') {
    socket.emit('common_err',{errmsg:`该函数仅针对拼车/旅游大巴/充值(${actiondata.triptype})`,type:commandstring});
    winston.getlog().error(`该函数仅针对拼车/旅游大巴/充值(${actiondata.triptype})`);
    return;
  }
  let orderModel = DBModels.TripOrderModel;

  let order = {};
  if(actiondata.triptype === '拼车'){
    order = actiondata;
    actiondata.startdate = new Date(Date.parse(actiondata.startdate));
    order.rideruserid = ctx.userid;
  }
  else if(actiondata.triptype === '旅游大巴'){
    order = actiondata;
    actiondata.startdate = new Date(Date.parse(actiondata.startdate));
    actiondata.enddate = new Date(Date.parse(actiondata.enddate));
    order.rideruserid = ctx.userid;
  }
  else if(actiondata.triptype === '充值'){
    order = actiondata;
    order.rideruserid = ctx.userid;
  }

  order.updated_at = new Date();
  order.created_at = new Date();
  order.paystatus = '未支付';
  //仅快车，出租车，代驾 有效

  let entity = new orderModel(order);
  entity.save((err,triporder)=>{
    winston.getlog().info("insertorder triporder=>" + JSON.stringify(triporder));
    if(!err && triporder){
      if(actiondata.triptype !== '拼车'){
        socket.emit(`${commandstring}_result`,{triporder:triporder});
      }
      else{
        getorderdetail_command(socket,{query:{
          _id:triporder._id,
          triptype:actiondata.triptype
        }},ctx,'insertorder');
      }

    }
    else{
       socket.emit('common_err',{errmsg:err.message,type:commandstring});
       winston.getlog().error(`插入订单失败(${err.message})`);
    }
  });
}
//仅针对乘客端／拼车&旅游大巴
exports.insertorder = (socket,actiondata,ctx)=>{
  if(actiondata.triptype === '拼车'){
    //判断该路线是否已满或者已经取消
    if(typeof actiondata.buscarpoolid === 'string'){
      actiondata.buscarpoolid = mongoose.Types.ObjectId(actiondata.buscarpoolid);
    }
    //buscarpoolid
    let buscarpoolModel = DBModels.BuscarpoolModel;
    buscarpoolModel.findOne({_id:actiondata.buscarpoolid},(err,buscarpool)=>{
      if(!err && !!buscarpool){
        const adminaction = require('../../router/action');
        adminaction.gettakenseatfromorder(buscarpool,(err,result)=>{
          if(!err && !!result){
            if(result.isenabled){
              if(actiondata.seatnumber + result.seatnumbertotal > result.seatnumber){
                socket.emit('common_err',{errmsg:'座位已满',type:'insertorder'});
              }
              else{
                insertorder_command(socket,actiondata,ctx,'insertorder');
              }
              //如果成团，则修改状态为已成团
              let status = (actiondata.seatnumber + result.seatnumbertotal >= result.groupnumber)?'已成团':'未成团';
              buscarpoolModel.findOneAndUpdate({_id:buscarpool._id},{$set:{status}},(err,result)=>{
              });
            }
            else{
              socket.emit('common_err',{errmsg:'该路线未启用（或被取消）',type:'insertorder'});
            }
          }
          else{
            socket.emit('common_err',{errmsg:'未找到该路线相关的订单信息',type:'insertorder'});
          }
        });
      }
      else{
        socket.emit('common_err',{errmsg:'未找到该路线',type:'insertorder'});
      }
    })
    return;
  }

  insertorder_command(socket,actiondata,ctx,'insertorder');
}

exports.rechargepay = (socket,actiondata,ctx)=>{
  actiondata.triptype = '充值';
  insertorder_command(socket,actiondata,ctx,'rechargepay');
}

let updateorder = (socket,actiondata,ctx)=>{
  let orderModel = DBModels.TripOrderModel;
  let order = actiondata;
  if(ctx.usertype === 'rider'){
    order.rideruserid = ctx.userid;
  }
  else if(ctx.usertype === 'driver'){
    order.driveruserid = ctx.userid;
    socket.emit('common_err',{errmsg:`仅乘客端有效`,type:'updateorder'});
    return;
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
      if(!actiondata.data.ratedriverinfo.hasOwnProperty('created_at')){
        actiondata.data.ratedriverinfo.created_at = new Date();
      }
  }
  else if(ctx.usertype === 'driver'){
    if(!actiondata.data.rateriderinfo.hasOwnProperty('created_at')){
      actiondata.data.rateriderinfo.created_at = new Date();
    }
    socket.emit('common_err',{errmsg:`仅乘客端有效`,type:'updateorder'});
    return;
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
