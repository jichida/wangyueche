const jpushmsg_rider = require('../../smspush/pushrider.js');
const jpushmsg_driver = require('../../smspush/pushdriver.js');
const DBModels = require('../../db/models.js');
const _ = require('lodash');
const moment = require('moment');

exports.pushnotifymessage = (notifymessage)=>{
  let notifyMessageModel = DBModels.NotifyMessageModel;
  notifymessage.created_at = new Date();
  let entityMsg = new notifyMessageModel(notifymessage);
  entityMsg.save((err,nmsg)=>{
    if(!err && !!nmsg){
      nmsg = nmsg.toJSON();
      if(nmsg.messagetype === 'rider' || nmsg.messagetype === 'all' ){
        jpushmsg_rider.sendnotifymessage(nmsg,(err,result)=>{

        });
      }
      if(nmsg.messagetype === 'driver' || nmsg.messagetype === 'all' ){
        jpushmsg_driver.sendnotifymessage(nmsg,(err,result)=>{

        });
      }
    }
  });
}

exports.getmsgtxt = (type,data)=>{
  let msgtypedata = '';
  if(type==='getnewrequest'){
    if(_.get(data,'isrealtime',true)){
      msgtypedata = `实时,从${data.srcaddress.addressname},到${data.dstaddress.addressname},类型:${data.triptype},
      大约:${data.resultpricedetail.totalkm}公里,耗时:${data.resultpricedetail.totalduringminute}分钟,预计:${data.resultpricedetail.totalprice}元`;
    }
    else{
      msgtypedata = `预约,${moment(data.dated_at).format('MM月DD日HH时mm分')},从${data.srcaddress.addressname},到${data.dstaddress.addressname},类型:${data.triptype},
      大约:${data.resultpricedetail.totalkm}公里,耗时:${data.resultpricedetail.totalduringminute}分钟,预计:${data.resultpricedetail.totalprice}元`;
    }
  }
  const msgtype = {
    'getnewrequest':msgtypedata,
    'acceptorder':`您的请求已被司机接单，请您在路边等候!`,
    'cancelorderbydriver':`订单已被司机取消,请重新叫车!`,
    'cancelorderbyrider':`订单已被乘客取消,请重新接单!`,
    'payorderwithcash':`您的订单已经线下支付!`,
    'tripordertopay':'您有一条待支付的订单!',
    'paybyrider_daijiacancel':`乘客已支付取消代驾费用,您将获得${_.get(data,'feebonus',0)}元补偿,账户余额为:${_.get(data,'feenew',0)}元,请查看`,
    'paybyrider':`乘客已支付打车费用,您将获得${_.get(data,'feebonus',0)}元,账户余额为:${_.get(data,'feenew',0)}元,请查看`,
    'payforbanlancerider':`您已成功充值${_.get(data,'feebonus',0)}元,账户余额为:${_.get(data,'feenew',0)}元,请查看`,
  };
  let msg = msgtype[type] || '无效的消息';
  return msg;
}
