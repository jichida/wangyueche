let DBModels = require('../../db/models.js');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const async = require('async');
let PubSub = require('pubsub-js');
const notifymessage_all = require('../common/notifymessage.js');
const moment = require('moment');
const platformpay = require('../../platform/platformpay');

let doordersuccess_daijiacancel = (order,systemconfig,ctxuser,fncallback)=>{
  //获取order所在的用户,往userfrom加一条充值记录
  let creator = ctxuser._id;
  let fromorder = order._id;
  let fromuser = order.creator;
  let srctype = 'order';
  let created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  let userModel = DBModels.UserDriverModel;
  console.log(`往司机端加一条充值记录${order.driveruserid}`);
  userModel.findOne({_id:order.driveruserid},(err,targetuser)=>{
      if(!err && !!targetuser){
          let feeold = targetuser.balance || 0;
          let orderprice = order.orderprice;
          let feebonus = systemconfig.daijiacancelprice*systemconfig.platformdriverfeediscount;//应付金额
          feebonus = parseFloat(feebonus.toFixed(2));
          let feenew = parseFloat((feeold + feebonus).toFixed(2));

          let newdata = {
              creator:targetuser._id,
              fromorder,
              fromuser,
              feeold,
              feenew,
              feebonus,
              orderprice,
              srctype,
              created_at:moment().format('YYYY-MM-DD HH:mm:ss')
          };
          console.log(`====>${JSON.stringify(newdata)}`);
          let rechargerecordModel =  DBModels.RechargerecordModel;
          let entityrechargerecord = new rechargerecordModel(newdata);
          entityrechargerecord.save((err,rechargerecord)=>{
            if(!err && !!rechargerecord){
                //保存该用户充值记录
                winston.getlog().warn(`保存充值记录成功${JSON.stringify(rechargerecord)}`);
                userModel.findOneAndUpdate({_id:targetuser._id},{$set:{balance:feenew}},{new:true},(err,result)=>{
                    //更新用户余额《----》
                    winston.getlog().warn(`更新用户${targetuser._id}余额`);
                    fncallback({
                      type:'driver',
                      cmd:'serverpush_userbalance',
                      data:{balance:result.balance}
                    });
                    //已充值成功xx元（消息通知）
                    notifymessage_all.pushnotifymessage({
                      messagetype:'driver',
                      driveruserid:targetuser._id,
                      messagetitle:notifymessage_all.getmsgtxt('paybyrider_daijiacancel',rechargerecord),
                      messagecontent:`/mywallet`,
                      subtype:'order'
                    });
                });
            }
            else{
                fncallback({
                  type:'rider',
                  cmd:'common_err',
                  data:{type:'doordersuccess',errmsg:`保存充值记录失败！${targetuser._id}`}
                });
                winston.getlog().warn(`保存充值记录失败！${targetuser._id}`);
            }
          });
        }
    });
}
//订单支付成功！
//注：必须可靠执行，不能publish出去再执行
let doordersuccess = (order,ctxuser,systemconfig,fncallback)=>{
    //获取order所在的用户,往userfrom加一条充值记录
    let creator = ctxuser._id;
    let fromorder = order._id;
    let fromuser = order.creator;
    let srctype = 'order';
    let created_at = new Date();

    if(!!order.couponid){
      //有优惠券id
      let dbModel = DBModels.MyCouponModel;
      dbModel.findOneAndUpdate({_id:order.couponid},{$set:{
        usestatus:'已使用',
        fromorder:order._id,
        used_at:new Date()
      }},{new:true},(err,result)=>{
        console.log(`优惠券已使用${JSON.stringify(result)}`);
      });
    }

    if(order.triptype === '代驾' || order.triptype === '出租车' || order.triptype === '快车'){
      let userModel = DBModels.UserDriverModel;
      console.log(`往司机端加一条充值记录${order.driveruserid}`);
      userModel.findOne({_id:order.driveruserid},(err,targetuser)=>{
          if(!err && !!targetuser){
              let feeold = targetuser.balance || 0;
              let orderprice = order.orderprice;
              let feebonus = orderprice*systemconfig.platformdriverfeediscount;//应付金额
              feebonus = parseFloat(feebonus.toFixed(2));
              let feenew = parseFloat((feeold + feebonus).toFixed(2));

              let newdata = {
                  creator:targetuser._id,
                  fromorder,
                  fromuser,
                  feeold,
                  feenew,
                  feebonus,
                  orderprice,
                  srctype,
                  created_at:moment().format('YYYY-MM-DD HH:mm:ss')
              };
              console.log(`====>${JSON.stringify(newdata)}`);
              let rechargerecordModel =  DBModels.RechargerecordModel;
              let entityrechargerecord = new rechargerecordModel(newdata);
              entityrechargerecord.save((err,rechargerecord)=>{
                if(!err && !!rechargerecord){
                    //保存该用户充值记录
                    winston.getlog().warn(`保存充值记录成功${JSON.stringify(rechargerecord)}`);
                    userModel.findOneAndUpdate({_id:targetuser._id},{$set:{balance:feenew}},{new:true},(err,result)=>{
                        //更新用户余额《----》
                        winston.getlog().warn(`更新用户${targetuser._id}余额`);
                        fncallback({
                          type:'driver',
                          cmd:'serverpush_userbalance',
                          data:{balance:result.balance}
                        });

                        //已充值成功xx元（消息通知）
                        notifymessage_all.pushnotifymessage({
                          messagetype:'driver',
                          driveruserid:targetuser._id,
                          messagetitle:notifymessage_all.getmsgtxt('paybyrider',rechargerecord),
                          messagecontent:`/mywallet`,
                          subtype:'order'
                        });

                        //<---插入平台
                        platformpay.notifyplatform_orderpaied(order);
                    });
                }
                else{
                    fncallback({
                      type:'rider',
                      cmd:'common_err',
                      data:{type:'doordersuccess',errmsg:`保存充值记录失败！${targetuser._id}`}
                    });
                    winston.getlog().warn(`保存充值记录失败！${targetuser._id}`);
                }
              });
            }
        });
    }
    else if(order.triptype === '充值'){
      let userModel = DBModels.UserRiderModel;
      console.log(`往userfrom1加一条充值记录${creator}`);
      userModel.findOne({_id:creator},(err,targetuser)=>{
                  if(!err && !!targetuser){
                      let feeold = targetuser.balance || 0;
                      let orderprice = order.orderprice;
                      let feebonus = orderprice;//应付金额
                      feebonus = parseFloat(feebonus.toFixed(2));
                      let feenew = parseFloat((feeold + feebonus).toFixed(2));

                      let newdata = {
                          creator:targetuser._id,
                          fromorder,
                          fromuser,
                          feeold,
                          feenew,
                          feebonus,
                          orderprice,
                          srctype,
                          created_at:new Date()
                      };
                      console.log(`====>${JSON.stringify(newdata)}`);
                      let rechargerecordModel =  DBModels.RechargerecordModel;
                      let entityrechargerecord = new rechargerecordModel(newdata);
                      entityrechargerecord.save((err,rechargerecord)=>{
                          if(!err && rechargerecord){
                              //保存该用户充值记录
                              winston.getlog().warn(`保存充值记录成功${JSON.stringify(rechargerecord)}`);
                              userModel.findOneAndUpdate({_id:targetuser._id},{$set:{balance:feenew}},{new:true},(err,result)=>{
                                  //更新用户余额《----》
                                  winston.getlog().warn(`更新用户${targetuser._id}余额`);
                                  fncallback({
                                    type:'rider',
                                    cmd:'serverpush_userbalance',
                                    data:{balance:result.balance}
                                  });

                                  //已充值成功xx元（消息通知）
                                  notifymessage_all.pushnotifymessage({
                                    messagetype:'rider',
                                    rideruserid:targetuser._id,
                                    messagetitle:notifymessage_all.getmsgtxt('payforbanlancerider',rechargerecord),
                                    messagecontent:`/mywallet`,
                                    subtype:'order'
                                  });
                              });
                          }
                          else{
                              fncallback({
                                type:'rider',
                                cmd:'common_err',
                                data:{type:'doordersuccess',errmsg:`保存充值记录失败！${targetuser._id}`}
                              });
                              winston.getlog().warn(`保存充值记录失败！${targetuser._id}`);
                          }
                  });
                }
                else{
                    fncallback({
                      type:'rider',
                      cmd:'common_err',
                      data:{type:'doordersuccess',errmsg:`找不到对应的用户${creator}`}
                    });
                    winston.getlog().warn(`找不到对应的用户${creator}`);
                  }
              });//userModel.findOne({_id:creator},(err,targetuser)=>{
          }//else if(order.triptype === '充值'){
}

//注：必须可靠执行，不能publish出去再执行
exports.ordersuccess = (order,ctxuser,fncallback)=>{
  dbModel = DBModels.SystemConfigModel;
  dbModel.findOne({},(err,systemconfig)=>{
      if(!err && !!systemconfig){
          doordersuccess(order,ctxuser,systemconfig,fncallback);
      }
      else{
          fncallback({
            type:'rider',
            cmd:'common_err',
            data:{
              type:'ordersuccess',
              errmsg:`获取系统设置失败(订单成功)！`
            }
          });
          winston.getlog().error(`获取系统设置失败！`);
      }
  });
}

exports.ordersuccess_daijiacancel = (order,systemconfig,ctxuser,fncallback)=>{
    doordersuccess_daijiacancel(order,systemconfig,ctxuser,fncallback);
}
