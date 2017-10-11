/**
 * Created by wangxiaoqing on 2017/3/21.
 */
// A. 7. 2.  车辆定位信息接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传车辆定位信息。positionVehicle
/*
 程序获取，车辆定位信息，定时获取
 */
// let Platform_positionVehicleSchema= new Schema({
//     Companyld:String,	//是	字符型	V32	公司标识
//     VehicleNo:String,	//是	字符型	V32	车辆号牌
//     VehicleRegionCode:Number,		//是	数字型	F6 行政区划代码	车辆报备地行政区划代码，地市级 ，应符合GB/T2260
//     PositionTime:Date,		//是	数字型	 V14	定位时间	Unlxtlme
//     Longitude:Number,		//是	数字型	VIO	经度	单位 :1铃 10-6 度
//     Latitude:Number,		//是	数字型	VIO	纬度	单位:1祷 10-6 度
//     Speed:Number,		//	否	数字型	VIO	瞬时速度	单位 :公里每小时(km/h)
//     Direction:Number,		//	否	数字型	VIO	方向角	。一359 ，顺时针方向
//     Elevation:Number,		//	否	数字型	VIO	海拔高度	单位 :米
//     Mileage:Number,		//	否	数字型	V10	行驶里程	单位 :km
//     Encrypt:Number,		//	否	数字型	V10	坐标加密标识	1:∞J一02 测绘局标准2 :WGS84  GPS 标准3:BD一 09 百度标准4:CGCS2000 北斗标准O  .其他
//     WarnStatus:Number,		//	否	数字型	V10	预警状态	参考 JT/T808
//     VehStatus:Number,		//	否	数字型	V10	车辆状态	参考 JT/T808
//     BizStatus:Number,		//	否	数字型	V10	营运状态	1.载客2 :接单3 :空驶  4 .停运
//     Orderld:String,	//是	字符型	V64	订单编号	非营运状态下填 "0"
// });
// Platform_positionVehicleSchema.plugin(mongoosePaginate);

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const util = require('../util');//gettimeformat
let dbplatform = require('../../db/modelsplatform.js');


exports.insertPositionVehicle  = (actiondata)=> {
    let positionVehicleDoc = {
        Companyld:config.Companyld,		//	是	字符型	V32	网约车公司标识
        VehicleNo:actiondata.licenseld,			//	是	字符型	V32	网约车公司标识	是	字符型	V32		机动车驾驶证号		驾驶员报备地行政区划
        VehicleRegionCode:actiondata.riverregioncode,		//	是	数字型	F6		行政区划代码	代码，地市级，应符合GB/T2260
        VehicleNo:actiondata.vehicleno,	//	是	字符型	V32	网约车公司标识	是	字符型 V32		车辆号牌
        PositionTime:util.gettimeformat(new Date()),//	是	数字型	V14		定位时间	umxtlme
        Longitude:actiondata.driverlocation[0],	//	是	数字型	V10		经度	单位 :1祷 10-6 度
        Latitude:actiondata.driverlocation[1],	//	是	数字型	V10		纬度	单位 :1铃 10-6 度 1:GC]-02 测绘局标准
        Encrypt:1,	//	否	数字型	V10		坐标加密标识	2:WGS84 GPS 标准3:BD一09 百度标准4:CGCS2000 北斗标准0:其他
        Speed:0,	//	否	数字型	V10		瞬时速度	单位 :公里每小时(km/h)
        Direction:0,	//	否	数字型	V10		方向角	0-359 ，顺时针方向
        Elevation:0,		//	否	数字型	VIO	海拔高度	单位 :米
        Mileage:0,		//	否	数字型	V10	行驶里程	单位 :km
        WarnStatus:0,		//	否	数字型	V10	预警状态	参考 JT/T808
        VehStatus:0,		//	否	数字型	V10	车辆状态	参考 JT/T808
        BizStatus:0,		//	否	数字型	V10	营运状态	1.载客2 :接单3 :空驶  4 .停运
        Orderld:actiondata.triporderid,			//	是	字符型	V64		订单编号
    };
    let eModel = dbplatform.Platform_positionVehicleModel;
    let entity = new eModel(positionVehicleDoc);
    entity.save((err,result)=> {
        if (!err && result) {
            platformaction.postaction('save','positionvehicle',result);
        }
    });
}