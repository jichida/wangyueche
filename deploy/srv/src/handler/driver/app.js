/**
 * Created by wangxiaoqing on 2017/3/25.
 */
const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let dbplatform = require('../../db/modelsplatform.js');
let mongoose     = require('mongoose');
let PubSub = require('pubsub-js');
const util = require('../../platform/util.js');

exports.senddriverappinfo = (socket,actiondata,ctx)=>{
   if(ctx.approvalstatus === '已审核'){
       let eModel = dbplatform.Platform_baseInfoDriverAppModel;
       eModel.findOne({licenseld:ctx.driverinfo.LicenseId},(err,result)=>{
           let postdata = {
               address:config.Address,
               licenseld:ctx.driverinfo.LicenseId,
               appversion:actiondata.appversion,
               nettype:util.getmobilenettype(ctx.driverinfo.DriverPhone||ctx.username),//手机运营商	1.中国联通2 .中国移动3 .中国电信4 :其他
           };
           if(!err && result){
               //已存在
               PubSub.publish('Platformmsgs', {
                   action:'Update',
                   type:'Platform_baseInfoDriverApp',
                   payload:postdata
               });
           }
           else{
               //插入
               //通知平台插入
               PubSub.publish('Platformmsgs', {
                   action:'Insert',
                   type:'Platform_baseInfoDriverApp',
                   payload:postdata
               });
           }

       });
   }
}
