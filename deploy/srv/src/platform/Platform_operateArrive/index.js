/**
 * Created by wangxiaoqing on 2017/3/22.
 */
// A. 6. 4.  经营到达接口
/*
 程序获取
 */
// let Platform_operateArriveSchema= new Schema({
//     CompanyId:String,		//	是	字符型	V32	公司标识
//     OrderId:String,		//	是	字符型	V64	订单号
//     DestLongitude:Number,	//	是	数字型	V10	车辆到达经度	单位 :1祷 10-6 度
//     DestLatitude:Number,	//	是	数字型	V10	车辆到达纬度	单位 :1铃 10-6 度
//     Encrypt:Number,	//	是	数字型	F1	坐标加密标识	l:GCJ 一 02 测绘局标准2:WGS84 GPS 标准3:BD一09 百度标准4:CGCS2000 北斗标准O.其他
//     DestTime:Date,	//	是	数字型	F14	下车时间	YYYYMMDDhhmmss
//     DriveMile:Number,	//	是	数字型	V10	载客里程	单位 :km
//     DriveTime:Number,	//	是	数字型	V10	载客时间	单位:秒
// });
let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
let dbplatform = require('../../db/modelsplatform.js');
const moment = require('moment');
//到达目的地
exports.insertOperateArrive  = ({triprequest,triporder})=> {
    let datestart = moment(triporder.getindate_at);
    let dateend = moment(triporder.getoffdate_at);
    let DriveTime = (dateend.unix() - datestart.unix())/1000; //单位是秒

    let operateArriveDoc = {
        // CompanyId:config.CompanyId,
        OrderId:triporder._id,
        DestLongitude:triporder.getofflocation[0],
        DestLatitude:triporder.getofflocation[1],
        Encrypt:1,//1:GCJ-02 测绘局标准
        DestTime:triprequest.getoffdate_at,
        DriveMile:0,
        DriveTime
    };
    let eModel = dbplatform.Platform_operateArriveModel;
    let entity = new eModel(operateArriveDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','operatearrive',result);
        }
    });
}
