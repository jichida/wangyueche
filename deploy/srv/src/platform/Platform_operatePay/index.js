/**
 * Created by wangxiaoqing on 2017/3/22.
 */
// A. 6. 5. 经营支付接口业务描述:用于网约车平台公司向部级平台发起请求，上传经营支付信息。
// operatePay
/*
 程序获取，订单信息
 */
// let Platform_operatePaySchema= new Schema({
//     Companyld:String,		//	是	字符型	V32	网约车公司标识
//     Orderld:String,		//	是	字符型	V64	订单编号
//     OnArea:Number,	//	是	数字型	F6	上车位置行政区划编号	见 GB/T 2260
//     DriverName:String,		//	否	字符型	V64	机动车驾驶员姓名
//     Licenseld:String,		//	是	字符型	V32	机动车驾驶证号
//     FareType:String,		//	是	字符型	V16	运价类型编码	由网约车公司定义，与 A. 4. 6运价信息 接 口一一 对应
//     VehicleNo:String,		//	是	字符型	V32	车辆号牌
//     BookDepTime:Date,	//	是	数字型	F14	预计上车时间	YYYYMMDDhhmmss
//     WaitTime:Number,	//	否	数字型	V10	等待时间	单位 :秒
//     DepLongitude:Number,	//	是	数字型	V10	车辆出发经度	单位 :1怜 10-6 度
//     DepLatitude:Number,	//	是	数字型	V10	车辆 出发纬度	单位 :1传 10-6 度
//     DepArea:String,		//	否	字符型	V128	上车地点
//     DepTime:Date,	//	是	数字型	F14	上车时间	YYYYMMDDhhmmss
//     DestLongitude:Number,	//	是	数字型	V 10	车辆到达经度	单位 :1铃 10-6 度
//     DestLatitude:Number,	//	是	数字型	VI0	车辆到达纬度	单位 :1铃 10-6 度
//     DestArea:String,		//	否	字符型	V128	下车地点
//     DestTime:Date,	//	是	数字型	F14	下车时间	YYYYMMDDhhmm ss
//     BookModel:String,		//	否	字符型	V64	预定车型
//     Model:String,		//	否	字符型	V64	实际使用车型
//     DriveMile:Number,	//	是	数字型	V10	载客里程	单位 :km
//     DriveTime:Number,	//	是	数字型	V10	载客时间	单位 :秒
//     WaitMile:Number,	//	否	数字型	V10	空驶里程	单位 :km
//     FactPrice:Number,	//	是	数字型	V10	实收金额	单位:元
//     Price:Number,	//	否	数字型	V10	应收金额	单位 :元
//     CashPrice:Number,	//	否	数字型	V10	现金支付金额	单位 :元
//     LineName:String,		//	否	字符型	V64	电子支付机构
//     LinePrice:Number,	//	否	数字型	V10	电子支付金额	单位 :元
//     PosName:String,		//	否	字符型	 V64	POS 机支付机构
//     PosPrice:Number,	//	否	数字型	V10	POS 机支付金额	单位:元
//     BenfitPrice:Number,	//	否	数字型	V10	优惠金额	单位 :元
//     BookTip:Number,	//	否	数字型	 V10	预约服务费	单位:元
//     PassengerTip:Number,	//	否	数字型	  V10	附加费	单位:元	高峰时段时间 加价金
//     PeakUpPrice:Number,	//	否	数字型	V10	额	单位:.:7G
//     NightUpPrice:Number,	//	否	数字型	V10	夜间时段里程加价金 额	单位:元
//     FarUpPrice:Number,	//	是	数字型	V10	远途加价金额	单位:元
//     OtherUpPrice:Number,	//	是	数字型	V10	其他加价金额	单位:元
//     PayState:String,		//	是	字符型	  V32	结算状态	数据取值有效范围 :O .未结算1. 已结算2 :未知
//     PayTime:Date,	//	否	数字型	F14	乘客结算时间	YYYYMMDDhhmmss
//     OrderMatchTime:Date,	//	否	数字型	F14	订单完成时间	YYYY MMDDhhmm ss
//     InvoiceStatus:String,		//	 是	字符型	 V32	发票状态	数据取值有效范围 :0:未开票1.已开票	2 :未知
// });
// Platform_operatePaySchema.plugin(mongoosePaginate);

let DBModels = require('../../db/models.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const platformaction = require('../platformaction.js');
const util = require('../util');//gettimeformat
let dbplatform = require('../../db/modelsplatform.js');

exports.insertOperatePay  = ({triporder})=> {
    //let WaitTime = triporder.getindate_at.
    let OperatePayDoc = {
        Companyld:config.Companyld,
        Orderld:triporder._id,		//	是	字符型	V64	订单编号
        //OnArea:Number,	//	是	数字型	F6	上车位置行政区划编号	见 GB/T 2260
        DriverName:triporder.driverinfo.DriverName|| '',		//	否	字符型	V64	机动车驾驶员姓名
        Licenseld:triporder.driverinfo.Licenseld || '',		//	是	字符型	V32	机动车驾驶证号
        //FareType:String,		//	是	字符型	V16	运价类型编码	由网约车公司定义，与 A. 4. 6运价信息 接 口一一 对应
        VehicleNo:triporder.driverinfo.VehicleNo|| '',		//	是	字符型	V32	车辆号牌
        BookDepTime:triporder.isrealtime?triporder.created_at:triporder.created_at,	//	是	数字型	F14	预计上车时间	YYYYMMDDhhmmss
        //WaitTime:Number,	//	否	数字型	V10	等待时间	单位 :秒
        DepLongitude:triporder.getinlocation[0],	//	是	数字型	V10	车辆出发经度	单位 :1怜 10-6 度
        DepLatitude:triporder.getinlocation[1],		//	是	数字型	V10	车辆 出发纬度	单位 :1传 10-6 度
        //DepArea:triporder.,		//	否	字符型	V128	上车地点
        ///DepTime:triporder.,	//	是	数字型	F14	上车时间	YYYYMMDDhhmmss
        DestLongitude:triporder.getofflocation[0],	//	是	数字型	V 10	车辆到达经度	单位 :1铃 10-6 度
        DestLatitude:triporder.getofflocation[1],	//	是	数字型	VI0	车辆到达纬度	单位 :1铃 10-6 度
        //DestArea:String,		//	否	字符型	V128	下车地点
        // DestTime:Date,	//	是	数字型	F14	下车时间	YYYYMMDDhhmm ss
        // BookModel:String,		//	否	字符型	V64	预定车型
        // Model:String,		//	否	字符型	V64	实际使用车型
        // DriveMile:Number,	//	是	数字型	V10	载客里程	单位 :km
        // DriveTime:Number,	//	是	数字型	V10	载客时间	单位 :秒
        // WaitMile:Number,	//	否	数字型	V10	空驶里程	单位 :km
        // FactPrice:Number,	//	是	数字型	V10	实收金额	单位:元
        // Price:Number,	//	否	数字型	V10	应收金额	单位 :元
        // CashPrice:Number,	//	否	数字型	V10	现金支付金额	单位 :元
        // LineName:String,		//	否	字符型	V64	电子支付机构
        // LinePrice:Number,	//	否	数字型	V10	电子支付金额	单位 :元
        // PosName:String,		//	否	字符型	 V64	POS 机支付机构
        // PosPrice:Number,	//	否	数字型	V10	POS 机支付金额	单位:元
        // BenfitPrice:Number,	//	否	数字型	V10	优惠金额	单位 :元
        // BookTip:Number,	//	否	数字型	 V10	预约服务费	单位:元
        // PassengerTip:Number,	//	否	数字型	  V10	附加费	单位:元	高峰时段时间 加价金
        // PeakUpPrice:Number,	//	否	数字型	V10	额	单位:.:7G
        // NightUpPrice:Number,	//	否	数字型	V10	夜间时段里程加价金 额	单位:元
        // FarUpPrice:Number,	//	是	数字型	V10	远途加价金额	单位:元
        // OtherUpPrice:Number,	//	是	数字型	V10	其他加价金额	单位:元
        // PayState:String,		//	是	字符型	  V32	结算状态	数据取值有效范围 :O .未结算1. 已结算2 :未知
        // PayTime:Date,	//	否	数字型	F14	乘客结算时间	YYYYMMDDhhmmss
        // OrderMatchTime:Date,	//	否	数字型	F14	订单完成时间	YYYY MMDDhhmm ss
        // InvoiceStatus:String,		//	 是	字符型	 V32	发票状态	数据取值有效范围 :0:未开票1.已开票	2 :未知
    };
    let eModel = dbplatform.Platform_operatePayModel;
    let entity = new eModel(OperatePayDoc);
    entity.save((err,result)=> {
        if (!err && !!result) {
            platformaction.postaction('save','operatepay',result);
        }
    });
}
