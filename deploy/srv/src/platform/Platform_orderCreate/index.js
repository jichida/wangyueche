// A.5.  订 单信息交换接口
// A. 5. 1.订单发起接 口
// orderCreate
/*
 订单信息（阶段N)，程序获取
 */
// let Platform_orderCreateSchema= new Schema({
//     CompanyId:String,	//	是	字符型	V32	公司标识
//     Address:Number,//	是	数字型	F6	发起地行政区划代码	见 GB/T 2260
//     OrderId:String,	//	是	字符型	V64	订单编号
//     DepartTime:Date,//	是	数字型	F14	预计用车时间	YYYYMMDDhhmmss
//     OrderTime:Date,//	是	数字型F14	订单发起时间 YYYYMMDDhhmmss
//     PassengerNote:String,	//	否	字符型V128	乘客备注
//     Departure:String,	//是字符型V128 预计出发地点详细地址
//     DepLongitude:Number,//	是	数字型V10	预计出发地点经度	单位 :1 祷 10-6度
//     DepLatitude:Number,//	是	数字型V10	预计出发地点纬度	单位:1铃 10-6度
//     Destination:String,	//	是	字符型V128	预计目的地
//     DestLongitude:Number,//	是	数字型VI0	预计目的地经度	单位 :1铃 10-6度
//     DestLatitude:Number,//	是	数字型V10	预计目的地纬度	单位 :1怜 10-6度
//     Encrypt:Number,//是数字型F1坐标加密标识1:GCJ-02 测绘局标准2 :WGS84 GPS 标准3 :BD-09 百度标准4 :CGCS2000 北斗标准O .其他
//     FareType:String,	//	是	字符型V16	运价类型编码
// });
let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const moment = require('moment');
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

exports.insertOrderCreate  = ({triprequest,triporder})=> {
    let orderCreateDoc = {
        CompanyId:config.CompanyId,
        Address:config.Address,// 数据库中读取
        OrderId:triporder._id,
        DepartTime:triprequest.isrealtime?moment(triprequest.created_at).format('YYYY-MM-DD'):moment(triprequest.dated_at).format('YYYY-MM-DD'),
        OrderTime:moment(triporder.created_at).format('YYYY-MM-DD HH:mm:ss'),
        PassengerNote:'',
        Departure:triporder.srcaddress.addressname,
        DepLongitude:triporder.srcaddress.location.lat,
        DepLatitude:triporder.srcaddress.location.lng,
        Destination:triporder.dstaddress.addressname,
        DestLongitude:triporder.dstaddress.location.lat,
        DestLatitude:triporder.dstaddress.location.lng,
        Encrypt:1,//1:GCJ-02 测绘局标准
        FareType:''//运价编码（缺失）
    };
    let eModel = dbplatform.Platform_orderCreateModel;
    let entity = new eModel(orderCreateDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','ordercreate',result);
        }
    });
}
