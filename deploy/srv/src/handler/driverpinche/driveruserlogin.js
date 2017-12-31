let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const loginauth = require('../common/loginauth.js');
const Chance = require('chance');
const chance = new Chance();
const moment = require('moment');


exports.logout = (socket,actiondata,ctx)=>{
  //注：后续有operatelogout消息，需要用到ctx.故放在operatelogout中
  PubSub.unsubscribe( ctx.userUserSubscriber );

  delete ctx.userid;
  socket.emit('logout_result',{});
};

let userloginsuccess =(socket,ctx)=>{
   socket.emit('serverpush_userloginsuccess_notify', {servertime:new Date()});
    //订阅这个请求
   PubSub.subscribe(`user.driverpinche.${ctx.userid}`, ctx.userUserSubscriber);

};

exports.userloginsuccess = userloginsuccess;

let getdatafromuser =(user)=>{
  return {
    username: user.username,
    nickname:user.nickname,
    truename:user.truename,
    userid:user._id,
  };
}

exports.getdatafromuser = getdatafromuser;
let setloginsuccess = (socket,ctx,user)=>{
   ctx.username = user.username;
   ctx.userid = user._id;//for test only
   if(typeof ctx.userid === "string"){
      ctx.userid = mongoose.Types.ObjectId(ctx.userid);
   }

    let userdata = getdatafromuser(user);
    userdata.token =  jwt.sign({
          exp: Math.floor(Date.now() / 1000) + config.loginuserexptime,
          _id:user._id,
        },config.secretkey, {});
    userdata.loginsuccess =  true;

    socket.emit('login_result', userdata);
    userloginsuccess(socket,ctx);

    //写入登录日志
    let loginlogModel = DBModels.UserDriverPincheLoginLogModel;
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
      let userModel = DBModels.UserDriverPincheModel;
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


exports.loginuser = (socket,actiondata,ctx)=>{
  let oneUser = actiondata;
  let dbModel = DBModels.UserDriverPincheModel;
  dbModel.findOne({ username: oneUser.username }, (err, user)=> {
    if (!!err) {
      socket.emit('common_err',{errmsg:err.message,type:'login'});
      return;
    }
    if (!user) {
      socket.emit('common_err',{errmsg:'用户名或密码错误',type:'login'});
      return;
    }

    if (oneUser.password === user.password) {
      setloginsuccess(socket,ctx,user);
      return;
    }
    socket.emit('common_err',{errmsg:'用户名或密码错误',type:'login'});
    // loginauth.hashPassword(oneUser.password, user.passwordsalt, (err, passwordHash)=> {
    //   if(!err && !!passwordHash){
    //     if (passwordHash === user.passwordhash) {
    //       setloginsuccess(socket,ctx,user);
    //       return;
    //     }
    //   }
    //   socket.emit('common_err',{errmsg:'用户名或密码错误',type:'login'});
    // });
  });

}
