/**
 * Created by wangxiaoqing on 2017/3/21.
 */
// A. 8. 2.  乘客投诉信息接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传乘客投诉信息。
//ratedPassengerComplaint
/*
 程序获取，乘客投诉信息;乘客-》投诉
 */
// let Platform_ratedPassengerComplaintSchema= new Schema({
//     CompanyId:String,	//	是	字符型	V32	公司标识
//     OrderId:String,	//	是	字符型	V64	订单号
//     ComplaintTime:Date,		//	是	数字型	F14	投诉时间	YYYYMMDDhhmmss
//     Detail:String,	//	是	字符型	V256	技诉内容
//     Result:String,	//	否	字符型	V128	处理结果
// });
// Platform_ratedPassengerComplaintSchema.plugin(mongoosePaginate);

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const moment = require('moment');//
let dbplatform = require('../../db/modelsplatform.js');


exports.insertRatedPassengerComplaint  = (actiondata)=> {
    let ratedPassengerComplaintDoc = {
        CompanyId:config.CompanyId,
        OrderId:actiondata.triporderid,// 数据库中读取
        ComplaintTime:moment().format('YYYY-MM-DD HH:mm:ss'),
        Detail:actiondata.detail,
        Result:'',
    };
    let eModel = dbplatform.Platform_ratedPassengerComplaintModel;
    let entity = new eModel(orderMatchDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','ratedpassengercomplaint',result);
        }
    });
}
