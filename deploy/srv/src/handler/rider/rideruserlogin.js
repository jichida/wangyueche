let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
let dbplatform = require('../../db/modelsplatform.js');
const Chance = require('chance');
const chance = new Chance();
const coupon = require('./mycoupon.js');
const oftenuseaddress = require('./oftenuseaddress.js');
const rate = require('../common/rate.js');
const loginauth = require('../common/loginauth.js');
const moment = require('moment');

exports.queryuserbalance = (socket,actiondata,ctx)=>{
  let userModel = DBModels.UserRiderModel;
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

let userloginsuccess =(socket,ctx)=>{
  socket.emit('serverpush_userloginsuccess_notify', {servertime:new Date()});
//乘客端订单恢复逻辑（待定）
//找到最后一个订单信息
    console.log("乘客用户登录成功=======》" + ctx.userid);
    let TripOrderModel = DBModels.TripOrderModel;
    let queryobj = {
      rideruserid:ctx.userid,
      triptype:{$in:['快车','出租车','代驾']}
    };
    //{path:'driveruserid',model:'userdriver',select:'username profile.nickname profile.avatar'},
    TripOrderModel.find(queryobj,null,{skip: 0, limit: 1,sort:{updated_at:-1}}).populate([
      {path:'triprequest',model:'triprequest'},
    ]).exec((err,list)=>{
      if(!err && list.length > 0){
        let triporder = list[0];
        let triprequest = triporder.triprequest;//请求中,已接单,待上车(到达起始点）,行程中
        if(triprequest.requeststatus === '请求中' ||
          triprequest.requeststatus === '已接单' ||
          triprequest.requeststatus === '待上车' ||
          triprequest.requeststatus === '行程中'
        )
        {
          //初始化上下文数据！
          ctx.curtriprequestid = triprequest._id;
          ctx.curtriporderid = triporder._id;
          ctx.curtriprequest = triprequest;
          ctx.curtriporder = triporder;
          //订阅这个请求
          PubSub.subscribe(`request.${triprequest._id}`, ctx.userReqSubscriber);

          triporder.triprequest = triprequest._id;
          console.log("恢复一个订单=======》" + JSON.stringify({triprequest,triporder}));
          socket.emit('serverpush_restoreorder', {triprequest,triporder});
        }
      }
    });

    //订阅这个请求
    PubSub.subscribe(`user.rider.${ctx.userid}`, ctx.userUserSubscriber);

    //推送优惠券
    let payloaddata = {
      query:{
        usestatus:'未使用'
      },
      options:{
        sort:{created_at:-1},
        offset: 0,
        limit: 1000,
      }
    };
    coupon.mycoupongetall(socket,payloaddata,ctx);
    oftenuseaddress.getoftenuseaddress(socket,{},ctx);
};

exports.userloginsuccess = userloginsuccess;

let getdatafromuser =(user)=>{
  return {
    username: user.username,
    userid:user._id,
    balance:user.balance
  };
}
exports.getdatafromuser = getdatafromuser;

let setloginsuccess = (socket,ctx,user)=>{
   ctx.userid = user._id;//for test only
   let profile = {
     nickname:`乘客${chance.string({length: 4,pool: '0123456789'})}`,
     avatar:config.defaultprofileimage
   };
   if(user.profile){
     profile = user.profile;
   }
   ctx.starnum = user.starnum|| 0;
   ctx.riderinfo = {
     starnum:ctx.starnum,//星级
     avatarURL:profile.avatar,
     RiderPhone:user.username,//乘客电话
     RiderName:profile.nickname,//乘客姓别
   };
   if(ctx.starnum === 0){
     rate.getrateuser(ctx.userid,(r)=>{
       ctx.riderinfo.starnum = r;
     });
   }

   let userdata = getdatafromuser(user);
   userdata.profile = profile;
   userdata.token =  jwt.sign({
         exp: Math.floor(Date.now() / 1000) + config.loginuserexptime,
         _id:user._id,
       },config.secretkey, {});
   userdata.loginsuccess =  true;

   socket.emit('login_result',userdata);

   userloginsuccess(socket,ctx);


   //写入登录日志
   let loginlogModel = DBModels.UserRiderLoginLogModel;
   let loginlogentity = new loginlogModel({
                       creator:user._id,
                       username:user.username
                     });
  loginlogentity.save((err,loginlog)=>{
  });

 }

exports.setloginsuccess = setloginsuccess;
exports.loginwithtoken = (socket,actiondata,ctx)=>{
  try {
      let decodeduser = jwt.verify(actiondata.token, config.secretkey);
      let userid = decodeduser._id;
      let userModel = DBModels.UserRiderModel;
      userModel.findByIdAndUpdate(userid,
        {updated_at:new Date()},{new: true},(err,result)=>{
        console.log("userid:" + userid);
        console.log("err:" + JSON.stringify(err));
        console.log("result:" + JSON.stringify(result));
        if(!err && !!result){
          setloginsuccess(socket,ctx,result);
        }
        else{
          socket.emit('common_err',{errmsg:'找不到该用户',type:'login'});
        }

      });

      //PubSub.publish(userid, {msg:'allriders',data:'bbbb',topic:'name'});
  } catch (e) {
      console.log("invalied token===>" + JSON.stringify(actiondata.token));
      console.log("invalied token===>" + JSON.stringify(e));
      socket.emit('common_err',{errmsg:e.message,type:'login'});
  }
}

exports.logout = (socket,actiondata,ctx)=>{
  socket.emit('logout_result',{});
  PubSub.unsubscribe( ctx.userReqSubscriber );
  PubSub.unsubscribe( ctx.userUserSubscriber );
  delete ctx.userid;
  ctx.usertype = 'rider';
  ctx.curtriprequestid = '0';
  ctx.curtriporderid = '0';
  ctx.curorder={};
  ctx.currequest={};
  ctx.riderinfo = {};
};

exports.fillprofile = (socket,actiondata,ctx)=>{
  if (typeof actiondata.birthday === 'string') {
    actiondata.birthday = moment(actiondata.birthday).format('YYYY-MM-DD');
  }

  let userModel = DBModels.UserRiderModel;
  userModel.findByIdAndUpdate(ctx.userid,{profile:actiondata},{new: true},(err,userEntity)=>{
    if(!err && !!userEntity){
      socket.emit('fillprofile_result', {profile:userEntity.profile});

      //<------发送给平台！
      let eModel = dbplatform.Platform_baseInfoPassengerModel;
      eModel.findOne({PassengerPhone:userEntity.username},(err,result)=>{
        let postdata = {
          registerdate:userEntity.created_at,
          passgngerphone:userEntity.username,
          passengername:userEntity.profile.nickname,
          passengergender:userEntity.profile.sex,
        };
        if(!err && !!result){
          //已存在
          PubSub.publish('Platformmsgs', {
            action:'Update',
            type:'Platform_baseInfoPassenger',
            payload:postdata
          });
        }
        else{
          //插入
          //通知平台插入
          PubSub.publish('Platformmsgs', {
            action:'Insert',
            type:'Platform_baseInfoPassenger',
            payload:postdata
          });
        }

      });

    }
  });
};


exports.oauthbinduser = (socket,actiondata,ctx)=>{
  let newUser = {};
  if(actiondata.bindtype === 'qq'){
    newUser.openidqq = actiondata.openid;
  }
  else if(actiondata.bindtype === 'weixin'){
    newUser.openidweixin = actiondata.openid;
  }
  else{
    socket.emit('common_err',{errmsg:'不支持该类型绑定',type:'oauthbinduser'});
    return;
  }

  let globalUserauth = loginauth.globalUserauth;
  if(!globalUserauth.hasOwnProperty(actiondata.username)){
   socket.emit('common_err',{errmsg:'请先发送验证码',type:'oauthbinduser'});
   return;
 }
 if(globalUserauth[actiondata.username].authcode != actiondata.authcode){
   socket.emit('common_err',{errmsg:'验证码不对',type:'oauthbinduser'});
   return;
 }
 let nowDate = new Date();
 let min2Ago = new Date(nowDate.getTime() - 1000 * config.authexptime);
 if(min2Ago > globalUserauth[actiondata.username].updated_at){
   socket.emit('common_err',{errmsg:'验证码已过期',type:'oauthbinduser'});
   return;
 }

 let  updateduserobj = {updated_at:moment().format('YYYY-MM-DD HH:mm:ss')};
 if(actiondata.bindtype === 'qq'){
   updateduserobj.openidqq = actiondata.openid;
 }
 else if(actiondata.bindtype === 'weixin'){
   updateduserobj.openidweixin = actiondata.openid;
 }
 let queryuserobj = {username:actiondata.username};
 console.log(`queryuserobj==>${JSON.stringify(queryuserobj)},updateduserobj==>${JSON.stringify(updateduserobj)}`)
 let userModel = DBModels.UserRiderModel;
 userModel.findOneAndUpdate(queryuserobj,
   updateduserobj,{upsert:true,new: true,},(err,result)=>{
   if(!err && !!result){
     setloginsuccess(socket,ctx,result);
   }
   socket.emit('oauthbinduser_result',{});
 });
  //以下逻辑待实现
  // tryregisteruser(socket,actiondata,ctx,newUser,'oauthbinduser_err',(isok,user)=>{
  //     if(isok){
  //         setloginsuccess(socket,ctx,user);
  //         socket.emit('oauthbinduser_result',{});
  //      }
  //     else{
  //         hashPassword(actiondata.password, user.passwordsalt, (err, passwordHash)=> {
  //         //验证才能通过！
  //         if (passwordHash == user.passwordhash) {
  //             let  updateduserobj = {};
  //             if(actiondata.bindtype === 'qq'){
  //               updateduserobj.openidqq = actiondata.openid;
  //             }
  //             else if(actiondata.bindtype === 'weixin'){
  //               updateduserobj.openidweixin = actiondata.openid;
  //             }
  //             let userModel = DBModels.UserModel;
  //             userModel.findOneAndUpdate({_id:user._id}, {$set:updateduserobj},{new: true},(err,result)=>{
  //               if(!err && result){
  //                   setloginsuccess(socket,ctx,result);
  //                   socket.emit('oauthbinduser_result',{});
  //               }
  //             });
  //         }
  //         else{
  //           socket.emit('common_err',{errmsg:'密码不对',type:'oauthbinduser'});
  //         }
  //       });
  //      }
  // });
}

exports.loginwithoauth = (socket,actiondata,ctx)=>{
  //actiondata:bindtype:'qq,weixin',openid:'xxx'
    let  queryuserobj = {};
    if(actiondata.bindtype === 'qq'){
      queryuserobj.openidqq = actiondata.openid;
      if(!queryuserobj.openidqq){
        socket.emit('common_err',{errmsg:'QQopenid不能为空',type:'login'});
        return;
      }
    }
    else if(actiondata.bindtype === 'weixin'){
      queryuserobj.openidweixin = actiondata.openid;
      if(!queryuserobj.openidweixin){
        socket.emit('common_err',{errmsg:'微信openid不能为空',type:'login'});
        return;
      }
    }
    else{
      socket.emit('common_err',{errmsg:'不支持该类型登录',type:'login'});
      return;
    }
    let userModel = DBModels.UserRiderModel;
    userModel.findOneAndUpdate(queryuserobj,
      {updated_at:new Date()},{new: true},(err,result)=>{
      if(!err && !!result){
        setloginsuccess(socket,ctx,result);
      }
      else{
        socket.emit('loginwithoauth_result',actiondata);
      }
    });
};
