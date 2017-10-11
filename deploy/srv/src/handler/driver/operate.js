/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/25.
 */
const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let dbplatform = require('../../db/modelsplatform.js');
let mongoose     = require('mongoose');
let PubSub = require('pubsub-js');

exports.operatelogin = (socket,actiondata,ctx)=>{
    if(ctx.approvalstatus === '已审核'){
        ctx.bizstatus = 3;//3 :空驶

        let postdata = {
            vehicleno:ctx.driverinfo.VehicleNo,
            licenseld:ctx.driverinfo.Licenseld,
            driverlocation:actiondata.driverlocation
        };
        //通知平台插入
        PubSub.publish('Platformmsgs', {
            action:'Insert',
            type:'Platform_operateLogin',
            payload:postdata
        });
    }
}

exports.operatelogout = (socket,actiondata,ctx)=>{

    ctx.bizstatus = 4;//4.停运
    if(ctx.hasOwnProperty('licenseld')){
        let postdata = {
            vehicleno:ctx.driverinfo.VehicleNo,
            licenseld:ctx.driverinfo.Licenseld,
            driverlocation:actiondata.driverlocation
        };
        //通知平台插入
        PubSub.publish('Platformmsgs', {
            action:'Insert',
            type:'Platform_operateLogout',
            payload:postdata
        });
    }

}
