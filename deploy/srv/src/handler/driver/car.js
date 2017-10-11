const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let DBModelsPlatform = require('../../db/modelsplatform.js');
let mongoose  = require('mongoose');
const winston = require('../../log/log.js');
const userlogin = require('./driveruserlogin.js');

let carsetdefault = (socket,actiondata,ctx)=>{
  let carid = actiondata.carid;
  if(typeof carid === 'string'){
    carid =  mongoose.Types.ObjectId(carid);
  }
  let Platform_baseInfoVehicleId = actiondata.Platform_baseInfoVehicleId;
  let Platform_baseInfoVehicle = actiondata.Platform_baseInfoVehicle;
  let userModel  = DBModels.UserDriverModel;
  userModel.findOneAndUpdate({_id:ctx.userid},{$set:{defaultmycar:carid,Platform_baseInfoVehicleId,Platform_baseInfoVehicle}},{new:true},(err,user)=>{
      if(!err && !!user){
          socket.emit('serverpush_userinfo',userlogin.getdatafromuser(user));
      }
  });
};
exports.carsetdefault = carsetdefault;

let cargetall = (socket,actiondata,ctx)=>{
//获取所有自己的车
  let dbModel = DBModels.MycarModel;
  dbModel.find({creator:ctx.userid},(err,list)=>{
    if(!err){
        socket.emit('cargetall_result',{list});
    }
    else{
        winston.getlog().error(`获取所有自己的车：${err.message}`);
    }
  });
}
//获取所有颜色
exports.carcreate = (socket,actiondata,ctx)=>{
//新建一辆车
    let entitydata = actiondata.data;
    entitydata.creator = ctx.userid;
    entitydata.created_at = new Date();

    let Platform_baseInfoVehicle = actiondata.Platform_baseInfoVehicle;
    let DBPlatformModel = DBModelsPlatform.Platform_baseInfoVehicleModel;
    let entityCar = new DBPlatformModel(Platform_baseInfoVehicle);
    entityCar.save((err,caritem)=>{
      if(!err){
        entitydata.Platform_baseInfoVehicleId = caritem._id;
        let dbModel = DBModels.MycarModel;
        let entity = new dbModel(entitydata);
        entity.save((err,newitem)=>{
            if(!err){
                cargetall(socket,actiondata,ctx);
                dbModel.count({creator: ctx.userid
                }, function(err, c) {
                  if(!err && c==1){
                    carsetdefault(socket,{
                      carid:newitem._id,
                      Platform_baseInfoVehicleId:caritem._id,
                      Platform_baseInfoVehicle:caritem
                    },ctx);
                  }
                  socket.emit('carcreate_result',{newitem});
                });
            }
            else{
                socket.emit('common_err',{errmsg:'新建汽车失败',type:'carcreate'});
                winston.getlog().error(`新建汽车失败:${err.message}`);
            }
        });
      }
      else{
        socket.emit('common_err',{errmsg:'新建汽车失败',type:'carcreate'});
        winston.getlog().error(`新建汽车失败:${err.message}`);
      }
    })



}

exports.cardelete = (socket,actiondata,ctx)=>{
//删除一辆车
  let dbModel = DBModels.MycarModel;
  dbModel.findOneAndRemove({
        _id: actiondata._id
    }, (err, result)=> {;
      if(!err){
        socket.emit('cardelete_result',{_id:actiondata._id});
        cargetall(socket,actiondata,ctx);
      }
      else{
          socket.emit('common_err',{errmsg:'删除汽车失败',type:'cardelete'});
      }
    });
}

exports.cargetall = cargetall;

exports.carupdate = (socket,actiondata,ctx)=>{
//修改一辆车
  let dbModel = DBModels.MycarModel;
  dbModel.findOneAndUpdate({
        _id: actiondata._id
    },actiondata.data,  {new: true},(err, updateditem)=> {
      if(!err && updateditem){
        socket.emit('carupdate_result',{updateditem});
        cargetall(socket,actiondata,ctx);
      }
     else if(err){
         socket.emit('common_err',{errmsg:'修改我的车辆失败',type:'carupdate'});
         winston.getlog().error(`修改我的车辆失败:${err.message}`);
      }
    });
}



//===================================================================
exports.cargetallbrands = (socket,actiondata,ctx)=>{
//获取所有品牌
  let dbModel = DBModels.CarbrandModel;
  dbModel.find({},(err,list)=>{
    if(!err){
        socket.emit('cargetallbrands_result',{list});
    }
    else{
        winston.getlog().error(`获取所有品牌${err.message}`);
    }
  });
}

exports.cargetallmodelfrombrandid = (socket,actiondata,ctx)=>{
//获取某一品牌的所有型号
  let dbModel = DBModels.CarModelModel;
  dbModel.find({carbrandid:actiondata.carbrandid},(err,list)=>{
    if(!err){
        socket.emit('cargetallmodelfrombrandid_result',{list});
    }
    else{
        winston.getlog().error(`获取所有型号${err.message}`);
    }
  });
}

exports.cargetallcolors = (socket,actiondata,ctx)=>{
//获取所有颜色
  let dbModel = DBModels.CarColorModel;
  dbModel.find({},(err,list)=>{
    if(!err){
        socket.emit('cargetallcolors_result',{list});
    }
    else{
        winston.getlog().error(`获取所有颜色${err.message}`);
    }
  });
}
