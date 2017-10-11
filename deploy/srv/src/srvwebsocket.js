let winston = require('./log/log.js');
let PubSub = require('pubsub-js');
const config = require('./config.js');
const handlerideruser = require('./handler/rider/index.js');
const handledriveruser = require('./handler/driver/index.js');
const handlepinchedriveruser = require('./handler/driverpinche/index.js');
const socketsubfn = require('./handler/socketsubscribe.js');
/*
topic定义:
allpushmsg<--所有消息
alldrivers<--所有司机
allriders<--所有乘客
userid<--指定用户
request.id<--指定请求
login/logout

乘客端：
ctx:usertype,userid,curtriprequestid,curtriporderid,curtriporder,curtriprequest

司机端：
ctx:当前车辆／注册类型／用户id驾驶证／车牌号／
当前接单请求／当前订单id/curtriprequestid,curtriporderid,curtriporder,curtriprequest
*/
let startwebsocketsrv = (http)=>{
  let io = require('socket.io')(http);

  io.on('connection', (socket)=>{
    console.log('a user connected');

    let ctx = {};//for each connection
    socketsubfn.usersubfn(socket,ctx);
    ctx.tokensubscribe = PubSub.subscribe('allpushmsg', ctx.userReqSubscriber);

    socket.on('apprider',(payload)=>{
      if(!ctx.usertype){
        ctx.usertype = 'rider';
        ctx.curtriprequestid = '0';
        ctx.curtriporderid = '0';
        ctx.curorder={};
        ctx.currequest={};
      }
      console.log('get message:' + JSON.stringify(payload));
      winston.getlog().info('ctx:', JSON.stringify(ctx));
      handlerideruser(socket,payload,ctx);
    });

    socket.on('appdriver',(payload)=>{
      if(!ctx.usertype){
        ctx.usertype = 'driver';
        ctx.curtriprequestid = '0';
        ctx.curtriporderid = '0';
        ctx.curorder={};
        ctx.currequest={};
      }
      winston.getlog().info('=============');
      winston.getlog().info('payload:', JSON.stringify(payload));
      winston.getlog().info('ctx:', JSON.stringify(ctx));
      winston.getlog().info('=============');
      handledriveruser(socket,payload,ctx);
    });

    socket.on('appdriverpinche',(payload)=>{
      if(!ctx.usertype){
        ctx.usertype = 'driverpinche';
      }
      winston.getlog().info('=============');
      winston.getlog().info('payload:', JSON.stringify(payload));
      winston.getlog().info('ctx:', JSON.stringify(ctx));
      winston.getlog().info('=============');
      handlepinchedriveruser(socket,payload,ctx);
    });


    socket.on('error',(err)=>{
      console.log("socket err:" + JSON.stringify(err));
      socket.disconnect(true);
      PubSub.unsubscribe( ctx.userReqSubscriber );
      PubSub.unsubscribe( ctx.userUserSubscriber );

    });

    socket.on('disconnect', ()=> {
      console.log("socket disconnect!");
      PubSub.unsubscribe( ctx.userReqSubscriber );
      PubSub.unsubscribe( ctx.userUserSubscriber );

    });
  });

};

exports.startsrv = startwebsocketsrv;
