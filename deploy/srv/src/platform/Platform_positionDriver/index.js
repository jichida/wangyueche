/**
 * Created by wangxiaoqing on 2017/3/21.
 */
// A. 7. 1.驾驶员定位信息接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传驾 驶员定位信息。
/*
 程序获取，司机定位信息，定时获取
 */
// let Platform_positionDriverSchema= new Schema({
//     CompanyId:String,		//	是	字符型	V32	网约车公司标识
//     LicenseId:String,		//	是	字符型	V32	网约车公司标识	是	字符型	V32		机动车驾驶证号		驾驶员报备地行政区划
//     DriverRegionCode:Number,	//	是	数字型	F6		行政区划代码	代码，地市级，应符合GB/T2260
//     VehicleNo:String,		//	是	字符型	V32	网约车公司标识	是	字符型 V32		车辆号牌
//     PositionTime:Date,	//	是	数字型	V14		定位时间	umxtlme
//     Longitude:Number,	//	是	数字型	V10		经度	单位 :1祷 10-6 度
//     Latitude:Number,	//	是	数字型	V10		纬度	单位 :1铃 10-6 度 1:GC]-02 测绘局标准
//     Encrypt:Number,	//	否	数字型	V10		坐标加密标识	2:WGS84 GPS 标准3:BD一09 百度标准4:CGCS2000 北斗标准0:其他
//     Direction:Number,	//	否	数字型	V10		方向角	0-359 ，顺时针方向
//     Elevation:Number,	//	否	数字型	V10		海拔高度	单位:米
//     Speed:Number,	//	否	数字型	V10		瞬时速度	单位 :公里每小时(km/h)
//     BizStatus:Number,	//	否	数字型	V10		营运状态	1:载客、2.接单、3 :空驶4.停运
//     OrderId:String,		//	是	字符型	V64		订单编号
// });
// Platform_positionDriverSchema.plugin(mongoosePaginate);

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
let dbplatform = require('../../db/modelsplatform.js');
const moment = require('moment');

exports.insertPositionDriver  = (actiondata)=> {
    let positionDriverDoc = {
        CompanyId:config.CompanyId,		//	是	字符型	V32	网约车公司标识
        LicenseId:actiondata.licenseld,		//	是	字符型	V32	网约车公司标识	是	字符型	V32		机动车驾驶证号		驾驶员报备地行政区划
        DriverRegionCode:actiondata.riverregioncode,	//	是	数字型	F6		行政区划代码	代码，地市级，应符合GB/T2260
        VehicleNo:actiondata.vehicleno,		//	是	字符型	V32	网约车公司标识	是	字符型 V32		车辆号牌
        PositionTime:moment().format('YYYY-MM-DD HH:mm:ss'),	//	是	数字型	V14		定位时间	umxtlme
        Longitude:actiondata.driverlocation[0],
        Latitude:actiondata.driverlocation[1],
        Encrypt:1,	//	否	数字型	V10		坐标加密标识	2:WGS84 GPS 标准3:BD一09 百度标准4:CGCS2000 北斗标准0:其他
        Direction:0,	//	否	数字型	V10		方向角	0-359 ，顺时针方向
        Elevation:0,	//	否	数字型	V10		海拔高度	单位:米
        Speed:0,	//	否	数字型	V10		瞬时速度	单位 :公里每小时(km/h)
        BizStatus:actiondata.bizstatus,	//	否	数字型	V10		营运状态	1:载客、2.接单、3 :空驶4.停运
        OrderId:actiondata.triporderid,		//	是	字符型	V64		订单编号
    };
    let eModel = dbplatform.Platform_positionDriverModel;
    let entity = new eModel(positionDriverDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','positiondriver',result);
        }
    });
}
