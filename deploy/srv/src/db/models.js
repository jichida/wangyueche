let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
const config = require('../config.js');
const moment = require('moment');

mongoose.Promise = global.Promise;
//系统设置
let SystemConfigSchema = new Schema({
    commenttagsforrider:[],
    commenttagsfordriver:[],
    platformdriverfeediscount:{ type: Number, default: 0.8 },//
    maxshowtags:{ type: Number, default: 9 },//
    pinchecitylist:[],//拼车城市列表
    hotcity:[],
    servicephonenumber:String,//客服电话
    downloadurl_android:String,//android下载地址
    downloadurl_ios:String,//ios下载地址
    daijialeastbalance:{ type: Number, default: 50 },
    daijiacancelprice:{ type: Number, default: 10 },

    pinchetimecancelwhennotpaid:{ type: Number, default: 10 },//单位：分钟，如未支付则自动取消
});
SystemConfigSchema.plugin(mongoosePaginate);
//拼车司机
let UserDriverPincheSchema = new Schema({
  username:String,
  created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  updated_at:String,
  truename:String,
  nickname:String,
  password:String,
  isenabled:{type:Boolean,default:true}//是否启用
});
UserDriverPincheSchema.plugin(mongoosePaginate);
//拼车司机登录日志
let UserDriverPincheLoginLogSchema = new Schema({
    username:String,
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    creator:{ type: Schema.Types.ObjectId, ref: 'userdriverpinche' },
    type:{type:String,default:'login'}
});
UserDriverPincheLoginLogSchema.plugin(mongoosePaginate);
//乘客表//常用地址管理
let UserRiderSchema = new Schema({
    username:String,
    openidqq: String,
    openidweixin: String,
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    updated_at:String,
    truename:String,
    phoneos:String,//'android' & 'ios'
    oftenuseaddress:Schema.Types.Mixed,
    profile:Schema.Types.Mixed,
    starnum:{ type: Number, default: 0 },//
    balance:{ type: Number, default: 0 },
    point:{ type: Number, default: 0 },
    isapprovaled:{ type: Boolean, default: false },//是否审批通过
});
UserRiderSchema.plugin(mongoosePaginate);

//乘客登录日志
let UserRiderLoginLogSchema = new Schema({
    username:String,
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    creator:{ type: Schema.Types.ObjectId, ref: 'userrider' },
    type:{type:String,default:'login'}
});
UserRiderLoginLogSchema.plugin(mongoosePaginate);

//司机表
//未审批的司机不能接单
let UserDriverSchema = new Schema({
    username:String,
    passwordhash:String,
    passwordsalt:String,
    registertype:String,
    phoneos:String,//'android' & 'ios'
    created_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    updated_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    profile:Schema.Types.Mixed,
    avatarURL:String,//司机头像
    starnum:{ type: Number, default: 0 },//
    idcard:String,//身份证号<---
    bankname:String,//银行名字<---
    bankaccount:String,//银行账号<---
    huji:String,//户籍
    PhotoandCarmanURL:String,//人车合影
    PhotoJiandukaURL:String,//监督卡照片
    PhotoServiceicenseURL:String,//服务资格证
    CarrunPhotoIdURL:String,//机动车行驶证
    Platform_baseInfoDriverId:{ type: Schema.Types.ObjectId, ref: 'baseinfodriver' },
    Platform_baseInfoDriver:{
        CompanyId:String,	//是	字符型	V32	公司标识
        Address:Number,//	是	数字型	F6	注册地行政区划代码	车辆在平台的注册地，见GB/T2260

        DriverName:String,	// <---否字符型V64 机动车驾驶员姓名
        DriverPhone:String,	// <---是字符型V32 驾驶员手机号
        DriverGender:String,	//<--- 是字符型V2 驾驶员性别见JT/ T 697. 7- 2014中4. 1. 2. 1. 3
        DriverBirthday:String,	// 是数字型F8 出生日期YYYYMMDD
        DriverNationality:String,	// 杏字符型V32 国籍
        DriverNation:String,	//<--- 是字符型V32 驾驶员民族见JT/T 697. 7-2014中4. 1. 2. 1. 7
        DriverMaritalStatus:String,	//<--- 杏字符型V64 驾驶员婚姻状况未婚;已婚;离异
        DriverLanguageLevel:String,	// 否字符型V64 驾驶员外语能力
        DriverEducation:String,	// 否字符型V64 驾驶员学历见JT/T 697. 7-2014中4. 1. 2. 1. 11

        DriverCensus:String,	//	否	字符型	V256	户口登记机关名称
        DriverAddress:String,	//	否	字符型	V256	户口住址或长住地址 阶iv町
        DriverContactAddress:String,	//<---	是	字符型	V256	驾驶员通信地址
        PhotoId:String,	//	否	字符型	V128	驾驶员照片文件编号	FTPS  接口传输;格式 照片文件通过 6. 1 节jpg; 按照居民身份证照片的标准
        PhotoIdURL:String,	//<---	否	字符型	V128	驾驶员照片文件编号	FTPS  接口传输;格式 照片文件通过 6. 1 节jpg; 按照居民身份证照片的标准
        LicenseId:String,	//	是	字符型	V32	机动车驾驶证号
        LicensePhotoIdURL:String,	//<---	否	字符型	V128机动车驾驶证扫描件文件编号扫描件文件通过 6. 1节FTPS 接口传输;格式lPg
        DriverType:String,	//<---	否	字符型	V16	准驾车型见 JT/T 697. 7-2014中 5. 16
        GetDriverLicenseDate:String,//<---	是 数字型 F8 初次领取驾驶证日期 YYYYMMDD
        DriverLicenseOn:String,//	 是 数字型  F8  驾驶证有效期限起  YYYYMMDD
        DriverLicenseOff:String,//	            是   数字型   F8      驾驶证有效期限止    YYYYMMDD

        TaxiDriver:Boolean,//<---	                   是   数字型   F1      是否出租汽车驾驶员	。:否
        CertificateNo:String,	//<---                         是   字符型  V128    网络预约出租汽车驾驶员资格证号
        NetworkCarIssueOrganization:String,	//<--- 是	字符型	V256网络预约出租汽车驾驶员证发证机构
        NetworkCarIssueDate:String,//		是	数字型	F8	资格证发证日期	YYYYMMDD
        GetNetworkCarProofDate:String,//		是	数字型	F8	初次领取资格证日期	YYYYMMDD
        NetworkCarProofOn:String,//		是	数字型	F8	资格证有效起始日期	YYYYMMDD
        NetworkCarProofOff:String,//		是	数字型	F8	资格证有效截止日期	YYYYMMDD
        RegisterDate:String,//	 是数字型F8报备日期驾驶员信息向服务所在 地出租汽车行政主管部 门报备日期 YYYYM-MDD

        FullTimeDriver:Boolean,//	 否数字型F1  是否专职驾驶员1:是  0:否
        InDriverBlacklist:Boolean,//	否数字型F1是否在驾驶员黑名单内	1.是。:否
        CommercialType:Number,//	  是数字型F1服务类型1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
        ContractCompany:String,	//是字符型V256驾驶员合同〈或协议〉 签署公司全称
        ContractOn:String,//	是数字型F8   合同或协议)有效期起 YYYYMMDD
        ContractOff:String,//	是数字型F8	合同(或协议)有效期止 YYYYMMDD

        EmergencyContact:String,	//	否	字符型V64	紧急情况联系人
        EmergencyContactPhone:String,	//否字符型V32 紧急情况联系人电话手机号
        EmergencyContactAddress:String,	//否字符型V256  紧急情况联系人通信地址
    },
    balance:{type:Number,default:0},
    defaultmycar:{ type: Schema.Types.ObjectId, ref: 'mycar' },
    Platform_baseInfoVehicleId:{ type: Schema.Types.ObjectId, ref: 'baseinfovehicle' },
    Platform_baseInfoVehicle:{
      Address:Number,		//是	数字型	F6 行政区划代码	车辆报备地行政区划代码，地市级 ，应符合GB/T2260

      VehicleNo:String,//<---	是	字符型	V32	车辆号牌
      PlateColor:String,//	是	字符型	V32	车牌颜色	见 J T/T 697. 7-2014 中5.6
      Seats:Number,//<---	是	数字型	V10	核定载客位
      Brand:String,//	是	字符型	V64	车辆厂牌
      Model:String,//	是	字符型	V64	车辆型号
      VehicleType:String,//	是	字符型	V64	车辆类型	以机动车行驶证为准
      OwnerName:String,//	是	字符型	V64	车辆所有人	应与《机动车登记证书》所注明的车辆所有人一致
      VehicleColor:String,//	是	字符型	V32	车身颜色

      EngineId:String,//	是	字符型	V32	发动机号	以机动车行驶证为准
      VIN:String,//	是	字符型	F17	车辆VIN码	以机动车行驶证为准
      CertifyDateA:String,//	是	数字型	F8	车辆注册日期	以机动车行驶证为准
      FuelType:String,//	是	字符型	V32	牢辆燃料类型	见 JT/T697. 7-2014  中4. 1.4. 15
      EngineDisplace:String,//	是	字符型	V32	发动机排量	单位 :毫升

      PhotoId:String,//	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
      PhotoIdURL:String,//<---	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
      Certificate:String,//<---	否	字符型	V64	运输证字号	见 JT/T  415-2006  中5. 4.1，地市字别可包含三个汉字
      TransAgency:String,//	是	字符型	V256	车辆运输证发证机构	全称
      TransArea:String,//	是	字符型	V256	车辆经营区域
      TransDateStart:String,//	是	数字型	F8	车辆运输证有效期起	YYYYMMDD 元素名称	必选	类型	长度	字段名称	描	述
      TransDateStop:String,//	是	数字型	F8	车辆运输证有效期止	YYYYMMDD
      CertifyDateB:String,//	是	数字型	F8	车辆初次登记日期	YYYYMMDD
      FixState:String,//	是字符型	V64	车辆检修状态	数据取值有效范围 :0 :未检修1.已检修2 :未知
      NextFixDate:String,//	否	数字型	F8	车辆下次年检时间
      CheckState:String,//<---	是	字符型	F2	车辆年度审验状态	见 JT/T 415-2006 中5.4.4
      FeePrintId:String,//	是	字符型	V32	发票打印设备序列号

      GPSBrand:String,//	是	字符型	V2 56	卫星定位装置品牌
      GPSModel:String,//	是	字符型	V64	卫星定位装置型号
      GPSIMEI:String,//	否	字符型	V128	卫星定位装置IMEI号
      GPSlnstallDate:String,//	是	数字型	F8	卫星定位设备安装日期	YYYYMMDD

      RegisterDate:String,//	是	数字型	F8	报备日期	车辆信息向服务所在地出租汽车行政主管部门报备 日期 YYYYMMDD
      CommercialType:Number,//	是	数字型	F1	服务类型	1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
      FareType:{ type: Schema.Types.ObjectId, ref: 'faretype' },//	是	字符型	V16	运价类型编码由网约车公司定义，与 A. 4.6 运价信息接口一一对 应
    },
    issynctoplatform:{ type: Boolean, default: false },//同步到平台,admin有效
    approvalrejectseason:{type:String,default:''},
    approvalstatus:{type:String,default:'未递交'},//未递交/待审核/审核中/已审核/已拒绝
});
UserDriverSchema.plugin(mongoosePaginate);

//司机登录日志
let UserDriverLoginLogSchema = new Schema({
    username:String,
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    creator:{ type: Schema.Types.ObjectId, ref: 'userdriver' },
    type:{type:String,default:'login'}
});
UserDriverLoginLogSchema.plugin(mongoosePaginate);
//乘客紧急联系人
let UserEmerygencyContactSchema = new Schema({
    userid:{ type: Schema.Types.ObjectId, ref: 'userrider' },
    name:String,
    tel:String,
});
UserEmerygencyContactSchema.plugin(mongoosePaginate);
//乘客发送的请求
let TripRequestSchema = new Schema({
    rideruserid:{ type: Schema.Types.ObjectId, ref: 'userrider' },
    driveruserid:{ type: Schema.Types.ObjectId, ref: 'userdriver' },
    srclocation:  {
        type: [Number],
        index: '2dsphere'
    },
    dstlocation:  {
        type: [Number],
        index: '2dsphere'
    },
    resultpricedetail:Schema.Types.Mixed,//仅快车，出租车，代驾有效，使用平台定义的运价(详细信息）
    getindate_at:String,//上车时间
    getoffdate_at:String,//下车时间
    getinlocation:[Number],//上车位置
    getofflocation:[Number],//下车位置
    riderlocation:[Number],
    driverlocation:[Number],
    srcaddress:Schema.Types.Mixed,//预计出发地
    dstaddress:Schema.Types.Mixed,//预计目的地
    createtime:String,
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    dated_at:String,
    updated_at:String,
    triptype:String,
    isrealtime:Boolean,
    showtimestring:String,
    requeststatus:String,//请求中,已接单,待上车(到达起始点）,行程中,已结束（已接单已到达视为已结束），已取消
});
TripRequestSchema.plugin(mongoosePaginate);
//拼车城市站点设置
UserAdminSchema = new Schema({
  username:String,
  passwordhash: String,
  passwordsalt: String,
  created_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  updated_at: String,
});

//拼车--行程路线(后台发布)
BuscarpoolSchema = new Schema({
    pinchetype:String,//拼车类型:专线、人气团拼
    startcity:String,//开始城市
    endcity:String,//结束城市
    starttime:String,//出发时间
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    startdate:String,//出发日期 'YYYY-MM-DD'
    seatnumber:Number,//座位
    groupnumber:Number,//成团人数
    startstations:[],//出发点站台{name/address/desc/location}
    endstations:[],//结束点站台{name/address/desc/location}
    status:{type:String,default:'未成团'},//状态,【已成团,未成团】
    userlist:[],//
    carpoolprice:Schema.Types.Mixed,//价格信息
    carpoolstationtime:Schema.Types.Mixed,//站点时间
    pinchedriveruserid:{ type: Schema.Types.ObjectId, ref: 'userdriverpinche' },
    isenabled:Boolean//是否启用
});
BuscarpoolSchema.plugin(mongoosePaginate);

//乘车订单
let TripOrderSchema = new Schema({
    out_trade_no:String,//内部订单id
    rideruserid:{ type: Schema.Types.ObjectId, ref: 'userrider' },
    driveruserid:{ type: Schema.Types.ObjectId, ref: 'userdriver' },
    triptype:String,//快车，出租车，代驾|拼车|旅游大巴 |充值（仅乘客端有效）
    resultpricedetail:Schema.Types.Mixed,//仅快车，出租车，代驾有效，使用平台定义的运价(详细信息）
    realtimepricedetail:Schema.Types.Mixed,//仅快车，出租车，代驾有效，实时信息
    ctxrealtimeprice:Schema.Types.Mixed,//动态上下文信息
    driverlocation:[Number],

    ordertitle:String,  //订单标题（支付宝，微信用）
    orderdetail:String,//订单内容（文字）
    orderprice:Number,//订单金额(未折扣前)
    realprice:Number,//实付价格
    balanceprice:{ type: Number, default: 0 },//余额抵扣金额
    frontmoney:{ type: Number, default: 0 },//定金
    frontpaytype:String,//定金支付方式
    couponprice:{ type: Number, default: 0 },//抵扣价
    couponid:{ type: Schema.Types.ObjectId, ref: 'mycoupon' },
    couponinfo:Schema.Types.Mixed,//优惠券信息
    commentflag:{ type: Number, default: 0 },//评论标志：0:双方未平,1:乘客已评,2:司机已评,3:双方互评.
    //通用
    ordertitle:String,
    orderdetail:String,
    paytype:String,//支付方式
    pay_at:String,
    created_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//订单生成时间
    dated_at:String,//预计上车时间
    updated_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//订单更新时间
    finished_at:String,//订单完成时间
    paystatus:{ type: String, default: '未支付' },//订单状态：未支付->已支付定金->已支付
    orderstatus:{ type: String, default: '未支付' },//订单状态：未支付->待支付(不能取消)->已支付
    relatedid:String,//快车，出租车，代驾:请求id,拼车：buscarpoolId,旅游大巴：无
    triprequest:{ type: Schema.Types.ObjectId, ref: 'triprequest' },
    srclocation:  {//查询用
        type: [Number],
        index: '2dsphere'
    },
    riderinfo:{
      avatarURL:{ type: String, default: config.defaultprofileimage },
      RiderPhone:String,//乘客电话
      RiderName:String,//乘客姓别
    },
    driverinfo:{
      LicenseId:String,	//驾驶证号
      avatarURL:{ type: String, default: config.defaultprofileimage },
      DriverName:String,//司机名
      DriverPhone:String,//司机电话
      DriverGender:String,//司机姓别
      PlateColor:String,//车辆颜色
      Seats:{ type: Number, default: 0 },//核定载客位
      VehicleNo:String,//车牌号
      Brand:String,//车辆厂牌
      Model:String,//车辆型号
      starnum:{ type: Number, default: 0 },//星级
    },
    isrealtime:{ type: Number,default: true } ,//是否实时
    srcaddress:Schema.Types.Mixed,
    dstaddress:Schema.Types.Mixed,
    getindate_at:String,//上车时间
    getoffdate_at:String,//下车时间
    getinlocation:[Number],//上车位置
    getofflocation:[Number],//下车位置
    totaldistance:Number,//单位：米
    totalduring:Number,//单位：秒
    driverrouteing:[],//行车路线
    paytype:String,//支付方式
    rateriderinfo:Schema.Types.Mixed, //对乘客评价,评级、评价时间、评论
    ratedriverinfo:Schema.Types.Mixed,//对司机评价,评级、评价时间、评论

    payunionid:String,//支付宝或微信唯一交易id，避免重复更新
    //仅快车，出租车，代驾 有效
    //仅拼车有效
    buscarpoolid:{ type: Schema.Types.ObjectId, ref: 'buscarpool' },
    starttime:String,//出发时间
    startstation:String,//关联拼车信息
    endstation:String,//关联拼车信息
    startcity:String,//关联拼车信息
    endcity:String,//关联拼车信息
    seatnumber:{ type: Number, default: 1 },//乘客数量
    //仅旅游大巴有效
    rentusername:String,//租车人姓名
    rentuserphone:String,
    buslistsel:Schema.Types.Mixed, //旅游大巴订阅详情
    startdate:String,//开始用车时间 YYYY-MM-DD
    enddate:String,//还车时间

});
TripOrderSchema.plugin(mongoosePaginate);

//优惠券
// let CouponSchema = new Schema({
//     expdate:Date,//过期时间
//     name:String,//名字
//     type:String,//打折券,优惠券
//     maxprice:Number,//设置上限
//     onlycity:String,//限制城市
//     value:Number,//如果是打折券，0.8表示八折；如果是优惠券，表示折扣金额
//     isenabled:Boolean//是否启用
// });
// CouponSchema.plugin(mongoosePaginate);
//我的优惠券：优惠券id,会员id,状态（0未使用 1已使用2已失效）
let MyCouponSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'UserRider' },
    name:String,    //优惠券名
    triptype:String,//‘出租车’|‘快车’|....
    pricediscountmax:Number,//最大抵扣金额
    pricediscountpercent:Number,//抵扣折扣
    expdate: String,// 过期时间
    usestatus:{ type: Schema.Types.String,default: '未使用'},// //未使用／已使用／已过期
    fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
    created_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    used_at:String,
});
MyCouponSchema.plugin(mongoosePaginate);
//UserRiderCouponSchema
// let UserRiderCouponSchema = new Schema({
//     userid:{ type: Schema.Types.ObjectId, ref: 'userrider' },//用户id
//     expdate:Date,//过期时间
//     name:String,//名字
//     type:String,//打折券,优惠券
//     maxprice:Number,//设置上限
//     onlycity:String,//限制城市
//     value:Number,//如果是打折券，0.8表示八折；如果是优惠券，表示折扣金额
//     usestatus:{ type: Schema.Types.String,default: '未使用'},// //未使用／已使用／已失效
//     fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
//     created_at: { type: Date, default:new Date()},
//     used_at:Date,
// });
// UserRiderCouponSchema.plugin(mongoosePaginate);

//消息
//车辆
//价格管理,分时间段管理
//评价（快车，出租车，代驾）
// let PriceSchema = new Schema({
//     registertype:String,//快车、出租车、代驾|
//     specialdate:String,//指定日期，不指定为*
//     starttime:String,//开始时间
//     endtime:String,//结束时间
//     priceperkm:Number,//每公里价格
//     minkem:Number,
//     minprice:Number//起步价
//   });
// PriceSchema.plugin(mongoosePaginate);
//【minkem】之内minprice元，超过【minkem】每公里priceperkm元
let RateSchema = new Schema({
  targetid:String,//被评价人
  driverid:String,
  riderid:String,
  ratestar:Number,
  orderid:String,
  comment:String,
  created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
});
RateSchema.plugin(mongoosePaginate);
//旅游大巴,型号,座位,图标,每小时费用,是否启用
 let TourbusinfoSchema = new Schema({
   name:String,
   desc:String,
   seatnumber:Number,
   icon:String,
   priceperday:Number,
   isenabled:Boolean
 });
TourbusinfoSchema.plugin(mongoosePaginate);
 //关于部分远程提供的页面
let AboutSchema = new Schema({
    keyname:String,
    title:String,
    desc:String,
  });
AboutSchema.plugin(mongoosePaginate);

// let UserRiderPayHistorySchema = new Schema({
//     //
// });

let NotifyMessageSchema = new Schema({
    messagetype:String,//all,driver,rider
    rideruserid:{ type: Schema.Types.ObjectId, ref: 'userrider' },
    driveruserid:{ type: Schema.Types.ObjectId, ref: 'userdriver' },
    messagetitle:String,
    messagecontent:String,
    subtype:{type:String,default:'msg'},
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
});
NotifyMessageSchema.plugin(mongoosePaginate);

let FareTypeSchema = new Schema({
  registertype:String,
  faretypenote:String,
});
FareTypeSchema.plugin(mongoosePaginate);

//司机当前位置
let UserDriverRealtimeLocationSchema = new Schema({
  driverid:String,
  updated_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  registertype:String,
  driverlocation: {
      type: [Number],
      index: '2dsphere'
  },
});
UserDriverRealtimeLocationSchema.plugin(mongoosePaginate);

//汽车品牌
let CarbrandSchema = new Schema({
    logo:String,
    brandname:String,
    memo:String,
    manufacturer:String
});
CarbrandSchema.plugin(mongoosePaginate);
//汽车型号
let CarModelSchema  = new Schema({
    carbrandid:{ type: Schema.Types.ObjectId, ref: 'carbrand' },
    modelname:String,
});
CarModelSchema.plugin(mongoosePaginate);
//车辆颜色
let CarColorSchema = new Schema({
    color:String,
    colorname:String,
});
CarColorSchema.plugin(mongoosePaginate);

//我的汽车
let MycarSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'userdriver' },
    name:String,//名字
    carmodelid:{ type: Schema.Types.ObjectId, ref: 'carmodel' },
    carcolorid:{ type: Schema.Types.ObjectId, ref: 'carcolor' },
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    issynctoplatform:{ type: Boolean, default: false },//同步到平台,admin有效
    approvalrejectseason:{type:String,default:''},
    approvalstatus:{type:String,default:'待审核'},//未递交/待审核/审核中/已审核/已拒绝

    PhotoandCarmanURL:String,//人车合影
  	LicensePhotoIdURL:String,//机动车驾驶证

  	CarrunPhotoIdURL:String,//机动车行驶证
    Platform_baseInfoVehicleId:{ type: Schema.Types.ObjectId, ref: 'baseinfovehicle' },
    Platform_baseInfoVehicle:{
      VehicleNo:String,//<----	是	字符型	V32	车辆号牌
      PlateColor:String,//<----()	是	字符型	V32	车牌颜色	见 J T/T 697. 7-2014 中5.6
      Seats:Number,//<----	是	数字型	V10	核定载客位
      Brand:String,//<----()	是	字符型	V64	车辆厂牌
      Model:String,//<----()	是	字符型	V64	车辆型号
      VehicleType:String,//	是	字符型	V64	车辆类型	以机动车行驶证为准
      OwnerName:String,//<----	是	字符型	V64	车辆所有人	应与《机动车登记证书》所注明的车辆所有人一致
      VehicleColor:String,//	是	字符型	V32	车身颜色

      EngineId:String,//	是	字符型	V32	发动机号	以机动车行驶证为准
      VIN:String,//	是	字符型	F17	车辆VIN码	以机动车行驶证为准
      CertifyDateA:String,//	是	数字型	F8	车辆注册日期	以机动车行驶证为准
      FuelType:String,//	是	字符型	V32	牢辆燃料类型	见 JT/T697. 7-2014  中4. 1.4. 15
      EngineDisplace:String,//	是	字符型	V32	发动机排量	单位 :毫升

      PhotoId:String,//	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
      PhotoIdURL:String,//	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
      Certificate:String,//<----	否	字符型	V64	运输证字号	见 JT/T  415-2006  中5. 4.1，地市字别可包含三个汉字
      TransAgency:String,//	是	字符型	V256	车辆运输证发证机构	全称
      TransArea:String,//	是	字符型	V256	车辆经营区域
      TransDateStart:String,//	是	数字型	F8	车辆运输证有效期起	YYYYMMDD 元素名称	必选	类型	长度	字段名称	描	述
      TransDateStop:String,//	是	数字型	F8	车辆运输证有效期止	YYYYMMDD
      CertifyDateB:String,//	是	数字型	F8	车辆初次登记日期	YYYYMMDD
      FixState:String,//	是字符型	V64	车辆检修状态	数据取值有效范围 :0 :未检修1.已检修2 :未知
      NextFixDate:String,//	否	数字型	F8	车辆下次年检时间
      CheckState:String,//<----	是	字符型	F2	车辆年度审验状态	见 JT/T 415-2006 中5.4.4
      FeePrintId:String,//	是	字符型	V32	发票打印设备序列号

      GPSBrand:String,//	是	字符型	V2 56	卫星定位装置品牌
      GPSModel:String,//	是	字符型	V64	卫星定位装置型号
      GPSIMEI:String,//	否	字符型	V128	卫星定位装置IMEI号
      GPSlnstallDate:String,//	是	数字型	F8	卫星定位设备安装日期	YYYYMMDD

      RegisterDate:String,//	是	数字型	F8	报备日期	车辆信息向服务所在地出租汽车行政主管部门报备 日期 YYYYMMDD
      'CommercialType':Number,//	是	数字型	F1	服务类型	1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
      FareType:String,//	是	字符型	V16	运价类型编码由网约车公司定义，与 A. 4.6 运价信息接口一一对 应
    }
});
MycarSchema.plugin(mongoosePaginate);


//充值记录（提现记录）
let RechargerecordSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'UserDriver' },
    fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
    fromwithdrawcashapply:{ type: Schema.Types.ObjectId, ref: 'Withdrawcashapply' },
    fromuser:{ type: Schema.Types.ObjectId, ref: 'UserRider' },
    feeold:Number,//旧余额
    feenew:Number, //新余额
    feebonus:Number,//奖励金额
    orderprice:Number,//订单金额
    srctype:String,////‘order'来自订单/'withdrawcash_ing'来自提现/'withdrawcash_ed'来自提现/withdrawcash_denied
    created_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
});
RechargerecordSchema.plugin(mongoosePaginate);
let Rechargerecord  = mongoose.model('rechargerecord',  RechargerecordSchema);

//提现申请
let WithdrawcashapplySchema =  new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'UserDriver' },
    truename:String,//真实姓名
    bankaccount:String,//银行账号
    bankname:String,//银行名称
    cashmoney:Number,//提现金额
    rechargerecord:{ type: Schema.Types.ObjectId, ref: 'Rechargerecord' },
    status:String,//未验证／已验证／已支付
    created_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
});
WithdrawcashapplySchema.plugin(mongoosePaginate);
let Withdrawcashapply  = mongoose.model('withdrawcashapply',  WithdrawcashapplySchema);


//积分表
let PointrecordSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    pointold:Number,//旧积分
    pointnew:Number, //新积分
    pointbonus:Number,//积分抵扣
    fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
    srctype:{ type: Schema.Types.String,default: 'Order'},//‘order'来自订单
    reason:{ type: Schema.Types.String,default: '支付订单'},//原因,例如：'支付订单
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    getdate:String,//获得日期,YYYY-MM-DD
});
PointrecordSchema.plugin(mongoosePaginate);
let Pointrecord  = mongoose.model('pointrecord',  PointrecordSchema);

exports.SystemConfigSchema = SystemConfigSchema;
exports.RateSchema = RateSchema;
exports.UserRiderSchema= UserRiderSchema;
exports.UserDriverSchema= UserDriverSchema;
exports.UserEmerygencyContactSchema = UserEmerygencyContactSchema;
exports.TripRequestSchema= TripRequestSchema;
exports.BuscarpoolSchema= BuscarpoolSchema;
exports.UserAdminSchema = UserAdminSchema;
exports.TripOrderSchema= TripOrderSchema;
// exports.PriceSchema= PriceSchema;
exports.TourbusinfoSchema= TourbusinfoSchema;
exports.AboutSchema= AboutSchema;
// exports.CouponSchema= CouponSchema;
// exports.UserRiderCouponSchema= UserRiderCouponSchema;
exports.FareTypeSchema= FareTypeSchema;
exports.NotifyMessageSchema= NotifyMessageSchema;
exports.UserDriverRealtimeLocationSchema= UserDriverRealtimeLocationSchema;
exports.CarbrandSchema = CarbrandSchema;
exports.CarModelSchema = CarModelSchema;
exports.CarColorSchema = CarColorSchema;
exports.MycarSchema = MycarSchema;
exports.RechargerecordSchema= RechargerecordSchema;
exports.WithdrawcashapplySchema= WithdrawcashapplySchema;
exports.UserDriverPincheSchema= UserDriverPincheSchema;
exports.UserDriverPincheLoginLogSchema= UserDriverPincheLoginLogSchema;

let RateModel =mongoose.model('rate',  RateSchema);
let SystemConfigModel =mongoose.model('systemconfig',  SystemConfigSchema);
let UserRiderModel =mongoose.model('userrider',  UserRiderSchema);
let UserDriverModel =mongoose.model('userdriver',  UserDriverSchema);
let UserEmerygencyContactModel =mongoose.model('useremerygencycontact',  UserEmerygencyContactSchema);
let TripRequestModel =mongoose.model('triprequest',  TripRequestSchema);
let BuscarpoolModel =mongoose.model('buscarpool',  BuscarpoolSchema);
let UserAdminModel =mongoose.model('useradmin',  UserAdminSchema);
let TripOrderModel =mongoose.model('triporder',  TripOrderSchema);
let TourbusinfoModel =mongoose.model('tourbusinfo',  TourbusinfoSchema);
let AboutModel =mongoose.model('about',  AboutSchema);
let MyCouponModel =mongoose.model('mycoupon',  MyCouponSchema);
// let UserRiderCouponModel =mongoose.model('userridercoupon',  UserRiderCouponSchema);
let FareTypeModel =mongoose.model('faretype',  FareTypeSchema);
let NotifyMessageModel =mongoose.model('notifymessage',  NotifyMessageSchema);
let UserDriverRealtimeLocationModel = mongoose.model('userdriverrealtimelocation',  UserDriverRealtimeLocationSchema);
let CarbrandModel =mongoose.model('carbrand',  CarbrandSchema);
let CarModelModel =mongoose.model('carmodel',  CarModelSchema);
let CarColorModel =mongoose.model('carcolor',  CarColorSchema);
let MycarModel =mongoose.model('mycar',  MycarSchema);
let UserRiderLoginLogModel =mongoose.model('userriderloginlog',  UserRiderLoginLogSchema);
let UserDriverLoginLogModel =mongoose.model('userdriverloginlog',  UserDriverLoginLogSchema);
let UserDriverPincheModel =mongoose.model('userdriverpinche',  UserDriverPincheSchema);
let UserDriverPincheLoginLogModel =mongoose.model('userdriverpincheloginlog',  UserDriverPincheLoginLogSchema);

exports.MyCouponModel = MyCouponModel;
exports.RechargerecordModel= Rechargerecord;
exports.WithdrawcashapplyModel= Withdrawcashapply;
exports.RateModel = RateModel;
exports.SystemConfigModel = SystemConfigModel;
exports.UserRiderModel = UserRiderModel;
exports.UserDriverModel = UserDriverModel;
exports.UserEmerygencyContactModel = UserEmerygencyContactModel;
exports.TripRequestModel= TripRequestModel;
exports.BuscarpoolModel= BuscarpoolModel;
exports.UserAdminModel = UserAdminModel;
exports.TripOrderModel= TripOrderModel;
exports.TourbusinfoModel= TourbusinfoModel;
exports.AboutModel= AboutModel;
// exports.UserRiderCouponModel= UserRiderCouponModel;
exports.FareTypeModel= FareTypeModel;
exports.NotifyMessageModel= NotifyMessageModel;
exports.UserDriverRealtimeLocationModel = UserDriverRealtimeLocationModel;
exports.CarbrandModel= CarbrandModel;
exports.CarModelModel= CarModelModel;
exports.CarColorModel= CarColorModel;
exports.MycarModel= MycarModel;
exports.UserRiderLoginLogModel= UserRiderLoginLogModel;
exports.UserDriverLoginLogModel= UserDriverLoginLogModel;
exports.UserDriverPincheLoginLogModel=UserDriverPincheLoginLogModel;
exports.UserDriverPincheModel=UserDriverPincheModel;
