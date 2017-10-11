const driveruserlogin = require('./driveruserlogin.js');
const about = require('../common/about.js');
const notifymessage = require('./notifymessage.js');
const appcommon = require('../common/app');
const pincheroute = require('./pincheroute');

//司机端
const actiondatahandler = {
  'loginwithtoken':driveruserlogin.loginwithtoken,
  'logout':driveruserlogin.logout,
  'login':driveruserlogin.loginuser,

  'getabouthtml':about.getabouthtml,

  'getnotifymessageone':notifymessage.getnotifymessageone,
  'getnotifymessage':notifymessage.getnotifymessage,
  'getsystemconfig':appcommon.getsystemconfig,
};

const authhandler = {
  'getmypincheroute':pincheroute.getmypincheroute,
  'getonepincheroutepassengers':pincheroute.getonepincheroutepassengers
};

module.exports = (socket,actiondata,ctx)=>{
  if(!actiondata.data){
    actiondata.data = {};
  }
  console.log("司机端获取数据--->" + JSON.stringify(actiondata));
  console.log("司机端获取上下文--->" + JSON.stringify(ctx));
  try{
      if(ctx.usertype !== 'driverpinche'){
        console.log("不是正确的客户端--->" + actiondata.cmd);
        socket.emit('common_err',{errmsg:'无效的app客户端'});
        return;
      }
      if(actiondatahandler.hasOwnProperty(actiondata.cmd)){
        actiondatahandler[actiondata.cmd](socket,actiondata.data,ctx);
      }
      else{
        if(authhandler.hasOwnProperty(actiondata.cmd)){
          if(!ctx.hasOwnProperty('userid')){
            console.log("需要登录--->" + actiondata.cmd);
            socket.emit('common_err',{errmsg:'请先重新登录'});
          }
          else{
            authhandler[actiondata.cmd](socket,actiondata.data,ctx);
          }
        }
        else{
          console.log("未找到处理函数--->" + actiondata.cmd);
          socket.emit('common_err',{errmsg:`未找到处理函数${actiondata.cmd}`});
        }
      }
    }
    catch(e){
      console.log("服务端内部错误--->" + e);
      socket.emit('common_err',{errmsg:`服务端内部错误:${JSON.stringify(e)}`});
    }
}
