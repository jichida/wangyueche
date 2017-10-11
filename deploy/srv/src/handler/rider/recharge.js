let DBModels = require('../../db/models.js');
let winston = require('../../log/log.js');
const async = require('async');
let PubSub = require('pubsub-js'); 

exports.getrechargerecords = (socket,payloadata,ctx)=>{

    let rechargerecordModel =  DBModels.RechargerecordModel;
    payloadata.query.creator = ctx.userid;
    payloadata.options.populate =   [
      {
        path:'fromorder', select:'triptype', model: 'triporder'
      },
    ];
    console.log(`getrechargerecords===>${JSON.stringify(payloadata)}`);

    rechargerecordModel.paginate(payloadata.query,payloadata.options,(err,list)=>{
      if(!err){
        socket.emit('getrechargerecords_result',{result:list});
      }
      else{
        socket.emit('common_err',{errmsg:`找不到充值明细`,type:'getrechargerecords'});
      }
    });
}
//用户使用余额支付
exports.paywithleftbalance_daijiacancel = (ctx,order,systemconfig,user,callbackfn)=>{
  const daijiacancelprice = systemconfig.daijiacancelprice;
  let userModel = DBModels.UserRiderModel;
  let feeold = user.balance;
  let orderprice = daijiacancelprice;
  let feebonus = -daijiacancelprice;
  let feenew = parseFloat((feeold + feebonus).toFixed(2));
  let rechargerecordModel =  DBModels.RechargerecordModel;
  let entityuser1 = new rechargerecordModel({
                      creator:user._id,
                      fromorder:order._id,
                      fromuser:user._id,
                      levelflag:0,
                      feeold,
                      feenew,
                      feebonus,
                      orderprice,
                      srctype:'paywithleftbalance',
                      created_at:new Date()
                  });
   console.log(`使用余额支付,创建充值记录:${JSON.stringify(entityuser1)}`);
   entityuser1.save((err,rechargerecord1)=>{
      if(!err && !!rechargerecord1){
          console.log(`使用余额支付,创建充值记录:${JSON.stringify(rechargerecord1)}`);
          userModel.findOneAndUpdate({_id:user._id},{$set:{balance:feenew}},{new:true},(err,ctxuser)=>{
              //更新用户余额《----》
              console.log(`更新用户${ctxuser._id}余额${feeold}=>${ctxuser.balance}`);
              winston.getlog().warn(`更新用户${ctxuser._id}余额`);

              //更新订单为已支付
              let dbModel = DBModels.TripOrderModel;
              dbModel.findOneAndUpdate({
                  _id: order._id,
                  triptype:'代驾',
                  paystatus: { $ne: '已支付' }
              },{
                  paytype: "leftbalance",
                  orderstatus : '已取消',
                  orderprice,
                  paystatus: '已支付',
                  pay_at:new Date()
              }, {new: true}, (err, updateditem)=> {
                  if(!err && !!updateditem){
                    //socket.emit('serverpush_triporder',{triporder:updateditem});
                    let eventobj = {
                      type:'driver',
                      cmd:'serverpush_triporder',
                      data:{triporder:updateditem}
                    };
                    PubSub.publish(`user.driver.${updateditem.driveruserid}`,eventobj);

                    const ordercallback = require('./ordercallback');
                    ordercallback.ordersuccess_daijiacancel(updateditem,systemconfig,ctxuser,(eventobj)=>{
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
                    //<-------
                    callbackfn(null,updateditem);

                  }
                  else if(err){
                      callbackfn(`修改我的订单失败:${err.message}`);
                      winston.getlog().error(`修改我的订单失败:${err.message}`);
                  }
              });
          });
      }
      else if(err){
          callbackfn(`使用余额支付,创建充值记录:${JSON.stringify(err)}`);
          console.log(`使用余额支付,创建充值记录:${JSON.stringify(err)}`);
      }
   });
}
//用户使用余额支付
exports.paywithleftbalance = (ctx,order,user,callbackfn)=>{
    let userModel = DBModels.UserRiderModel;
    let feeold = user.balance;
    let orderprice = order.orderprice;
    let feebonus = -order.balanceprice;
    let feenew = parseFloat((feeold + feebonus).toFixed(2));
    let rechargerecordModel =  DBModels.RechargerecordModel;
    let entityuser1 = new rechargerecordModel({
                        creator:user._id,
                        fromorder:order._id,
                        fromuser:user._id,
                        levelflag:0,
                        feeold,
                        feenew,
                        feebonus,
                        orderprice,
                        srctype:'paywithleftbalance',
                        created_at:new Date()
                    });
     console.log(`使用余额支付,创建充值记录:${JSON.stringify(entityuser1)}`);
     entityuser1.save((err,rechargerecord1)=>{
        if(!err && !!rechargerecord1){
            console.log(`使用余额支付,创建充值记录:${JSON.stringify(rechargerecord1)}`);
            userModel.findOneAndUpdate({_id:user._id},{$set:{balance:feenew}},{new:true},(err,ctxuser)=>{
                //更新用户余额《----》
                console.log(`更新用户${ctxuser._id}余额${feeold}=>${ctxuser.balance}`);
                winston.getlog().warn(`更新用户${ctxuser._id}余额`);

                //更新订单为已支付
                let dbModel = DBModels.TripOrderModel;
                dbModel.findOneAndUpdate({
                    _id: order._id,
                    paystatus: { $ne: '已支付' }
                },{
                    paytype: "leftbalance",
                    orderstatus : '已支付',
                    paystatus: '已支付',
                    pay_at:new Date()
                }, {new: true}, (err, updateditem)=> {
                    if(!err && !!updateditem){
                        //socket.emit('serverpush_triporder',{triporder:updateditem});
                        if(updateditem.triptype === '出租车' ||
                          updateditem.triptype === '快车' ||
                          updateditem.triptype === '代驾'){
                            if(!!order.driveruserid){
                              let eventobj = {
                                type:'driver',
                                cmd:'serverpush_triporder',
                                data:{triporder:updateditem}
                              };
                              PubSub.publish(`user.driver.${updateditem.driveruserid}`,eventobj);
                            }
                            const ordercallback = require('./ordercallback');
                            ordercallback.ordersuccess(updateditem,ctxuser,(eventobj)=>{
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
                          //<-------
                          callbackfn(null,updateditem);
                      }
                    else if(err){
                        callbackfn(`修改我的订单失败:${err.message}`);
                        winston.getlog().error(`修改我的订单失败:${err.message}`);
                    }
                });
            });
        }
        else if(!!err){
            console.log(`使用余额支付,创建充值记录:${JSON.stringify(err)}`);
            callbackfn(`使用余额支付,创建充值记录:${JSON.stringify(err)}`);
        }
     });
}
