/**
 * Created by wangxiaoqing on 2017/3/22.
 */
// A. 4. 14. 乘客基本信息接口baselnfoPassenger
/*
 乘客信息
 注册时候填
 */
// let Platform_baseInfoPassengerSchema= new Schema({
//     CompanyId:String,	//		是	字符型V32	公司标识
//     RegisterDate:Date,//	  否	数字型	F8	注册日期	乘客在平台的注册日期YYYYMMDD
//     PassengerPhone:String,	//	是	字符型	V32	乘客手机号
//     PassengerName:String,	//	否	字符型	V64	乘客称谓
//     PassengerGender:String,	//	否	字符型	V2	乘客性别
//     State:Number,//	是	数字型	F1	状态	0:有效1.失效
//     Flag:Number,//	是	数字型	F1	操作标识	1:新增2 :更新3:删除
//     UpdateTime:Date,//	是	数字型	F14	更新时间	网约车平台完成数据更 新的时间 YYYYMMDDh hmmss
// });
// Platform_baseInfoPassengerSchema.plugin(mongoosePaginate);
let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
let dbplatform = require('../../db/modelsplatform.js');
const moment  = require('moment');

exports.insertBaseInfoPassenger  = (actiondata)=> {
    let baseInfoPassengerDoc = {
        CompanyId:config.CompanyId,
        RegisterDate:moment(actiondata.registerdate).format('YYYY-MM-DD'),
        PassengerPhone:actiondata.passgngerphone,
        PassengerName:actiondata.passengername,
        PassengerGender:actiondata.passengergender,//	否	字符型	V2	乘客性别
        State:0,
        Flag:1,//		是	数字型	F1	操作标识	1.新增2.更新3 :删除
        UpdateTime:moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    let eModel = dbplatform.Platform_baseInfoPassengerModel;
    let entity = new eModel(baseInfoPassengerDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','baseinfopassenger',result);
        }
    });
}

exports.updateBaseInfoPassenger  = (actiondata)=> {
    let baseInfoPassengerDoc = {
        CompanyId:config.CompanyId,
        RegisterDate:moment(actiondata.registerdate).format('YYYY-MM-DD'),
        PassengerPhone:actiondata.passgngerphone,
        PassengerName:actiondata.passengername,
        PassengerGender:actiondata.passengergender,//	否	字符型	V2	乘客性别
        State:0,
        Flag:2,//		是	数字型	F1	操作标识	1.新增2.更新3 :删除
        UpdateTime:moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    let eModel = dbplatform.Platform_baseInfoPassengerModel;
    eModel.findOneAndUpdate({PassengerPhone:baseInfoPassengerDoc.PassengerPhone},{$set:baseInfoPassengerDoc},{new:true},(err,result)=> {
        if (!err && result) {
            platformaction.postaction('findOneAndUpdate','baseinfopassenger',result);
        }
    });
}
