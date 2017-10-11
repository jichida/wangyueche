/**
 * Created by wangxiaoqing on 2017/3/21.
 */
/**
 * Created by wangxiaoqing on 2017/3/21.
 */
// let Platform_orderMatchSchema= new Schema({
//     Companyld:String,	//	是	字符型	  V32	公司标识
//     Address:Number,//	是	数字型	  F6	发起地行政区划代码	见 GB/T 2260
//     Orderld:String,	//	是	字符型	  V64	订单编号
//     Longitude:Number,//	否	数字型	VI0	车辆经度	单位 :1赞 10-6 度
//     Latitude:Number,//	否	数字型	VI0	车辆纬度	单位:1铃 10-6 度  l :GCJ 一02 测绘局标准2:WGS84 GPS 标准
//     Encrypt:Number,//	是	数字型	Fl	坐标加密标识	3:BD-09 百度标准4 :CGCS2000  北斗标准  0 :其他
//     Licenseld:String,	//	是	字符型	V32	机动车驾驶证编号 DriverPhone	是	字符型	V32	驾驶员手机号 VehicleNo	是	字符型	V32	车辆号牌
//     DistributeTime:Date,//	是	数字型	F14	派单成功时间	YYYYMMDDhhmmss
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
// "srcaddress" : {
//     "location" : {
//         "lng" : 118.728138148353,
//             "lat" : 31.9910114596804
//     },
//     "addressname" : "江苏省南京市建邺区沙洲街道南京市建邺实验小学"
// },
// "dstaddress" : {
//     "location" : {
//         "lng" : 118.798542,
//             "lat" : 31.968791
//     },
//     "addressname" : "南京市江宁区玉兰路98号南京南站"
// },

exports.insertOrderMatch  = ({triprequest,triporder})=> {
    let orderMatchDoc = {
        Companyld:config.Companyld,
        Address:config.Address,// 数据库中读取
        Orderld:triporder._id,
        Longitude:triprequest.driverlocation[0],
        Latitude:triprequest.driverlocation[1],
        Encrypt:1,//1:GCJ-02 测绘局标准
        Licenseld:'',//<-----机动车驾驶证编号
        DistributeTime:util.gettimeformat(triporder.updated_at),
    };
    let eModel = dbplatform.Platform_orderMatchModel;
    let entity = new eModel(orderMatchDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','ordermatch',result);
        }
    });
}