const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose  = require('mongoose');
const winston = require('../../log/log.js');

let getemerygencycontact = (socket,actiondata,ctx)=>{
  let emerygencycontactModel =DBModels.UserEmerygencyContactModel;
  emerygencycontactModel.find({userid:ctx.userid},(err,list)=>{
    if(!err){
      socket.emit('getemerygencycontact_result',{list});
    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'getemerygencycontact'});
      winston.getlog().error(`获取紧急联系人失败:${err.message}`);
    }
  });
}
exports.getemerygencycontact = getemerygencycontact;
exports.insertemerygencycontact = (socket,actiondata,ctx)=>{
  let emerygencycontactModel = DBModels.UserEmerygencyContactModel;
  let obj = actiondata;
  obj.userid = ctx.userid;
  console.log(`------->${JSON.stringify(obj)}`);
  let entity = new emerygencycontactModel(obj);
  entity.save((err,result)=>{
    console.log(`err:${JSON.stringify(err)},result------->${JSON.stringify(result)}`);
    if(!err && !!result){
      socket.emit('insertemerygencycontact_result',result);
      //插入成功后返回列表
      getemerygencycontact(socket,actiondata,ctx);
    }
    else{
      socket.emit('common_err',{errmsg:'插入联系人失败',type:'insertemerygencycontact'});
      winston.getlog().error(`插入紧急联系人失败:${JSON.stringify(err)}`);
    }

  });
}

exports.deleteemerygencycontact = (socket,actiondata,ctx)=>{
  let emerygencycontactModel = DBModels.UserEmerygencyContactModel;
  emerygencycontactModel.remove({_id:actiondata._id},(err,result)=>{
    if(!err){
      socket.emit('deleteemerygencycontact_result',result);
      getemerygencycontact(socket,actiondata,ctx);
    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'deleteemerygencycontact'});
      winston.getlog().error(`删除紧急联系人失败:${err.message}`);
    }

  });
}
