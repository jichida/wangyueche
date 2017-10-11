let PubSub = require('pubsub-js');
const triprequestmo = require('../common/triprequest.js');
const config = require('../../config.js');
//let maputil = require('../../map/map.js');
const async = require('async');
const price = require('../common/price.js');
const winston = require('../../log/log.js');

let getfngetneardrivers = (socket,actiondata,ctx)=>{
  return (callbackfn)=>{
    let locationsz = actiondata.location.split(",");
    let location = [parseFloat(locationsz[0]),parseFloat(locationsz[1])];
    let registertype = '快车';
    if(actiondata.hasOwnProperty('registertype')){
      registertype = actiondata.registertype;
    }
    let param = {
      location:location,
      registertype:registertype
    };
    if(ctx.hasOwnProperty('userid')){
      param.userid = ctx.userid;
    }
    triprequestmo.getnearestdrivers(param,(issuc,result)=>{
      if(issuc){
        callbackfn(null,result);
      }
      else{
        callbackfn(result,{});
      }
    });

  };
}

exports.getnearestdrivers  =  (socket,actiondata,ctx)=>{
  let fngetneardrivers = getfngetneardrivers(socket,actiondata,ctx);

  fngetneardrivers((err,result)=>{
    if(!err){
      socket.emit('getnearestdrivers_result',{
          neardrivers:result
      });
    }
    else{
      socket.emit('common_err',{
          type:'getnearestdrivers',
          errmsg:`获取附近司机失败(${err.message})`
      });
    }
  })
}

exports.getprice = (socket,actiondata,ctx)=>{
  price.getpricestring(actiondata,(err,result)=>{
    winston.getlog().error(`获得价格返回结果:${JSON.stringify(result)}`);
    if(!err){
      socket.emit('getprice_result',result);
    }
    else{
      //socket.emit('getprice_result',`<span>后台未设置运价,无法评估价格</span>`);
      socket.emit('common_err', {errmsg:`后台未设置运价,请联系管理员设置运价!`,type:'getprice'});
    }
  });
};
