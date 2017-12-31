const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const moment = require('moment');

//指定拼车订单退款！
let pincheorderrefund = (orderid,fnresult)=>{
  let orderModel = DBModels.TripOrderModel;
  orderModel.findOne({_id:orderid,paystatus:'已支付',triptype:'拼车'},(err,triporder)=>{
    if(!err && !!triporder){
        let realprice = triporder.realprice;
        let userModel = DBModels.UserRiderModel;
        userModel.findOne({_id:triporder.rideruserid},(err,user)=>{
          if(!err && !!user){
            let feeold = user.balance;
            let orderprice = triporder.orderprice;
            let feebonus = realprice;
            let feenew = parseFloat((feeold + feebonus).toFixed(2));
            let rechargerecordModel =  DBModels.RechargerecordModel;
            let rechargerecord = new rechargerecordModel({
                                creator:user._id,
                                fromorder:triporder._id,
                                fromuser:user._id,
                                levelflag:0,
                                feeold,
                                feenew,
                                feebonus,
                                orderprice,
                                srctype:'pincheorderrefund',
                                created_at:moment().format('YYYY-MM-DD HH:mm:ss')
                            });
             console.log(`拼车订单退款,创建充值记录:${JSON.stringify(rechargerecord)}`);
             rechargerecord.save((err,rechargerecord1)=>{
                  if(!err && !!rechargerecord1){
                      userModel.findOneAndUpdate({_id:user._id},{$set:{balance:feenew}},{new:true},(err,ctxuser)=>{
                        //更新用户余额《----》
                        console.log(`更新用户${ctxuser._id}余额${feeold}=>${ctxuser.balance}`);
                        //更新订单为已退款
                        orderModel.findOneAndUpdate({_id: triporder._id},{
                            orderstatus : '已取消',
                            paystatus: '已退款',
                            pay_at:moment().format('YYYY-MM-DD HH:mm:ss')
                        }, {new: true}, (err, updateditem)=> {
                            if(!err && !!updateditem){
                              fnresult(null,updateditem);
                            }
                            else{
                              fnresult('操作订单状态失败');
                            }
                        });//更新订单
                  });//更新用户
                }
                else{
                  fnresult('保存充值记录失败');
                }
              });
          }
          else{
            fnresult('找不到该用户');
          }
        });
    }
    else{
      fnresult('未找到记录');
    }
  });
}

exports.pincheorderrefund = pincheorderrefund;
