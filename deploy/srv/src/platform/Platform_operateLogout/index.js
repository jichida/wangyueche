/**
 * Created by wangxiaoqing on 2017/3/22.
 */
// A. 6. 2.  车辆经营下线接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传车 辆经营下线信息。operateLogout
/*
 程序获取
 */
// let Platform_operateLogoutSchema= new Schema({
//     Companyld:String,		//是	字符型	V32	公司标识
//     Licenseld:String,		//是	字符型	V32	机动车驾驶证 号
//     VehicleNo:String,		//是	字符型 V32	车辆号牌
//     LogoutTime:Number,	//是	数字型 F14	车辆经营下线时间 YYYYMMDDhhmm ss
//     Longitude:Number,	//否	数字型	V10	下线经度	单位 :1铃 10-6度
//     Latitude:Number,	//否	数字型	V10	下线纬度	单位 :1铃 10-6度
//     Encrypt:Number,	//是	数字型	F1	坐标加密标识	l :GCJ 一02 测绘局标准2:WGS84 GPS 标准3:BD一09 百度标准4: CGCS2000 北斗标准0:其他
// });
// Platform_operateLogoutSchema.plugin(mongoosePaginate);

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const util = require('../util');//gettimeformat
let dbplatform = require('../../db/modelsplatform.js');

exports.insertOperateLogout  = (actiondata)=> {
    let operateLogoutDoc = {
        Companyld:config.Companyld,
        Licenseld:actiondata.licenseld,
        VehicleNo:actiondata.vehicleno,
        LogoutTime:util.gettimeformat(new Date()),
        Longitude:actiondata.driverlocation[0],
        Latitude:actiondata.driverlocation[1],
        Encrypt:1,//1:GCJ-02 测绘局标准
    };
    let eModel = dbplatform.Platform_operateLogoutModel;
    let entity = new eModel(operateLogoutDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','operatelogout',result);
        }
    });
}