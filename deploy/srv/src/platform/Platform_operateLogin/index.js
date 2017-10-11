/**
 * Created by wangxiaoqing on 2017/3/22.
 */
// A. 6. 1.车辆经营上线接口
// 业务描述 :用于网约车平台公司向部级平台发起请求，上传车辆经营上线信息。
// operateLogin
/*
 程序获取
 */
// let Platform_operateLoginSchema= new Schema({
//     Companyld:String,	//	是	字符型	V32	公司标识
//     Licenseld:String,	//	是	字符型	V32	机动车驾驶证号
//     VehicleNo:String,	//	是	字符型	V32	车辆号牌
//     LoginTime:Date,//	是	数字型	F14	车辆经营上线时间	YYYYMMDDhhmmss
//     Longitude:Number,	//否	数字型	V10	上线经度	单位 :1 铃 10-6度
//     Latitude:Number,//	否	数字型	V10	上线纬度	单位 :1 铃 10-6度
//     Encrypt:Number,	 // 是	数字型	F1	坐标加密标识	l:GCJ 一02 测绘局标准2:WGS84 GPS 标准 3:BD一09 百度标准4 :CGCS2000 北斗标准0 :其他
// });

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const util = require('../util');//gettimeformat
let dbplatform = require('../../db/modelsplatform.js');

exports.insertOperateLogin  = (actiondata)=> {
    let operateLoginDoc = {
        Companyld:config.Companyld,
        Licenseld:actiondata.licenseld,
        VehicleNo:actiondata.vehicleno,
        LoginTime:util.gettimeformat(new Date()),
        Longitude:actiondata.driverlocation[0],
        Latitude:actiondata.driverlocation[1],
        Encrypt:1,//1:GCJ-02 测绘局标准
    };
    let eModel = dbplatform.Platform_operateLoginModel;
    let entity = new eModel(operateLoginDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','operatelogin',result);
        }
    });
}

