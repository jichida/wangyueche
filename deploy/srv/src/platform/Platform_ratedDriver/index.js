/**
 * Created by wangxiaoqing on 2017/3/21.
 */
// . 8. 4. 驾驶员信誉信息接口
// 业务描述  :用于网约车平台公司向部级平台发起请求，上传驾驶员信誉信息。
// ratedDriver
/*
 程序获取，驾驶员信誉信息
 */
// let Platform_ratedDriverSchema= new Schema({
//     Companyld:String,	//	是	字符型	V32	公司标识
//     Licenseld:String,	//	是	字符型	V32	机动车驾驶证编号
//     Level:Number,	//	是	数字型	VI0	服务质量信誉等级	五分制
//     TestDate:Date,	//	是	数字型	  F8	服务质量信誉考核日 期	YYYYMMDD
//     TestDepartment:String,	//	是	字符型	V128 服务质量信誉考核机构
// });
// Platform_ratedDriverSchema.plugin(mongoosePaginate);


let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const util = require('../util');//gettimeformat
let dbplatform = require('../../db/modelsplatform.js');


exports.insertRatedDriver  = (actiondata)=> {
    let ratedDriverDoc = {
        Companyld:config.Companyld,
        Licenseld:'',
        Level:0,
        TestDate:util.gettimeformat(triporder.updated_at),
        TestDepartment:'',
    };
    let eModel = dbplatform.Platform_insertRatedDriverModel;
    let entity = new eModel(ratedDriverDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','rateddriver',result);
        }
    });
}