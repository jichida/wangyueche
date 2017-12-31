/**
 * Created by wangxiaoqing on 2017/3/22.
 */
// let Platform_baseInfoDriverAppSchema= new Schema({
//     CompanyId:String,	//	是	字符型	V32	公司标识
//     Address:Number,//		是	数字型	F6	注册地行政区划代码	驾驶员在平台的注册地， 见 GB/T 2260
//     LicenseId:String,	//	是	字符型	V32	机动车驾驶证号
//     DriverPhone:String,	//	是	字符型	V32	驾驶员手机号
//     NetType:Number,//	 是	数字型	F1	手机运营商	1.中国联通2 .中国移动3 .中国电信4 :其他
//     AppVersion:String,	//	是	字符型	V32	使用APP版本号
//     MapType:Number,//	 是	数字型	F1	使用地图类型	1:百度地图2 :高德地图3.其他
//     State:Number,//		是	数字型	F1	状态	0 :有效1:失效
//     Flag:Number,//		是	数字型	F1	操作标识	1.新增2.更新3 :删除
//     UpdateTime:Date,//		是	数字型	F14	更新时间	网约车平台完成数据更新 的时间 YYYYMMDDhhmmss
// });
// Platform_baseInfoDriverAppSchema.plugin(mongoosePaginate);
const moment = require('moment');

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
let dbplatform = require('../../db/modelsplatform.js');

exports.insertBaseInfoDriverApp  = (actiondata)=> {
    let baseInfoDriverAppDoc = {
        CompanyId:config.CompanyId,
        Address:actiondata.address,
        LicenseId:actiondata.licenseld,
        DriverPhone:actiondata.phonenumber,
        NetType:actiondata.nettype,//手机运营商	1.中国联通2 .中国移动3 .中国电信4 :其他
        AppVersion:actiondata.appversion,
        MapType:2,//	 是	数字型	F1	使用地图类型	1:百度地图2 :高德地图3.其他
        State:0,
        Flag:1,//		是	数字型	F1	操作标识	1.新增2.更新3 :删除
        UpdateTime:moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    let eModel = dbplatform.Platform_baseInfoDriverAppModel;
    let entity = new eModel(baseInfoDriverAppDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','baseinfodriverapp',result);
        }
    });
}

exports.updateBaseInfoDriverApp  = (actiondata)=> {
    let baseInfoDriverAppDoc = {
        CompanyId:config.CompanyId,
        Address:actiondata.address,
        LicenseId:actiondata.licenseld,
        DriverPhone:actiondata.phonenumber,
        NetType:actiondata.nettype,//手机运营商	1.中国联通2 .中国移动3 .中国电信4 :其他
        AppVersion:actiondata.appversion,
        MapType:2,//	 是	数字型	F1	使用地图类型	1:百度地图2 :高德地图3.其他
        State:0,
        Flag:2,//		是	数字型	F1	操作标识	1.新增2.更新3 :删除
        UpdateTime:moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    let eModel = dbplatform.Platform_baseInfoDriverAppModel;
    eModel.findOneAndUpdate({LicenseId:actiondata.licenseld},{$set:baseInfoDriverAppDoc},{new:true},(err,result)=> {
        if (!err && result) {
            platformaction.postaction('findOneAndUpdate','baseinfodriverapp',result);
        }
    });
}
