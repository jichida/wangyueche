/**
 * Created by wangxiaoqing on 2017/3/21.
 */
// A.8. 服务质量信息交换接口
// A. 8. 1.乘客评价信息接口 业务描述:用于网约车平台公司向部级平台发起请求，上传乘客评价信息。
// ratedPassenger
/*
 程序获取，乘客评价信息;乘客-》评价
 */
// let Platform_ratedPassengerSchema= new Schema({
//     Companyld:String,	//	是	字符型	V32	公司标识
//     Orderld:String,	//	是	字符型	V64	订单号
//     EvaluateTime:Date,		//	是	数字型	F14	评价时间	YYYYMMDDhhmmss
//     ServiceScore:Number,		//	是	数字型	VI 0	服务满意度	五分制
//     DriverScore:Number,		//	否	数字型	VI0	驾驶员满意度	五分制
//     VehicleScore:Number,		//	否	数字型	VI0	车辆满意度	五分制
//     Detail:String,	//	否	字符型	V128	评价内容
// });
// Platform_ratedPassengerSchema.plugin(mongoosePaginate);

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const util = require('../util');//gettimeformat
let dbplatform = require('../../db/modelsplatform.js');


exports.insertRatedPassenger  = (actiondata)=> {
    let ratedPassengerDoc = {
        Companyld:config.Companyld,	//	是	字符型	V32	公司标识
        Orderld:actiondata.triporderid,	//	是	字符型	V64	订单号
        EvaluateTime:util.gettimeformat(new Date()),		//	是	数字型	F14	评价时间	YYYYMMDDhhmmss
        ServiceScore:actiondata.scoreservice,		//	是	数字型	VI 0	服务满意度	五分制
        DriverScore:0,		//	否	数字型	VI0	驾驶员满意度	五分制
        VehicleScore:0,		//	否	数字型	VI0	车辆满意度	五分制
        Detail:actiondata.detail,	//	否	字符型	V128	评价内容
    };
    let eModel = dbplatform.Platform_ratedPassengerModel;
    let entity = new eModel(ratedPassengerDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','ratedpassenger',result);
        }
    });
}