let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const loginauth = require('../common/loginauth.js');
const Chance = require('chance');
const chance = new Chance();
const uuid = require('uuid');
const rate = require('../common/rate.js');
const moment = require('moment');
const _ = require('lodash');

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
    approvalrejectseason:user.approvalrejectseason,
    registertype:user.registertype,
    idcard:user.idcard,//身份证号<---
    bankname:user.bankname,//银行名字<---
    bankaccount:user.bankaccount,//银行账号<---
    huji:user.huji,//户籍
    PhotoandCarmanURL:user.PhotoandCarmanURL,//人车合影
    PhotoJiandukaURL:user.PhotoJiandukaURL,//监督卡照片
    PhotoServiceicenseURL:user.PhotoServiceicenseURL,//服务资格证
    CarrunPhotoIdURL:user.CarrunPhotoIdURL,//机动车行驶证
    Platform_baseInfoDriverId:user.Platform_baseInfoDriverId,
    Platform_baseInfoDriver:user.Platform_baseInfoDriver,
    balance:user.balance,
    defaultmycar:user.defaultmycar,
    Platform_baseInfoVehicleId:user.Platform_baseInfoVehicleId,
    Platform_baseInfoVehicle:user.Platform_baseInfoVehicle,
    avatarURL:user.avatarURL|| config.defaultprofileimage,//司机头像
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
          LicenseId:user.Platform_baseInfoDriver.LicenseId,
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
      userModel.findByIdAndUpdate(userid,{updated_at:moment().format('YYYY-MM-DD HH:mm:ss')},{new: true},(err,result)=>{
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

exports.getrealnameprofile = (socket,actiondata,ctx)=>{
  let userModel = DBModels.UserDriverModel;
  userModel.findOne({_id:ctx.userid},(err,user)=>{
    if(!err && !!user){
      socket.emit('getrealnameprofile_result',getdatafromuser(user));
    }
    else{
      socket.emit('common_err',{err:'找不到该用户',type:'getrealnameprofile'});
    }
  });
};

exports.fillrealnameprofile = (socket,actiondata,ctx)=>{
  const userModel = DBModels.UserDriverModel;
  userModel.findOne({_id:ctx.userid},(err,userobj)=>{
    if(!err && !!userobj){
      let userinfonew = actiondata.data;
      ///admin/src/components/userdrivers/index.js 中可编辑部分
      let userinfoall = {
        registertype:userobj.registertype,
        avatarURL:userobj.avatarURL,//司机头像
        idcard:userobj.idcard,//身份证号<---
        bankname:userobj.bankname,//银行名字<---
        bankaccount:userobj.bankaccount,//银行账号<---
        huji:userobj.huji,//户籍
        PhotoandCarmanURL:userobj.PhotoandCarmanURL,//人车合影
        PhotoJiandukaURL:userobj.PhotoJiandukaURL,//监督卡照片
        PhotoServiceicenseURL:userobj.PhotoServiceicenseURL,//服务资格证
        CarrunPhotoIdURL:userobj.CarrunPhotoIdURL,//机动车行驶证
        Platform_baseInfoDriverId:userobj.Platform_baseInfoDriverId,
        Platform_baseInfoDriver:{
            Address:userobj.Platform_baseInfoDriver.Address,//	是	数字型	F6	注册地行政区划代码	车辆在平台的注册地，见GB/T2260

            DriverName:userobj.Platform_baseInfoDriver.DriverName,	// <---否字符型V64 机动车驾驶员姓名
            DriverPhone:userobj.Platform_baseInfoDriver.DriverPhone,	// <---是字符型V32 驾驶员手机号
            DriverGender:userobj.Platform_baseInfoDriver.DriverGender,	//<--- 是字符型V2 驾驶员性别见JT/ T 697. 7- 2014中4. 1. 2. 1. 3
            DriverBirthday:userobj.Platform_baseInfoDriver.DriverBirthday,	// 是数字型F8 出生日期YYYYMMDD
            DriverNationality:userobj.Platform_baseInfoDriver.DriverNationality,	// 杏字符型V32 国籍
            DriverNation:userobj.Platform_baseInfoDriver.DriverNation,	//<--- 是字符型V32 驾驶员民族见JT/T 697. 7-2014中4. 1. 2. 1. 7
            DriverMaritalStatus:userobj.Platform_baseInfoDriver.DriverMaritalStatus,	//<--- 杏字符型V64 驾驶员婚姻状况未婚;已婚;离异
            DriverLanguageLevel:userobj.Platform_baseInfoDriver.DriverLanguageLevel,	// 否字符型V64 驾驶员外语能力
            DriverEducation:userobj.Platform_baseInfoDriver.DriverEducation,	// 否字符型V64 驾驶员学历见JT/T 697. 7-2014中4. 1. 2. 1. 11

            DriverCensus:userobj.Platform_baseInfoDriver.DriverCensus,	//	否	字符型	V256	户口登记机关名称
            DriverAddress:userobj.Platform_baseInfoDriver.DriverAddress,	//	否	字符型	V256	户口住址或长住地址 阶iv町
            DriverContactAddress:userobj.Platform_baseInfoDriver.DriverContactAddress,//<---	是	字符型	V256	驾驶员通信地址
            PhotoId:userobj.Platform_baseInfoDriver.PhotoId,	//	否	字符型	V128	驾驶员照片文件编号	FTPS  接口传输;格式 照片文件通过 6. 1 节jpg; 按照居民身份证照片的标准
            PhotoIdURL:userobj.Platform_baseInfoDriver.PhotoIdURL,	//<---	否	字符型	V128	驾驶员照片文件编号	FTPS  接口传输;格式 照片文件通过 6. 1 节jpg; 按照居民身份证照片的标准
            LicenseId:userobj.Platform_baseInfoDriver.LicenseId,	//	是	字符型	V32	机动车驾驶证号
            LicensePhotoIdURL:userobj.Platform_baseInfoDriver.LicensePhotoIdURL,	//<---	否	字符型	V128机动车驾驶证扫描件文件编号扫描件文件通过 6. 1节FTPS 接口传输;格式lPg
            DriverType:userobj.Platform_baseInfoDriver.DriverType,	//<---	否	字符型	V16	准驾车型见 JT/T 697. 7-2014中 5. 16
            GetDriverLicenseDate:userobj.Platform_baseInfoDriver.GetDriverLicenseDate,//<---	是 数字型 F8 初次领取驾驶证日期 YYYYMMDD
            DriverLicenseOn:userobj.Platform_baseInfoDriver.DriverLicenseOn,//	 是 数字型  F8  驾驶证有效期限起  YYYYMMDD
            DriverLicenseOff:userobj.Platform_baseInfoDriver.DriverLicenseOff,//	            是   数字型   F8      驾驶证有效期限止    YYYYMMDD

            TaxiDriver:userobj.Platform_baseInfoDriver.TaxiDriver,//<---	                   是   数字型   F1      是否出租汽车驾驶员	。:否
            CertificateNo:userobj.Platform_baseInfoDriver.CertificateNo,	//<---                         是   字符型  V128    网络预约出租汽车驾驶员资格证号
            NetworkCarIssueOrganization:userobj.Platform_baseInfoDriver.NetworkCarIssueOrganization,	//<--- 是	字符型	V256网络预约出租汽车驾驶员证发证机构
            NetworkCarIssueDate:userobj.Platform_baseInfoDriver.NetworkCarIssueDate,//		是	数字型	F8	资格证发证日期	YYYYMMDD
            GetNetworkCarProofDate:userobj.Platform_baseInfoDriver.GetNetworkCarProofDate,//		是	数字型	F8	初次领取资格证日期	YYYYMMDD
            NetworkCarProofOn:userobj.Platform_baseInfoDriver.NetworkCarProofOn,//		是	数字型	F8	资格证有效起始日期	YYYYMMDD
            NetworkCarProofOff:userobj.Platform_baseInfoDriver.NetworkCarProofOff,//		是	数字型	F8	资格证有效截止日期	YYYYMMDD
            RegisterDate:userobj.Platform_baseInfoDriver.RegisterDate,//	 是数字型F8报备日期驾驶员信息向服务所在 地出租汽车行政主管部 门报备日期 YYYYM-MDD

            FullTimeDriver:userobj.Platform_baseInfoDriver.FullTimeDriver,//	 否数字型F1  是否专职驾驶员1:是  0:否
            InDriverBlacklist:userobj.Platform_baseInfoDriver.InDriverBlacklist,//	否数字型F1是否在驾驶员黑名单内	1.是。:否
            CommercialType:userobj.Platform_baseInfoDriver.CommercialType,//	  是数字型F1服务类型1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
            ContractCompany:userobj.Platform_baseInfoDriver.ContractCompany,	//是字符型V256驾驶员合同〈或协议〉 签署公司全称
            ContractOn:userobj.Platform_baseInfoDriver.ContractOn,//	是数字型F8   合同或协议)有效期起 YYYYMMDD
            ContractOff:userobj.Platform_baseInfoDriver.ContractOff,//	是数字型F8	合同(或协议)有效期止 YYYYMMDD

            EmergencyContact:userobj.Platform_baseInfoDriver.EmergencyContact,	//	否	字符型V64	紧急情况联系人
            EmergencyContactPhone:userobj.Platform_baseInfoDriver.EmergencyContactPhone,	//否字符型V32 紧急情况联系人电话手机号
            EmergencyContactAddress:userobj.Platform_baseInfoDriver.EmergencyContactAddress,	//否字符型V256  紧急情况联系人通信地址
        },

        defaultmycar:userobj.defaultmycar,
        Platform_baseInfoVehicleId:userobj.Platform_baseInfoVehicleId,
        Platform_baseInfoVehicle:{
          Address:userobj.Platform_baseInfoVehicle.defaultmycar,		//是	数字型	F6 行政区划代码	车辆报备地行政区划代码，地市级 ，应符合GB/T2260

          VehicleNo:userobj.Platform_baseInfoVehicle.VehicleNo,//<---	是	字符型	V32	车辆号牌
          PlateColor:userobj.Platform_baseInfoVehicle.PlateColor,//	是	字符型	V32	车牌颜色	见 J T/T 697. 7-2014 中5.6
          Seats:userobj.Platform_baseInfoVehicle.Seats,//<---	是	数字型	V10	核定载客位
          Brand:userobj.Platform_baseInfoVehicle.Brand,//	是	字符型	V64	车辆厂牌
          Model:userobj.Platform_baseInfoVehicle.Model,//	是	字符型	V64	车辆型号
          VehicleType:userobj.Platform_baseInfoVehicle.VehicleType,//	是	字符型	V64	车辆类型	以机动车行驶证为准
          OwnerName:userobj.Platform_baseInfoVehicle.OwnerName,//	是	字符型	V64	车辆所有人	应与《机动车登记证书》所注明的车辆所有人一致
          VehicleColor:userobj.Platform_baseInfoVehicle.VehicleColor,//	是	字符型	V32	车身颜色

          EngineId:userobj.Platform_baseInfoVehicle.EngineId,//	是	字符型	V32	发动机号	以机动车行驶证为准
          VIN:userobj.Platform_baseInfoVehicle.VIN,//	是	字符型	F17	车辆VIN码	以机动车行驶证为准
          CertifyDateA:userobj.Platform_baseInfoVehicle.CertifyDateA,//	是	数字型	F8	车辆注册日期	以机动车行驶证为准
          FuelType:userobj.Platform_baseInfoVehicle.FuelType,//	是	字符型	V32	牢辆燃料类型	见 JT/T697. 7-2014  中4. 1.4. 15
          EngineDisplace:userobj.Platform_baseInfoVehicle.EngineDisplace,//	是	字符型	V32	发动机排量	单位 :毫升

          PhotoId:userobj.Platform_baseInfoVehicle.PhotoId,//	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
          PhotoIdURL:userobj.Platform_baseInfoVehicle.PhotoIdURL,//<---	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
          Certificate:userobj.Platform_baseInfoVehicle.Certificate,//<---	否	字符型	V64	运输证字号	见 JT/T  415-2006  中5. 4.1，地市字别可包含三个汉字
          TransAgency:userobj.Platform_baseInfoVehicle.TransAgency,//	是	字符型	V256	车辆运输证发证机构	全称
          TransArea:userobj.Platform_baseInfoVehicle.TransArea,//	是	字符型	V256	车辆经营区域
          TransDateStart:userobj.Platform_baseInfoVehicle.TransDateStart,//	是	数字型	F8	车辆运输证有效期起	YYYYMMDD 元素名称	必选	类型	长度	字段名称	描	述
          TransDateStop:userobj.Platform_baseInfoVehicle.TransDateStop,//	是	数字型	F8	车辆运输证有效期止	YYYYMMDD
          CertifyDateB:userobj.Platform_baseInfoVehicle.CertifyDateB,//	是	数字型	F8	车辆初次登记日期	YYYYMMDD
          FixState:userobj.Platform_baseInfoVehicle.FixState,//	是字符型	V64	车辆检修状态	数据取值有效范围 :0 :未检修1.已检修2 :未知
          NextFixDate:userobj.Platform_baseInfoVehicle.NextFixDate,//	否	数字型	F8	车辆下次年检时间
          CheckState:userobj.Platform_baseInfoVehicle.CheckState,//<---	是	字符型	F2	车辆年度审验状态	见 JT/T 415-2006 中5.4.4
          FeePrintId:userobj.Platform_baseInfoVehicle.FeePrintId,//	是	字符型	V32	发票打印设备序列号

          GPSBrand:userobj.Platform_baseInfoVehicle.GPSBrand,//	是	字符型	V2 56	卫星定位装置品牌
          GPSModel:userobj.Platform_baseInfoVehicle.GPSModel,//	是	字符型	V64	卫星定位装置型号
          GPSIMEI:userobj.Platform_baseInfoVehicle.GPSIMEI,//	否	字符型	V128	卫星定位装置IMEI号
          GPSlnstallDate:userobj.Platform_baseInfoVehicle.GPSlnstallDate,//	是	数字型	F8	卫星定位设备安装日期	YYYYMMDD

          RegisterDate:userobj.Platform_baseInfoVehicle.RegisterDate,//	是	数字型	F8	报备日期	车辆信息向服务所在地出租汽车行政主管部门报备 日期 YYYYMMDD
          CommercialType:userobj.Platform_baseInfoVehicle.CommercialType,//	是	数字型	F1	服务类型	1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
          FareType:userobj.Platform_baseInfoVehicle.FareType,//	是	字符型	V16	运价类型编码由网约车公司定义，与 A. 4.6 运价信息接口一一对 应
        },
      };

      userinfoall = _.merge(userinfoall,userinfonew);

      const saveDriverCar = require('./driverandcar.js');
      saveDriverCar.presave_driver(userinfoall,ctx.userid,(err,result)=>{
        //================================================================
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
    }//不考虑失败！
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
      newUser.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
      newUser.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
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
      newUser.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
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
