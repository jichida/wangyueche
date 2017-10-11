const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose     = require('mongoose');

exports.getoftenuseaddress = (socket,actiondata,ctx)=>{
  let userModel = DBModels.UserRiderModel;
  userModel.findOne({_id:ctx.userid},(err,userEntity)=>{
    if(!err){
      socket.emit('getoftenuseaddress_result', {oftenuseaddress:userEntity.oftenuseaddress});
    }
    else{
      socket.emit('common_err',{type:'getoftenuseaddress',errmsg:`获取我的优惠券失败:${err.message}`});
      winston.getlog().error(`获取常用地址失败:${err.message}`);
    }

  });
}

exports.setoftenuseaddress = (socket,actiondata,ctx)=>{
  let userModel = DBModels.UserRiderModel;
  userModel.findByIdAndUpdate(ctx.userid,{oftenuseaddress:actiondata},{new: true},(err,userEntity)=>{
    if(!err){
      socket.emit('setoftenuseaddress_result', {oftenuseaddress:userEntity.oftenuseaddress});
    }
    else{
      socket.emit('common_err',{type:'setoftenuseaddress',errmsg:`获取我的优惠券失败:${err.message}`});
      winston.getlog().error(`设置常用地址失败:${err.message}`);  
    }
  });
}
