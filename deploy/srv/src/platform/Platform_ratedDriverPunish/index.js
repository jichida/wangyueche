/**
 * Created by wangxiaoqing on 2017/3/21.
 */
// A. 8. 3. 驾驶员处罚信息接口
// 业务描述  :用于网约车平台公司向部级平台发起请求，上传驾驶员处罚信息。
// ratedDriverPunish
/*
 程序获取，驾驶员处罚信息接口
 */
// let Platform_ratedDriverPunishSchema= new Schema({
//     Companyld:String,	//	是	字符型	V32	公司标识
//     Licenseld:String,	//	是	字符型	V32	机动车驾驶证编号
//     PunishTime:Date,	//	是	数字型	F14	处罚时间	YYYYMMDDhhmmss
//     PunishReason:String,	//	否	字符型	V128	处罚原因
//     PunishResult:String,	//	是	字符型	V128	处罚结果
// });
// Platform_ratedDriverPunishSchema.plugin(mongoosePaginate);

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const util = require('../util');//gettimeformat
let dbplatform = require('../../db/modelsplatform.js');


exports.insertRatedDriverPunish  = ({triprequest,triporder})=> {
    let ratedDriverPunishDoc = {
        Companyld:config.Companyld,
        Licenseld:'',// 数据库中读取
        PunishTime:util.gettimeformat(triporder.updated_at),
        PunishReason:'',
        PunishResult:'',
    };
    let eModel = dbplatform.Platform_ratedDriverPunishModel;
    let entity = new eModel(ratedDriverPunishDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','rateddriverpunish',result);
        }
    });
}