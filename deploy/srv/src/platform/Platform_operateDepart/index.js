/**
 * Created by wangxiaoqing on 2017/3/22.
 */
// A. 6. 3. 经营出发接口 业务描述:用于网约车平台公司向部级平台发起请求，上传经营出发信息。
/*
 程序获取
 */
// let Platform_operateDepartSchema= new Schema({
//     Companyld:String,		//	是	字符型	V32	公司标识
//     Orderld:String,		//	是	字符型	V64	订单号
//     Licenseld:String,		//	是	字符型	V32	机动车驾驶证号
//     FareType:String,		//	是	字符型	V16	运价类型编码
//     VehicleNo:String,		//	是	字符型	V32	车辆号牌
//     DepLongitude:Number,	//	是	数字型	V10	车辆出发经度	单位 :1祷 10-6 度
//     DepLatitude:Number,	//	是	数字型	V10	车辆出发纬度	单位 :1*10-6 度
//     Encrypt:Number,	//	是	数字型	F1	坐标加密标识	l:GCJ 一02 测绘局标准2 :WGS84 GPS 标准3 :BD一09  百度标准4 :CGCS2000 北斗标准0:其他
//     DepTime:Date,	//	是	数字型	F14	上车时间	YYYYMMDDhhmmss
//     WaitMile:Number,	//	否	数字型	VIO	空驶里程	单位 :km
//     WaitTime:Number,	//	否	数字型	VIO	等待时间	单位:秒
// });
// Platform_operateDepartSchema.plugin(mongoosePaginate);
let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const util = require('../util');//gettimeformat
let dbplatform = require('../../db/modelsplatform.js');
//到达出发地
exports.insertOperateDepart  = ({triprequest,triporder})=> {
    // let datestart = triprequest.getindate_at.getTime();
    // let dateend = triprequest.getoffdate_at.getTime();
    // let DriveTime = (dateend - datestart)/1000;

    let operateDepartDoc = {
        Companyld:config.Companyld,
        Orderld:triporder._id,
        Licenseld:'',//
        FareType:'',//
        VehicleNo:'',//
        DepLongitude:triporder.getinlocation[0],
        DepLatitude:triporder.getinlocation[1],
        Encrypt:1,//1:GCJ-02 测绘局标准
        DepTime:triporder.getindate_at,
        WaitMile:0,
        WaitTime:0
    };
    let eModel = dbplatform.Platform_operateDepartModel;
    let entity = new eModel(operateDepartDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','operatedepart',result);
        }
    });
}