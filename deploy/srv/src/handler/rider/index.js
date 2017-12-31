const rideruserlogin = require('./rideruserlogin.js');
const rideruserrequest = require('./rideruserrequest.js');
const geo = require('./geo.js');

const buscarpool = require('./buscarpool.js');
const tourbus = require('./tourbus.js');
const userlogin = require('../common/loginauth.js');
const request = require('../common/request.js');

const about = require('../common/about.js');
const order = require('./orders.js');
const emerygencycontact= require('../common/emerygencycontact.js');
const oftenuseaddress = require('./oftenuseaddress.js');

const coupon = require('./mycoupon.js');
const notifymessage = require('./notifymessage.js');

const pay = require('./pay.js');
const appcommon = require('../common/app');
const winston = require('../../log/log.js');

const rechargerecord = require('./recharge.js');

const actiondatahandler = {
  'loginsendauth':userlogin.loginsendauth,
  'loginwithauth':userlogin.loginwithauth,
  'loginwithtoken':rideruserlogin.loginwithtoken,
  'loginwithoauth':rideruserlogin.loginwithoauth,
  'oauthbinduser':rideruserlogin.oauthbinduser,

  'logout':rideruserlogin.logout,

  'getcurrentlocation':geo.handlecurrentlocation,
  'getnearestdrivers':geo.getnearestdrivers,
  'getcurrentlocationandnearestdrivers':geo.handlecurrentlocationandnearestdrivers,

  'getprice':geo.getprice,

  'getbuscarpool':buscarpool.getbuscarpool,

  'gettourbus':tourbus.gettourbus,

  'getabouthtml':about.getabouthtml,

  'pushrequesttodrivers':request.pushrequesttodrivers,
  'getnotifymessageone':notifymessage.getnotifymessageone,
  'getnotifymessage':notifymessage.getnotifymessage,
  'getsystemconfig':appcommon.getsystemconfig,
};

const authhandler = {
  'queryorder':order.queryorder,
  'getorderdetail':order.getorderdetail,
  'getmytriporders':order.getmytriporders,
  'rechargepay':order.rechargepay,
  'insertorder':order.insertorder,
  'updateorder':order.updateorder,
  'updateorder_comment':order.updateorder_comment,
  'payorder':order.payorder,

  'getrechargerecords':rechargerecord.getrechargerecords,
  'queryuserbalance':rideruserlogin.queryuserbalance,
  'fillprofile':rideruserlogin.fillprofile,
  'starttriprequestorder':rideruserrequest.starttriprequestorder_request,
  'canceltriprequestorder':rideruserrequest.canceltriprequestorder_request,

  'getpaysign':pay.getpaysign,
  'getemerygencycontact':emerygencycontact.getemerygencycontact,
  'insertemerygencycontact':emerygencycontact.insertemerygencycontact,
  'deleteemerygencycontact':emerygencycontact.deleteemerygencycontact,
  'getoftenuseaddress':oftenuseaddress.getoftenuseaddress,
  'setoftenuseaddress':oftenuseaddress.setoftenuseaddress,
  'mycoupongetall':coupon.mycoupongetall,

}


module.exports = (socket,actiondata,ctx)=>{
  try{
    if(ctx.usertype !== 'rider'){
      socket.emit('common_err',{errmsg:'无效的app客户端'});
      winston.getlog().error(`无效的app客户端`);
      return;
    }
    if(actiondatahandler.hasOwnProperty(actiondata.cmd)){
      actiondatahandler[actiondata.cmd](socket,actiondata.data,ctx);
    }
    else{
      if(authhandler.hasOwnProperty(actiondata.cmd)){
        if(!ctx.hasOwnProperty('userid')){
          socket.emit('common_err',{errmsg:'请先重新登录'});
          winston.getlog().error(`请先重新登录`);
        }
        else{
          authhandler[actiondata.cmd](socket,actiondata.data,ctx);
        }
      }
      else{
        socket.emit('common_err',{errmsg:`未找到处理函数:${actiondata.cmd}`});
        winston.getlog().error(`未找到处理函数:${actiondata.cmd}`);
      }
    }
  }
  catch(e){
    console.log(e);
    socket.emit('common_err',{errmsg:`服务端内部错误:${JSON.stringify(e)}`});
  }

}
