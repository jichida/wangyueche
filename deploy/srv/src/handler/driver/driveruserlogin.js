let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const loginauth = require('../common/loginauth.js');
const Chance = require('chance');
const chance = new Chance();
const uuid = require('node-uuid');
const rate = require('../common/rate.js');

exports.queryuserbalance = (socket,actiondata,ctx)=>{
  let userModel = DBModels.UserDriverModel;
  userModel.findOne({_id:ctx.userid},(err,userEntity)=>{
    if(!err && !!userEntity){
      socket.emit('queryuserbalance_result', {balance:userEntity.balance});
    }
    else{
      console.log(`${JSON.stringify(err)},${JSON.stringify(userEntity)},id:${ctx.userid}`);
      socket.emit('common_err',{errmsg:'找不到该用户',type:'queryuserbalance'});
    }
  });
}

exports.logout = (socket,actiondata,ctx)=>{
  //注：后续有operatelogout消息，需要用到ctx.故放在operatelogout中
  PubSub.unsubscribe( ctx.userReqSubscriber );
  PubSub.unsubscribe( ctx.userUserSubscriber );

  delete ctx.userid;
  ctx.nearbyrequestlist = [];
  ctx.username = '';
  ctx.approvalstatus = '';
  ctx.registertype = '';
  ctx.usertype = 'driver';
  ctx.curtriprequestid = '0';
  ctx.curtriporderid = '0';
  ctx.curorder={};
  ctx.currequest={};
  ctx.driverinfo = {};

  socket.emit('logout_result',{});
};

let userloginsuccess =(socket,ctx)=>{
   socket.emit('serverpush_userloginsuccess_notify', {servertime:new Date()});
  //司机订单恢复逻辑（待定）
  //找到最后一个订单信息
    ctx.nearbyrequestlist = [];
    ctx.bizstatus = 4;//4.停运
    ctx.driverstatus = '未接单';
    console.log("司机用户登录成功=======》" + ctx.userid);
    let TripOrderModel = DBModels.TripOrderModel;
    let queryobj = {
      driveruserid:ctx.userid,
    };
    //{path:'driveruserid',model:'userdriver',select:'username profile.nickname profile.avatar'},
    TripOrderModel.find(queryobj,null,{skip: 0, limit: 1,sort:{updated_at:-1}}).populate([
      {path:'triprequest',model:'triprequest'},
    ]).exec((err,list)=>{
      if(!err && list.length > 0){
        let triporder = list[0];
        let triprequest = triporder.triprequest;//已接单,待上车(到达起始点）,行程中
        if(
          triprequest.requeststatus === '已接单' ||
          triprequest.requeststatus === '待上车' ||
          triprequest.requeststatus === '行程中'
        )
        {
          ctx.driverstatus = '已接单';
          ctx.bizstatus = 2;//2.接单
          //初始化上下文数据！
          //设置上下文
          ctx.fareid = triporder.resultpricedetail.fareid;
          ctx.curtriporderid = triporder._id;
          ctx.curtriprequestid=triprequest._id;
          if(triprequest.requeststatus === '行程中'){
            ctx.bizstatus = 1;//1:载客
            ctx.realtimeprice = triporder.ctxrealtimeprice;
          }
          //司机订阅这个请求
          PubSub.subscribe(`request.${triprequest._id}`, ctx.userReqSubscriber);

          triporder.triprequest = triprequest._id;
          console.log("恢复一个订单=======》" + JSON.stringify({triprequest,triporder}));
          socket.emit('serverpush_restoreorder', {triprequest,triporder});
        }
      }
    });
    //订阅这个请求
    PubSub.subscribe(`user.driver.${ctx.userid}`, ctx.userUserSubscriber);

};

exports.userloginsuccess = userloginsuccess;

let getdatafromuser =(user)=>{
  return {
    username: user.username,
    userid:user._id,
    approvalstatus:user.approvalstatus,
    registertype:user.registertype,
    idcard:user.idcard,//身份证号<---
    bankname:user.bankname,//银行名字<---
    bankaccount:user.bankaccount,//银行账号<---
    huji:user.huji,//户籍
    avatarURL:user.avatarURL,//司机头像
    PhotoandCarmanURL:user.PhotoandCarmanURL,//人车合影
    PhotoJiandukaURL:user.PhotoJiandukaURL,//监督卡照片
    PhotoServiceicenseURL:user.PhotoServiceicenseURL,//服务资格证
    CarrunPhotoldURL:user.CarrunPhotoldURL,//机动车行驶证
    Platform_baseInfoDriverId:user.Platform_baseInfoDriverId,
    Platform_baseInfoDriver:user.Platform_baseInfoDriver,
    balance:user.balance,
    defaultmycar:user.defaultmycar,
    Platform_baseInfoVehicleId:user.Platform_baseInfoVehicleId,
    Platform_baseInfoVehicle:user.Platform_baseInfoVehicle,
    avatarURL:user.avatarURL|| config.defaultprofileimage,
  };
}

exports.getdatafromuser = getdatafromuser;
let setloginsuccess = (socket,ctx,user)=>{
   ctx.username = user.username;
   ctx.userid = user._id;//for test only
   if(typeof ctx.userid === "string"){
      ctx.userid = mongoose.Types.ObjectId(ctx.userid);
   }
   ctx.approvalstatus = user.approvalstatus;
   ctx.registertype = user.registertype;
   ctx.starnum = user.starnum|| 0;
   if(user.approvalstatus === '已审核'){

      ctx.driverinfo = {
          avatarURL:user.avatarURL|| config.defaultprofileimage,
          //平台可能用到
          Licenseld:user.Platform_baseInfoDriver.Licenseld,
          VehicleRegionCode:user.Platform_baseInfoVehicle.VehicleRegionCode,//车辆注册地
          //请求时用到
          PhotoandCarmanURL:user.PhotoandCarmanURL,//人车合影

          starnum:ctx.starnum,//星级
          DriverName:user.Platform_baseInfoDriver.DriverName,//司机名
          DriverPhone:user.Platform_baseInfoDriver.DriverPhone,//司机电话
          DriverGender:user.Platform_baseInfoDriver.DriverGender || '男',//司机姓别

          PlateColor:user.Platform_baseInfoVehicle.PlateColor,//车辆颜色
          Seats:user.Platform_baseInfoVehicle.Seats || 0,//核定载客位
          VehicleNo:user.Platform_baseInfoVehicle.VehicleNo,//车牌号
          Brand:user.Platform_baseInfoVehicle.Brand,//车辆厂牌
          Model:user.Platform_baseInfoVehicle.Model,//车辆型号
      };
      if(ctx.starnum === 0){
        rate.getrateuser(ctx.userid,(r)=>{
          ctx.driverinfo.starnum = r;
        });
      }
    }

    let profile = {
      nickname:`司机${chance.string({length: 4,pool: '0123456789'})}`,
      avatar:config.defaultprofileimage
    };
    if(user.profile){
      profile = user.profile;
    }

    let userdata = getdatafromuser(user);
    userdata.profile = profile;
    userdata.token =  jwt.sign({
          exp: Math.floor(Date.now() / 1000) + config.loginuserexptime,
          _id:user._id,
        },config.secretkey, {});
    userdata.loginsuccess =  true;

    socket.emit('login_result', userdata);
    userloginsuccess(socket,ctx);

    //写入登录日志
    let loginlogModel = DBModels.UserDriverLoginLogModel;
    let loginlogentity = new loginlogModel({
                        creator:user._id,
                        username:user.username
                      });
   loginlogentity.save((err,loginlog)=>{
   });
};
exports.setloginsuccess = setloginsuccess;
exports.loginwithtoken = (socket,actiondata,ctx)=>{
  try {
      let decodeduser = jwt.verify(actiondata.token, config.secretkey);
      console.log("decode user===>" + JSON.stringify(decodeduser));
      let userid = decodeduser._id;
      let userModel = DBModels.UserDriverModel;
      userModel.findByIdAndUpdate(userid,{updated_at:new Date()},{new: true},(err,result)=>{
        if(!err && !!result){
          setloginsuccess(socket,ctx,result);
        }
        else{
          socket.emit('common_err',{err:'找不到该用户',type:'login'});
        }
      });

    //  PubSub.publish(userid, {msg:'allriders',data:'bbbb',topic:'name'});
  } catch (e) {
    console.log("invalied token===>" + JSON.stringify(actiondata.token));
    console.log("invalied token===>" + JSON.stringify(e));
    socket.emit('common_err',{err:e.message,type:'login'});
  }

}



exports.fillrealnameprofile = (socket,actiondata,ctx)=>{
  const saveDriverCar = require('./driverandcar.js');
  saveDriverCar.presave_driver(actiondata.data,ctx.userid,(err,result)=>{
    //================================================================
    let userModel = DBModels.UserDriverModel;
    actiondata.data.approvalstatus = '待审核';
    //insert after approval
    userModel.findByIdAndUpdate(ctx.userid,{$set:actiondata.data},{new: true},(err,user)=>{
      console.log('userEntity------------>' + JSON.stringify(user));
      if(!err && !!user){
        socket.emit('fillrealnameprofile_result',getdatafromuser(user));
      }
      else{
        socket.emit('common_err',{errmsg:`实名保存失败`,type:'fillrealnameprofile'});
      }
    });
  });
};


let doregisteruser = (socket,newUser,ctx,socketerrstring,callbackuserexits)=>{
  let globalUserauth = loginauth.globalUserauth;
  console.log(`doregisteruser=>${JSON.stringify(globalUserauth)}`);
   if(!globalUserauth.hasOwnProperty(newUser.username)){
    socket.emit(socketerrstring,{errmsg:'请先发送验证码',title:'注册',type:'register'});
    return;
  }
  if(globalUserauth[newUser.username].authcode != newUser.authcode){
    socket.emit(socketerrstring,{errmsg:'验证码不对',title:'注册',type:'register'});
    return;
  }
  let nowDate = new Date();
  let min2Ago = new Date(nowDate.getTime() - 1000 * config.authexptime);
  if(min2Ago > globalUserauth[newUser.username].updated_at){
    socket.emit(socketerrstring,{errmsg:'验证码已过期',title:'注册',type:'register'});
    return;
  }

  let dbModel = DBModels.UserDriverModel;
  dbModel.findOne({ username: newUser.username }, (err, user)=> {
    if (err) {
      socket.emit(socketerrstring,{errmsg:err.message});
      return;
    }
    if (user) {
      callbackuserexits(false,user);
      return;
    }
    let salt = uuid.v4();
    loginauth.hashPassword(newUser.password,salt,(err,hashedpassword)=>{
      newUser.passwordhash = hashedpassword;
      newUser.passwordsalt = salt;
      newUser.created_at = new Date();
      newUser.updated_at = new Date();
      newUser.profile = {
        nickname:`司机${chance.string({length: 4,pool: '0123456789'})}`,
        avatar:config.defaultprofileimage
      };

      let entity = new DBModels.UserDriverModel(newUser);
      entity.save((err, user, numberAffected) =>{
        if(err){
          return;
        }
        if (numberAffected === 1) {
          //Register OK
          console.log("Register ok");
          callbackuserexits(true,user);
        }
      });
    });
  });
}

let tryregisteruser = (socket,actiondata,ctx,newUser,socketerrstring,callback)=>{
  newUser.username = actiondata.username;
  newUser.authcode = actiondata.authcode;
  newUser.password = actiondata.password;
  newUser.weixinopenid = actiondata.weixinopenid;
  newUser.invitecode = chance.string({length: 8,pool: '0123456789'});//8位数字邀请码
  doregisteruser(socket,newUser,ctx,socketerrstring,callback);//无邀请码用户

}

exports.register = (socket,actiondata,ctx)=>{
  let newUser = {};
  tryregisteruser(socket,actiondata,ctx,newUser,'common_err',(isok,user)=>{
     console.log(`register:${isok}`);
     if(isok){
        setloginsuccess(socket,ctx,user);
        socket.emit('register_result',{user});
     }
     else{
        socket.emit('common_err',{errmsg:'用户已存在',title:'注册',type:'register'});
     }
  });

}


exports.findpwd = (socket,actiondata,ctx)=>{
  let newUser = actiondata;
  let globalUserauth = loginauth.globalUserauth;
  if(!globalUserauth.hasOwnProperty(newUser.username)){
    socket.emit('common_err',{errmsg:'请先发送验证码',type:'findpwd'});
    return;
  }
  if(globalUserauth[newUser.username].authcode != newUser.authcode){
    socket.emit('common_err',{errmsg:'验证码不对',type:'findpwd'});
    return;
  }
  let nowDate = new Date();
  let min2Ago = new Date(nowDate.getTime() - 1000 * config.authexptime);
  if(min2Ago > globalUserauth[newUser.username].updated_at){
    socket.emit('common_err',{errmsg:'验证码已过期',type:'findpwd'});
    return;
  }

  let dbModel = DBModels.UserDriverModel;
  dbModel.findOne({ username: newUser.username }, (err, user)=> {
    if (err) {
      socket.emit('common_err',{errmsg:err.message,type:'findpwd'});
      return;
    }
    if (!user) {
      socket.emit('common_err',{errmsg:'用户不存在',type:'findpwd'});
      return;
    }
    let salt = uuid.v4();
    loginauth.hashPassword(newUser.password,salt,(err,hashedpassword)=>{
      newUser.passwordhash = hashedpassword;
      newUser.passwordsalt = salt;
      newUser.updated_at = new Date();
      dbModel.findOneAndUpdate({_id:user._id},{$set:newUser},{new:true},(err,result)=>{
        if(!err && !!result){
          socket.emit('findpwd_result',{});
        }
        else{
          socket.emit('common_err',{errmsg:'用户不存在',type:'findpwd'});
        }
      });
    });
  });

}


exports.loginuser = (socket,actiondata,ctx)=>{
  let oneUser = actiondata;
  let dbModel = DBModels.UserDriverModel;
  dbModel.findOne({ username: oneUser.username }, (err, user)=> {
    if (!!err) {
      socket.emit('common_err',{errmsg:err.message,type:'login'});
      return;
    }
    if (!user) {
      socket.emit('common_err',{errmsg:'用户名或密码错误',type:'login'});
      return;
    }
    loginauth.hashPassword(oneUser.password, user.passwordsalt, (err, passwordHash)=> {
      if(!err && !!passwordHash){
        if (passwordHash === user.passwordhash) {
          setloginsuccess(socket,ctx,user);
          return;
        }
      }
      socket.emit('common_err',{errmsg:'用户名或密码错误',type:'login'});
    });
  });

}
