const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose     = require('mongoose');

exports.getnotifymessageone  = (socket,actiondata,ctx)=>{
  let notifyMessageModel = DBModels.NotifyMessageModel;
  notifyMessageModel.findOne({_id:actiondata._id},(err,result)=>{
    if(!err){
      if(!!result){
        socket.emit('getnotifymessageone_result',result);
      }
      else{
        socket.emit('common_err',{type:'getnotifymessageone',errmsg:`找不到该消息:${actiondata._id}`});
      }
    }
    else{
      socket.emit('common_err',{type:'getnotifymessageone',errmsg:err.message});
      winston.getlog().error(`获取消息页面失败:${err.message}`);
    }
  });
}

exports.getnotifymessage = (socket,actiondata,ctx)=>{
  let notifyMessageModel = DBModels.NotifyMessageModel;

  let islogin = false;
  if(ctx.hasOwnProperty('userid')){
    if(ctx.userid.toString().length > 0){
      islogin = true;
    }
  }

  let query = {};

  if(!islogin){
    query =  {
      $and: [
        {$or: [{subtype:'msg'}, {subtype:null}]},
        {$or: [{messagetype:'driver'}, {messagetype:'all'}]}
      ]
    };
  }
  else{
    query =   {
        $and: [
          {$or: [{subtype:'msg'}, {subtype:null}]},
          {$or: [{messagetype:'driver'}, {messagetype:'all'}]},
          {$or: [{driveruserid: ctx.userid}, {driveruserid: null}]}
        ]
      };
  }

  notifyMessageModel.paginate(query,actiondata.options,(err,list)=>{
    if(!err){
      socket.emit('getnotifymessage_result',{result:list});
    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'getnotifymessage'});
      winston.getlog().error(`获取到系统信息失败${err.message}`);
    }
  });

}
