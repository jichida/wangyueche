let pay = require('../../pay/pay.js');
let DBModels = require('../../db/models.js');
const rr = require('./recharge.js');
const userlogin = require('./rideruserlogin');

exports.getpaysign = (socket,actiondata,ctx)=>{
    let orderdoc = actiondata.orderdoc;
    let paytype = actiondata.paytype;
    let dbModel = DBModels.TripOrderModel;
    let orderid = orderdoc.out_trade_no;
    dbModel.findOne({ _id:orderid},(err,orderinfo)=>{
        if(!err && !!orderinfo){
            orderdoc.out_trade_no = orderinfo.out_trade_no;
           if(orderinfo.paystatus === '已支付'){
             socket.emit('common_err', {errmsg:'该订单已支付',type:'getpaysign'});
             return;
           }
           if(actiondata.paytype !== orderinfo.paytype){
             socket.emit('common_err', {errmsg:`支付方式不一致,将要支付:${actiondata.paytype},订单中的支付方式:${orderinfo.paytype}`,type:'getpaysign'});
             return;
           }
            let totalfee = orderdoc.total_fee;
            if( typeof totalfee === 'string'){
                totalfee = parseFloat(totalfee);
            }
            if(paytype === 'weixin'){
                totalfee = (totalfee/100).toFixed(2);
                totalfee = parseFloat(totalfee);
            }
            if(totalfee !== orderinfo.realprice){
              console.log(JSON.stringify({
                totalfee:totalfee,
                realprice:orderinfo.realprice
              }));
              socket.emit('common_err', {errmsg:`支付的订单金额和实际不一致:实际金额:${totalfee},订单中的金额:${orderinfo.realprice}`,type:'getpaysign'});
              return;
            }

            if(actiondata.paytype === 'weixin' || actiondata.paytype === 'alipay'){
                pay.getpayresultstring(actiondata.paytype,actiondata.orderdoc,(err,result)=>{
                  if(!err){
                    socket.emit('getpaysign_result', result);
                  }
                  else{
                    socket.emit('common_err', {errmsg:`getpayresultstring返回失败,${JSON.stringify(err)}`,type:'getpaysign'});
                  }
                });//pay.getpayresultstring
              }
              else if(actiondata.paytype === 'leftbalance'){
                //<----------检查是否有优惠券----------------
                //检查用户余额是否足够
                  console.log(`使用余额支付:${JSON.stringify(orderinfo)}`);
                  let userModel = DBModels.UserRiderModel;
                  userModel.findOne({_id:ctx.userid},(err,targetuser)=>{
                    if(targetuser.balance < orderinfo.balanceprice){
                      socket.emit('common_err', {errmsg:`用户余额不足,用户余额:${targetuser.balance},订单中的金额:${orderinfo.balanceprice}`,type:'getpaysign'});
                      return;
                    }
                    rr.paywithleftbalance(ctx,orderinfo,targetuser,(err,result)=>{
                      if(!err){
                        socket.emit('getpaysign_result', result);

                        //send balance
                        userlogin.queryuserbalance(socket,{},ctx);
                      }
                      else{
                        socket.emit('common_err', {errmsg:`paywithleftbalance返回失败:${JSON.stringify(err)}`,type:'getpaysign'});
                      }
                    });
                  });
              }
              else{
                socket.emit('common_err', {errmsg:`不支持该支付方式:${actiondata.paytype}`,type:'getpaysign'});
              }
        }
        else{//if(!err && orderinfo){
           socket.emit('common_err', {errmsg:'找不到符合条件的订单',type:'getpaysign'});
        }
    });



}
