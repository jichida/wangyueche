let DBModels = require('../../db/models.js');
let winston = require('../../log/log.js');
const moment = require('moment');

const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

ajv.addSchema({
  "properties": {
    "bankaccount": {
      "type": "string",
    },
    "bankname": {
      "type": "string"
    },
    "cashmoney": {
      "type": "number"
    },
  },
  "required": [ "bankaccount","bankname","cashmoney" ],

}, 'withdrawcashapplyaddone_input_Schema');

//插入提现申请
exports.withdrawcashapplyaddone = (socket,payloaddata,ctx,userModel,resultstring)=>{
  const valid = ajv.validate('withdrawcashapplyaddone_input_Schema', payloaddata);
  if(!valid){
    socket.emit('common_err',{type:'withdrawcashapplyaddone',errmsg:ajv.errorsText(),title:'提现申请'});
    return;
  }
  //提现金额大于0 并且提现不大于当前余额
  userModel.findOne({_id:ctx.userid},(err,user)=>{
      if(!err && user){
          if(user.balance > payloaddata.cashmoney && payloaddata.cashmoney > 0){
                  let entitydata = payloaddata;
                  entitydata.creator = ctx.userid;
                  entitydata.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
                  entitydata.status = '未验证';

                  let dbModel = DBModels.WithdrawcashapplyModel;
                  let entity = new dbModel(entitydata);
                  entity.save((err,newitem)=>{
                      if(!err){
                          if(newitem){
                              socket.emit(resultstring,{newitem});
                          }
                          else{
                              socket.emit('common_err',{type:'withdrawcashapplyaddone',errmsg:`插入提现申请失败`});
                          }
                      }
                      else{
                          socket.emit('common_err',{type:'withdrawcashapplyaddone',errmsg:`提现申请失败:${err.message}`});
                          winston.getlog().error(`插入提现申请失败:${err.message}`);
                      }
                  });
          }
          else if(payloaddata.cashmoney === 0){
              socket.emit('common_err',{type:'withdrawcashapplyaddone',errmsg:'提现金额不能为0'});
          }
          else{
              socket.emit('common_err',{type:'withdrawcashapplyaddone',errmsg:`提现金额${payloaddata.cashmoney}必须小于账户余额${user.balance}`});
          }
      }
      else{
          socket.emit('common_err',{type:'withdrawcashapplyaddone',errmsg:'找不到该用户'});
      }

  });


  }

//验证
exports.withdrawcashapplyauth = (socket,payloaddata,ctx,userModel,authexptime,globalUserauth,resultstring)=>{
  let updateddata = { status : '已验证'};
  if(!globalUserauth.hasOwnProperty(payloaddata.username)){
    socket.emit('common_err',{type:'withdrawcashapplyauth',errmsg:'请先发送验证码'});
    return;
  }
  if(globalUserauth[payloaddata.username].authcode != payloaddata.authcode){
    socket.emit('common_err',{type:'withdrawcashapplyauth',errmsg:'验证码不对'});
    return;
  }
  let nowDate = new Date();
  let min2Ago = new Date(nowDate.getTime() - 1000 * authexptime);
  if(min2Ago > globalUserauth[payloaddata.username].updated_at){
    socket.emit('common_err',{type:'withdrawcashapplyauth',errmsg:'验证码已过期'});
    return;
  }
  let dbModel = DBModels.WithdrawcashapplyModel;
  dbModel.findOne({
       _id: payloaddata._id,
       creator:ctx.userid,
   },(err, updateditem)=> {
       if(!err && !!updateditem){
         userModel.findOne({_id:ctx.userid},(err,targetuser)=>{
         if(!err && targetuser){
             let feeold = targetuser.balance;
             let feebonus = -updateditem.cashmoney;//应付金额
             let feenew = parseFloat((feeold + feebonus).toFixed(2));
             let rechargerecordModel =  DBModels.RechargerecordModel;
             let entityuser = new rechargerecordModel({
                             creator:targetuser._id,
                             fromwithdrawcashapply:updateditem._id,
                             feeold,
                             feenew,
                             feebonus,
                             orderprice:-updateditem.cashmoney,
                             srctype:'withdrawcash_ing',
                             created_at:moment().format('YYYY-MM-DD HH:mm:ss')
             });
             entityuser.save((err,rechargerecord2)=>{//保存该用户2值记录
                 if(!err && rechargerecord2){
                 //该用户充值记录
                     userModel.findOneAndUpdate({_id:updateditem.creator},{$set:{balance:feenew}},{new:true},(err,result)=>{
                         //更新用户余额
                         if(!err && result){
                           updateddata.rechargerecord = rechargerecord2._id;
                           //发送余额变动消息
                            dbModel.findOneAndUpdate({
                                 _id: payloaddata._id,
                                 creator:ctx.userid,
                             },updateddata, {new: true}, (err, updateditem)=> {
                               if(!err){
                                   if(updateditem){
                                     socket.emit(resultstring,{result:'OK',updateditem});
                                   }
                                   else{
                                     socket.emit('common_err',{type:'withdrawcashapplyauth',errmsg:'找不到对应记录'});
                                   }
                               }
                              else{
                                  socket.emit('common_err',{type:'withdrawcashapplyauth',errmsg:`验证提现记录失败:${err.message}`});
                                  winston.getlog().error(`验证提现记录失败:${err.message}`);
                               }
                             });
                         }
                         else{
                             winston.getlog().error(`注意!!!,更新用户余额失败！:${JSON.stringify(err)},记录:${JSON.stringify(result)}`);
                             socket.emit('common_err',{type:'withdrawcashapplyauth',errmsg:'更新用户余额失败！'});
                         }
                     });
                 }
                 else{
                   socket.emit('common_err',{type:'withdrawcashapplyauth',errmsg:'保存用户充值记录失败'});
                   winston.getlog().error(`注意!!!,保存用户充值记录失败:${JSON.stringify(err)},记录:${JSON.stringify(rechargerecord2)}`);
                 }
             });
         }
         else{
             socket.emit('common_err',{type:'withdrawcashapplyauth',errmsg:'找不到用户'});
             winston.getlog().error(`注意!!!,错误:${JSON.stringify(err)},记录:${JSON.stringify(targetuser)}`);
         }
       });
     }
     else{
       socket.emit('common_err',{type:'withdrawcashapplyauth',errmsg:`找不到申请记录:${payloaddata._id}`});
     }
   });

};

exports.withdrawcashapplypaid = (updateditem,callback,userModel)=>{
  if(!!updateditem){
  if(updateditem.status === '已支付' || updateditem.status === '已拒绝'){
    if(updateditem.status === '已拒绝'){
      let rechargerecordModel =  DBModels.RechargerecordModel;
      rechargerecordModel.findOne({_id:updateditem.rechargerecord},(err,result)=>{
        if(!err && !!result){
            if(result.srctype === 'withdrawcash_ing'){
                //如果是已拒绝，为避免多次点击造成数据不一致，需要判断当前对应的充值记录是否为'withdrawcash_ing'的
                //如果是则允许，否则则不允许再充值
                winston.getlog().error(`处理提现记录被拒绝,正在恢复相应用户费用${updateditem.cashmoney}`);
                userModel.findOne({_id:updateditem.creator},(err,targetuser)=>{
                    if(!err && !!targetuser){
                        let feeold = targetuser.balance;
                        let feebonus = updateditem.cashmoney;//应付金额
                        let feenew = parseFloat((feeold + feebonus).toFixed(2));
                        let rechargerecordModel =  DBModels.RechargerecordModel;
                        let entityuser = new rechargerecordModel({
                                        creator:targetuser._id,
                                        fromwithdrawcashapply:updateditem._id,
                                        feeold,
                                        feenew,
                                        feebonus,
                                        orderprice:updateditem.cashmoney,
                                        srctype:'withdrawcash_denied',
                                        created_at:new Date()
                        });
                        entityuser.save((err,rechargerecord2)=>{//保存该用户2值记录
                            if(!err && rechargerecord2){
                            //该用户充值记录
                                userModel.findOneAndUpdate({_id:updateditem.creator},{$set:{balance:feenew}},{new:true},(err,result)=>{
                                    //更新用户余额
                                    if(!err && !!result){
                                        //更新申请记录表
                                        let dbModel = DBModels.WithdrawcashapplyModel;
                                        dbModel.findOneAndUpdate({
                                             _id: updateditem._id,
                                         },{$set:{rechargerecord:rechargerecord2._id}}, {new: true}, (err, updateditem)=> {
                                           callback(null,'操作成功');
                                         });
                                    }
                                    else{
                                        callback('更新用户余额失败！');
                                        winston.getlog().error(`注意!!!,更新用户余额失败！:${JSON.stringify(err)},记录:${JSON.stringify(result)}`);

                                    }
                                });
                            }
                            else{
                                callback('保存用户充值记录失败');
                                winston.getlog().error(`注意!!!,保存用户充值记录失败:${JSON.stringify(err)},记录:${JSON.stringify(rechargerecord2)}`);
                            }
                        });
                    }
                    else{
                        callback('找不到用户');
                        winston.getlog().error(`注意!!!,错误:${JSON.stringify(err)},记录:${JSON.stringify(targetuser)}`);
                    }
                });
              }
              else{
                callback('已经处理过了');
              }
            }
            else{
              callback(`找不到对应的充值记录:${updateditem.rechargerecord}`);
            }
          });

        }
        else if(updateditem.status === '已支付'){
          //如果后台操作为已支付,那么仅仅修改记录的值，将申请中改为已提现（其他不变），不影响
          let rechargerecordModel =  DBModels.RechargerecordModel;
          rechargerecordModel.findOneAndUpdate({
            _id:updateditem.rechargerecord,
          },{$set:{srctype:'withdrawcash_ed'}},{new:true},(err,result)=>{
            if(!err && !!result){
              callback(null,'操作成功');
            }
            else{
              callback(`找不到充值记录:${updateditem.rechargerecord}`);
            }
          });
        }
    }
    else{
      callback('无效的记录状态');
    }

  }
  else{
    callback('找不到对应的记录');
  }

}
