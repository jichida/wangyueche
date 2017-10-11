const withdrawcash_comm = require('./withdrawcash_comm');
const DBModels = require('../../db/models.js');
const loginauth = require('../common/loginauth.js');
const config = require('../../config.js');
//插入提现申请
exports.withdrawcashapplyaddone = (socket,payloaddata,ctx)=>{
//提现金额大于0 并且提现不大于当前余额
    let userModel = DBModels.UserDriverModel;
    return withdrawcash_comm.withdrawcashapplyaddone(socket,payloaddata,ctx,
      userModel,'withdrawcashapplyaddone_result');
}

//验证
exports.withdrawcashapplyauth = (socket,payloaddata,ctx)=>{
  let globalUserauth = loginauth.globalUserauth;
  let userModel = DBModels.UserDriverModel;
  return withdrawcash_comm.withdrawcashapplyauth(socket,payloaddata,ctx,
    userModel,config.authexptime,globalUserauth,'withdrawcashapplyauth_result');
};

exports.withdrawcashapplypaid = (updateditem,callback)=>{
  let userModel = DBModels.UserDriverModel;
  return withdrawcash_comm.withdrawcashapplypaid(updateditem,callback,userModel);
}
