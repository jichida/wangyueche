/**
 * Created by wangxiaoqing on 2017/3/27.
 */
let DBModels = require('../../db/models.js');
let mongoose     = require('mongoose');
const config = require('../../config.js');
const moment  = require('moment');
const jwt = require('jsonwebtoken');
const loginrider = require('../rider/rideruserlogin');
const logindriver = require('../driver/driveruserlogin');
const winston = require('../../log/log.js');
const crypto = require('crypto');
const Chance = require('chance');
const chance = new Chance();

let globalUserauth = {};
let sendauthcode = (socket,actiondata,ctx)=>{
    let nowDate = new Date();
    let userAuth = actiondata;
    console.log(`loginsendauth=>${JSON.stringify(globalUserauth)}`);
    if(!!globalUserauth[userAuth.phonenumber]){
        let minAgo = new Date(nowDate.getTime() - 1000 * 30);
        if(minAgo < globalUserauth[userAuth.phonenumber].updated_at){
            socket.emit('common_err',{errmsg:'请勿频繁发送验证码',type:'loginsendauth'});
            winston.getlog().error(`${userAuth.phonenumber}请勿频繁发送验证码`);
            return;
        }

        let min2Ago = new Date(nowDate.getTime() - 1000 * config.authexptime);
        if(min2Ago > globalUserauth[userAuth.phonenumber].updated_at){
            //resend
            globalUserauth[userAuth.phonenumber].authcode = chance.string({length: 4,pool: '0123456789'});
            globalUserauth[userAuth.phonenumber].updated_at = nowDate;
        }
    }
    else {
        globalUserauth[userAuth.phonenumber] = {};
        globalUserauth[userAuth.phonenumber].authcode = chance.string({length: 4, pool: '0123456789'});
        globalUserauth[userAuth.phonenumber].updated_at = nowDate;
    }
    const sms = require('../../smspush/sms.js');
    // let message = `验证码为:${globalUserauth[userAuth.phonenumber].authcode},请在${config.authexptime}秒内登录,过期无效!`;
    sms.sendsmstouser(userAuth.phonenumber,`${ctx.usertype}_${userAuth.reason}`,globalUserauth[userAuth.phonenumber].authcode,
      (err,result)=>{
            if(!err){
                socket.emit('loginsendauth_result',result);
            }
            else{
                socket.emit('common_err',{type:'loginsendauth',errmsg:'发送验证码失败'});
            }
      });
      // console.log(`sendmessage:${message},type_reason:${ctx.usertype}_${userAuth.reason}`);
};


exports.loginsendauth = (socket,actiondata,ctx)=>{
  if(ctx.usertype === 'driver'){
    const userModel = DBModels.UserDriverModel;
    if(actiondata.reason === 'register' || actiondata.reason === 'findpwd'){
      userModel.findOne({username:actiondata.phonenumber},(err,user)=>{
        let errmsg = '发送验证码失败';
        if(!err){
          if(!!user && actiondata.reason === 'findpwd'){
            sendauthcode(socket,actiondata,ctx);
            return;
          }

          if(!user && actiondata.reason === 'register'){
            sendauthcode(socket,actiondata,ctx);
            return;
          }

          if(actiondata.reason === 'findpwd'){
            errmsg = '用户不存在';
          }
          if(actiondata.reason === 'register'){
            errmsg = '用户已存在';
          }
        }
        socket.emit('common_err',{type:'loginsendauth',errmsg});
      });
      return;
    }
  }

  sendauthcode(socket,actiondata,ctx);
}

exports.loginwithauth = (socket,actiondata,ctx)=>{
    let userModel;
    if(ctx.usertype === 'rider'){
        userModel = DBModels.UserRiderModel;
    }
    else{
        userModel = DBModels.UserDriverModel;
    }
    if(!globalUserauth.hasOwnProperty(actiondata.phonenumber)){
        winston.getlog().error(`${actiondata.phonenumber}请先发送验证码`);
        socket.emit('common_err',{errmsg:'请先发送验证码',type:'loginwithauth'});
        return;
    }
    if(globalUserauth[actiondata.phonenumber].authcode !== actiondata.authcode) {
        winston.getlog().error(`验证码为:[${globalUserauth[actiondata.phonenumber].authcode}],发送过来[${actiondata.authcode}]`);
        socket.emit('common_err',{errmsg:'验证码不对',type:'loginwithauth'});
        return;
    }

    userModel.findOneAndUpdate({username:actiondata.phonenumber},{updated_at:moment().format('YYYY-MM-DD HH:mm:ss')},{new: true},(err,userEntity)=> {
        if (!err && userEntity) {
            // ctx.userid = userEntity._id.toString();
            // let token = jwt.sign({
            //     exp: Math.floor(Date.now() / 1000) + config.loginuserexptime,
            //     _id: userEntity._id,
            //     usertype: ctx.usertype,
            // }, config.secretkey, {});
            // socket.emit('login_result', {
            //     token,
            //     username: userEntity.username,
            //     profile: userEntity.profile
            // });

            if(ctx.usertype === 'rider'){
                loginrider.setloginsuccess(socket,ctx,userEntity);
            }
            else{
                logindriver.setloginsuccess(socket,ctx,userEntity);
            }
        }
        else {
            if (!err) {
                let datauser = {
                    username: actiondata.phonenumber,
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
                }
                let userEntity = new userModel(datauser);
                userEntity.save((err, result)=> {
                    if (!err && result) {
                        // ctx.userid = result._id.toString();
                        // let token = jwt.sign({
                        //     exp: Math.floor(Date.now() / 1000) + config.loginuserexptime,
                        //     _id: userEntity._id,
                        //     usertype: ctx.usertype,
                        // }, config.secretkey, {});
                        // socket.emit('login_result', {
                        //     token,
                        //     username: userEntity.username,
                        //     profile: userEntity.profile
                        // });
                        if(ctx.usertype === 'rider'){
                            loginrider.setloginsuccess(socket,ctx,result);
                        }
                        else{
                            logindriver.setloginsuccess(socket,ctx,result);
                        }
                    }
                    else {
                        winston.getlog().error(`${actiondata.phonenumber}登录失败${err.message}`);
                        socket.emit('common_err', {errmsg: err.message,type:'loginwithauth'});
                    }
                });
            }
            else {
                winston.getlog().error(`${actiondata.phonenumber}登录失败${err.message}`);
                socket.emit('common_err', {errmsg: err.message,type:'loginwithauth'});
            }
        }
    }); //userloginsuccess(socket,ctx,result);

}

exports.globalUserauth = globalUserauth;

let hashPassword = function (password, salt, callback) {
    // We use pbkdf2 to hash and iterate 10k times by default
    const iterations = 10000;
    const keyLen = 64; // 64 bit.
    console.log("password is :" + password);
   // password = new Buffer(password, 'binary');
    crypto.pbkdf2(password, salt, iterations, keyLen,'sha1', (err,result)=>{
      if(!err && !!result){
        callback(null,result.toString('hex'));
      }
      else{
          callback(err,null);
      }
    });
};
exports.hashPassword = hashPassword;
