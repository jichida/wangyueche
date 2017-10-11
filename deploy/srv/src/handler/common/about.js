const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose  = require('mongoose');
const winston = require('../../log/log.js');

exports.getabouthtml = (socket,actiondata,ctx)=>{
  let aboutModel = DBModels.AboutModel;
  aboutModel.findOne({keyname:actiondata.keyname},(err,aboutdoc)=>{
    if(!err){
      if(!!aboutdoc){
        socket.emit('getabouthtml_result',{aboutdoc});
      }
      else{
        socket.emit('getabouthtml_result',{aboutdoc:{
          keyname:actiondata.keyname,
          title:'后台未设置',
          desc:'请联系管理员设置后台信息',
        }});
      }
    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'getabouthtml'});
      winston.getlog().error(`获取关于页面失败:${err.message}`);
    }
  });
}
