
const driveruserlogin = require('./driveruserlogin.js');
const driveruserrequest = require('./driveruserrequest.js');
const userlogin = require('../common/loginauth.js');

const about = require('../common/about.js');
const order = require('./orders.js');
const emerygencycontact= require('../common/emerygencycontact.js');


const notifymessage = require('./notifymessage.js');
const app = require('./app.js');
const operate = require('./operate');
const car = require('./car');

const rechargerecord = require('./rechargerecord.js');
const withdrawcash = require('./withdrawcash.js');
const appcommon = require('../common/app');


//司机端
const actiondatahandler = {
  'register':driveruserlogin.register,
  'loginwithtoken':driveruserlogin.loginwithtoken,
  'logout':driveruserlogin.logout,
  'loginsendauth':userlogin.loginsendauth,
  'loginwithauth':userlogin.loginwithauth,
  'findpwd':driveruserlogin.findpwd,
  'login':driveruserlogin.loginuser,

  'getabouthtml':about.getabouthtml,

  'cargetallbrands':car.cargetallbrands,
  'cargetallmodelfrombrandid':car.cargetallmodelfrombrandid,
  'cargetallcolors':car.cargetallcolors,
  'getnotifymessageone':notifymessage.getnotifymessageone,
  'getnotifymessage':notifymessage.getnotifymessage,
  'getsystemconfig':appcommon.getsystemconfig,
};

const authhandler = {
  'queryorder':order.queryorder,
  'getorderdetail':order.getorderdetail,
  'getorderroute':order.getorderroute,
  'getmytriporders':order.getmytriporders,
  'insertorder':order.insertorder,
  'updateorder':order.updateorder,
  'updateorder_comment':order.updateorder_comment,
  'payorderwithcash':order.payorderwithcash,

  'carcreate':car.carcreate,
  'cardelete':car.cardelete,
  'cargetall':car.cargetall,
  'carupdate':car.carupdate,
  'carsetdefault':car.carsetdefault,

  'fillrealnameprofile':driveruserlogin.fillrealnameprofile,
  'queryuserbalance':driveruserlogin.queryuserbalance,

  'senddriverappinfo':app.senddriverappinfo,

  'sendcurlocationtoserver':driveruserrequest.sendcurlocationtoserver,
  'acceptrequest':driveruserrequest.acceptrequest,
  'updaterequeststatus':driveruserrequest.updaterequeststatus,
  'canceltriprequestorder':driveruserrequest.canceltriprequestorder_request,

  'getemerygencycontact':emerygencycontact.getemerygencycontact,
  'insertemerygencycontact':emerygencycontact.insertemerygencycontact,
  'deleteemerygencycontact':emerygencycontact.deleteemerygencycontact,


  'operatelogin':operate.operatelogin,
  'operatelogout':operate.operatelogout,

  'getrechargerecords':rechargerecord.getrechargerecords,
  'withdrawcashapplyaddone':withdrawcash.withdrawcashapplyaddone,
  'withdrawcashapplyauth':withdrawcash.withdrawcashapplyauth,


};

module.exports = (socket,actiondata,ctx)=>{
  console.log("司机端获取数据--->" + JSON.stringify(actiondata));
  console.log("司机端获取上下文--->" + JSON.stringify(ctx));
  try{
      if(ctx.usertype !== 'driver'){
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
