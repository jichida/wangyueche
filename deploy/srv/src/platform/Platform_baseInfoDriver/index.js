/**
 * Created by wangxiaoqing on 2017/3/22.
 */
// let Platform_baseInfoDriverAppSchema= new Schema({
//     Companyld:String,	//	是	字符型	V32	公司标识
//     Address:Number,//		是	数字型	F6	注册地行政区划代码	驾驶员在平台的注册地， 见 GB/T 2260
//     Licenseld:String,	//	是	字符型	V32	机动车驾驶证号
//     DriverPhone:String,	//	是	字符型	V32	驾驶员手机号
//     NetType:Number,//	 是	数字型	F1	手机运营商	1.中国联通2 .中国移动3 .中国电信4 :其他
//     AppVersion:String,	//	是	字符型	V32	使用APP版本号
//     MapType:Number,//	 是	数字型	F1	使用地图类型	1:百度地图2 :高德地图3.其他
//     State:Number,//		是	数字型	F1	状态	0 :有效1:失效
//     Flag:Number,//		是	数字型	F1	操作标识	1.新增2.更新3 :删除
//     UpdateTime:Date,//		是	数字型	F14	更新时间	网约车平台完成数据更新 的时间 YYYYMMDDhhmmss
// });
// Platform_baseInfoDriverAppSchema.plugin(mongoosePaginate);

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const util = require('../util');//gettimeformat
let dbplatform = require('../../db/modelsplatform.js');

exports.insertBaseInfoDriver  = (actiondata)=> {
    let baseInfoDriverDoc = {
      
    };
    let eModel = dbplatform.Platform_baseInfoDriverModel;
    let entity = new eModel(baseInfoDriverDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','baseinfodriver',result);
        }
    });
}

exports.updateBaseInfoDriver  = (actiondata)=> {
    let baseInfoDriverDoc = {

    };
    let eModel = dbplatform.Platform_baseInfoDriverModel;
    eModel.findOneAndUpdate({Licenseld:actiondata.licenseld},{$set:baseInfoDriverDoc},{new:true},(err,result)=> {
        if (!err && result) {
            platformaction.postaction('findOneAndUpdate','baseinfodriver',result);
        }
    });
}