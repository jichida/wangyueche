const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');

exports.gettourbus = (socket,actiondata,ctx)=>{
  let tourbusinfoModel = DBModels.TourbusinfoModel;
  tourbusinfoModel.find({isenabled:true},(err,list)=>{
    if(!err){
      socket.emit('gettourbus_result',{list});
    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'gettourbus'});
      winston.getlog().error(`获取到旅游大巴信息失败${err.message}`);
    }
  });
}
