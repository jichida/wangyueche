let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
let PubSub = require('pubsub-js');
mongoose.Promise = global.Promise;
// A. 4. 1.网约车平台公司基本信息接口
//baselnfoCompany
/*
设置一条记录即可
admin设置
*/
let Platform_baseInfoCompanySchema = new Schema({
  Companyld:String,// Companyld	是	字符型 公司标
  CompanyName:String,// CompanyName	是	字符型 公司名称
  Identifier:String,// Identifier	是	字符型  字符型V32 统一社会信用代码
  Address:Number,// Address	是	数字型注册地行政区划代码见GB/T 2260
  BusinessScope:String,// BusinessScope	是	字符型 经营范围 按照网络预约出租汽车经营许可证内容填写
  ContactAddress:String,// ContactAddress	是	字符型 通信地址全称
  EconomicType:String,// EconomicType	是	字符型 经营业户经济类型见JT/ T415 - 2006 中5. l. 8规定
  RegCapital:String,// RegCapital	是	字符型注册资本按照营业执照内容填写
  LegalName:String,// LegalName	是	字符型法人代表姓名按照营业执照内容填写
  LegalID:String,// LegalID	是	字符型法人代表身份证号
  LegalPhone:String,// LegalPhone	是	字符型 法人代表电话
  LegalPhoto:String,// LegalPhoto	否	字符型法人代表电话法人代表身份证扫描号，扫描件文件通过6. 1件文件编
  State:Number,// State	是	数字型 状态
  Flag:Number,// Flag	是	数字型 操作标
  UpdateTime:Date,// UpdateTime	是	数字型

  LegalPhotoURL:String,
});
Platform_baseInfoCompanySchema.plugin(mongoosePaginate);
// A. 4. 2.	网约 车平台公司营运 规模信息接 口
/*
设置一条记录即可
admin设置
*/
let Platform_baseInfoCompanyStatSchema = new Schema({
  Companyld:String,// Companyld	是	字符型	V32	公司标识	部统一分配
  VehicleNum:Number,// Companyld	是	字符型	V32	公司标识	部统一分配
  DriverNum:Number,// DriverNum	是	数字型	V64	平台注册驾驶员数
  Flag:Number,// Flag	是	数字型 Fl	操作标识	1:新增2:更新3 :删除
  UpdateTime:Date,// UpdateTime	是	数字型	F14		网约车平台完成数据更新时间的时间YYYYMMDDhhmmss
});
Platform_baseInfoCompanyStatSchema.plugin(mongoosePaginate);
// A. 4. 3.	网约车平台公司支付信息接口
/*
多条记录，用户添加，然后固定死
admin设置
*/
let Platform_baseInfoCompanyPaySchema = new Schema({
  Companyld:String,// Companyld	是	字符型	V32	公司标识	部统一分配
  PayName:String,// PayName	是	字符型	V256	银行或者非银行支付机构名称全称
  Payld:String,// Payld	是	字符型	V32	非银行支付机构支付业务许可证编号
  PayType:String,// PayType	是	字符型	V64	支付业务类型
  PayScope:String,// PayScope 是	字符型	V64	业务覆盖范围
  PrepareBank:String,// PrepareBank	是	字符型	V256	备付金存管银行全称
  CountDate:Number,// CountDate	是	数字型	VI O	结算周期	单位:天
  State:Number,// State	是	数字型	Fl	状态	0 :有效1:失效
  Flag:Number,// Flag	是	数字型 Fl	操作标识	1:新增2 :更新3 :删除
  UpdateTime:Date,// UpdateTime 二	是	数字型	F14	更新时间	网约车平台完成数据更新 的时间 YYYYMMDDhhmmss
});
Platform_baseInfoCompanyPaySchema.plugin(mongoosePaginate);
// A. 4. 4.	网约车平台公司服务机构接口
/*
设置一条记录即可
admin设置
*/
let Platform_baseInfoCompanyServiceSchema = new Schema({
  Companyld:String,// Companyld	是	字符型	V32	公司标识
  Address:Number,// Address	是	数字型	F6	行政区划代码	服务机构所在地的行政区 划，见 GB/T 2260
  ServiceName:String,// ServiceName	是	字符型	V128	服务机构名称
  ServiceNo:String,// ServiceNo	是	字符型	V64	服务机构代码
  DetailAddress:String,// DetailAddress	是	字符型	V128	服务机构地址
  ResponsibleName:String,// ResponsibleName	是	字符型	V64	服务机构负责人姓名
  ResponsiblePhone:String,// ResponsiblePhone	是	字符型	V32	负责人联系电话
  ManagerName:String,// ManagerName	是	字符型	V64	服务机构管理人姓名
  ManagerPhone:String,// ManagerPhone	是	字符型	V32	管理人联系电话
  ContactPhone:String,// ContactPhone	否	字符型	V32	服务机构紧急联系电话	元素名称	必选	类型	长度	字段名称	描	述
  MailAddress:String,// MailAddress	是	字符型	V128	行政文书送达邮寄地址
  CreateDate:Date,// CreateDate	是	数字型	F8	服务机构设立日期	YYYYMMDD
  State:Number,// State	是	数字型	Fl	状态	0:有效1:失效
  Flag:Number,// Flag	是	数字型	Fl	操作标识	1:新增2 :更新3 :删除
  UpdateTime:Date,// UpdateTime	是	数字型	F14	更新时间网约车平台完成数据更新 的时间 YYYYMMDDhhmmss
});
Platform_baseInfoCompanyServiceSchema.plugin(mongoosePaginate);
// A. 4. 5.	网约车平台公司经营许可接口
/*
设置一条记录即可
admin设置
*/
let Platform_baseInfoCompanyPermitSchema = new Schema({
  Companyld:String,// Companyld	是	字符型	V32	公司标识
  Address:Number,// Address	是	数字型	F6	许可地行政区划代码	见 GB/T 2260
  Certificate:String,// Certificate	是	字符型	V64	网络预约出租汽车经营许可证号
  OperationArea:String,// OperationArea	是	字符型	V128	经营区域
  OwnerName:String,// OwnerName	是	字符型	V256	公司名称
  Organization:String,// Organization	是	字符型	V256	发证机构名称
  StartDate:Date,// StartDate	是	数字型	F8	有效期起	YYYYMMDD
  StopDate:Date,// StopDate	是	数字型	F8	有效期止	YYYYMMDD
  CertifyDate:Date,// CertifyDate	是	数字型	F8	初次发证日期	YYYYMMDD
  State:String,// State	是	字符型	V8	证照状态	见 JT/T 415-2006 中5. 5. 2
  Flag:Number,// Flag	是	数字型	F1	操作标识	1:新增2 .更新3 :删除
  UpdateTime:Date,// UpdateTime	是	数字型	F14	更新时间	网约车平台完成数据更新 l
});
Platform_baseInfoCompanyPermitSchema.plugin(mongoosePaginate);
// A. 4. 6 . 网约车平台公司运价信息接口
/*
多条记录，价格策略
admin设置
*/
let Platform_baseInfoCompanyFareSchema = new Schema({
  Companyld:String,
  Address:Number,
  FareType:String,//	是	字符型	V16	运价类型编码	由网约车平台公司统一 编码，应确保唯一性
  FareTypeNote:String,//	否	字符型	V128	运价类型说明
  FareValidOn:Date,//	是	数字型	F14	运价有效期起	YYYYMMDDhhmmss
  FareValidOff:Date,//	否	数字型	F14	运价有效期止	YYYYMMDDhhmmss
  StartFare:Number,//	是	数字型	VIO	起步价	单位:元 元素名称	必选	类型	长度	字段名称	描	述
  StartMile:Number,//	是	数字型	VIO	起步里程	单位 :km
  UnitPricePerMile:Number,//	是	数字型	VIO	计程单价〈按公里〉	单位 :元
  UnitPricePerMinute:Number,//	是	数字型	VIO	计时单价 (按分钟)	单位 :元
  UpPrice:Number,//	否	数字型	VIO	单程加价单价	单位 :元
  UpPriceStartMile:Number,//	否	数字型	V10	单程加价公里	单位 :km

  MorningPeakTimeOn:String,//	是	字符型	V8	营运早高峰时间起	HHmm(24 小时〉
  MorningPeakTimeOff:String,//	是	字符型	V8	营运早高峰时间止	HHmm(24 小时〉
  EveningPeakTimeOn:String,//	是	字符型	V8	营运晚高峰时间起	HHmm(24 小时〉
  EveningPeakTimeOff:String,//	是	字符型 营运晚高峰时间止
  OtherPeakTimeOn:String,//	否	字符型	V8	其他营运高峰时间起	HHmm(24 小时)
  OtherPeakTimeOff:String,//	否	字符型	V8	其他营运高峰时间止	HHmm(24 小时)
  PeakUnitPrice:Number,//	是	数字型	VIO	高峰时间单程加价单价	单位 z 元
  PeakPriceStartMile:Number,//	是	数字型	V10	高峰时间单程加价公里	单位 :km
  LowSpeedPricePerMinute:Number,//	否	数字型	V10	低速计时加价(按分 钟)	单位 z 元
  NightPricePerMile:Number,//	否	数字型	VIO	夜间费〈按公里)	单位:元
  NightPricePerMinute:Number,//	否	数字型	V10	夜间费〈按分钟)	单位:元
  OtherPrice:Number,//	否	数字型	V10	其它加价金额	单位:元
  State:Number,//	是	数字型	F1	状态	0 :有效1.失效
  UpdateTime:Date,//	是	数字型	F14	更新时间	网约车平台完成数据更 新的时间 YYYYMMDDhhmmss
  Flag:Number,// 是	数字型	F1	操作标识	1.新增2 :更新3.删除
});
Platform_baseInfoCompanyFareSchema.plugin(mongoosePaginate);
// A. 4. 7.  车辆基本信息接口
/*
多条记录，司机提供（出租车等）后台输入
admin设置（有可能app填）
*/
let Platform_baseInfoVehicleSchema = new Schema({
  Companyld:String,
  Address:Number,
  VehicleNo:String,//	是	字符型	V32	车辆号牌
  PlateColor:String,//	是	字符型	V32	车牌颜色	见 J T/T 697. 7-2014 中5.6
  Seats:Number,//	是	数字型	V10	核定载客位
  Brand:String,//	是	字符型	V64	车辆厂牌
  Model:String,//	是	字符型	V64	车辆型号
  VehicleType:String,//	是	字符型	V64	车辆类型	以机动车行驶证为准
  OwnerName:String,//	是	字符型	V64	车辆所有人	应与《机动车登记证书》所注明的车辆所有人一致
  VehicleColor:String,//	是	字符型	V32	车身颜色

  Engineld:String,//	是	字符型	V32	发动机号	以机动车行驶证为准
  VIN:String,//	是	字符型	F17	车辆VIN码	以机动车行驶证为准
  CertifyDateA:Date,//	是	数字型	F8	车辆注册日期	以机动车行驶证为准
  FuelType:String,//	是	字符型	V32	牢辆燃料类型	见 JT/T697. 7-2014  中4. 1.4. 15
  EngineDisplace:String,//	是	字符型	V32	发动机排量	单位 :毫升

  Photold:String,//	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
  PhotoldURL:String,//	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
  Certificate:String,//	否	字符型	V64	运输证字号	见 JT/T  415-2006  中5. 4.1，地市字别可包含三个汉字
  TransAgency:String,//	是	字符型	V256	车辆运输证发证机构	全称
  TransArea:String,//	是	字符型	V256	车辆经营区域
  TransDateStart:Date,//	是	数字型	F8	车辆运输证有效期起	YYYYMMDD 元素名称	必选	类型	长度	字段名称	描	述
  TransDateStop:Date,//	是	数字型	F8	车辆运输证有效期止	YYYYMMDD
  CertifyDateB:Date,//	是	数字型	F8	车辆初次登记日期	YYYYMMDD
  FixState:String,//	是字符型	V64	车辆检修状态	数据取值有效范围 :0 :未检修1.已检修2 :未知
  NextFixDate:Number,//	否	数字型	F8	车辆下次年检时间
  CheckState:String,//	是	字符型	F2	车辆年度审验状态	见 JT/T 415-2006 中5.4.4
  FeePrintld:String,//	是	字符型	V32	发票打印设备序列号

  GPSBrand:String,//	是	字符型	V2 56	卫星定位装置品牌
  GPSModel:String,//	是	字符型	V64	卫星定位装置型号
  GPSIMEI:String,//	否	字符型	V128	卫星定位装置IMEI号
  GPSlnstallDate:Date,//	是	数字型	F8	卫星定位设备安装日期	YYYYMMDD

  RegisterDate:Date,//	是	数字型	F8	报备日期	车辆信息向服务所在地出租汽车行政主管部门报备 日期 YYYYMMDD
  'Commercial-Type':Number,//	是	数字型	F1	服务类型	1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
  FareType:String,//	是	字符型	V16	运价类型编码由网约车公司定义，与 A. 4.6 运价信息接口一一对 应

  State:Number,//	是	数字型	F1	状态	0:有效1.失效元素名称	必选	类型	长度	字段名称	描	述
  Flag:Number,//	是	数字型	Fl	操作标识	1:新增2:更新3:删除
  UpdateTime:Date,//	是	数字型	F14	更新时间	网约车平台完成数据更新 的时间 YYYYMMDDhhmmss
});
Platform_baseInfoVehicleSchema.plugin(mongoosePaginate);
// A. 4. 8. 车辆保险信息接口
/*
后台输入
 admin设置
*/
let Platform_baseInfoVehiclelnsuranceSchema = new Schema({
  Companyld:String,// 公司标识一 37 一元素名称	必选	类型	长度	字段名称	描	述
  VehicleNo:String,//	是	字符型	V32	车辆号牌
  InsurCom:String,//	是	字符型	V64	保险公司名称
  InsurNum:String,//	是	字符型	V64	保险号
  InsurType:String,//	是	字符型	V32	保险类型
  InsurCount:Number,//	是	数字型	VIO	保险金额	单位:元
  InsurEff:Date,//	是	数字型	F8	保险生效时间	YYYYMMDD
  InsurExp:Date,//	是	数字型	F8	保险到期时间	YYYYMMDD
  Flag:Number,//	是	数字型	Fl	操作标识	1:新增2 :更新3 .删除
  UpdateTime:Date,//	是	数字型	F14	更新时间	网约车平台完成数据更新 的时间 YYYYMMDDhhmmss
});
Platform_baseInfoVehiclelnsuranceSchema.plugin(mongoosePaginate);
// A. 4. 9.	网约车 车辆里程信息接 口
/*
程序计算累计
程序自动计算（规则）
*/
let Platform_baseInfoVehicleTotalMileSchema = new Schema({
  CompanyId:String,	//是	字符型	V32	公司标识
  Address:Number,//	是	数字型	F6	注册地行政区划代码	车辆在平台的注册地，见GB/T2260
  VehicleNo:String,	//是	字符型	V32	车辆号牌
  TotalMile:Number,//	是	数字型	V64	行驶总里程	单位 :km
  Flag:Number,//	是	数字型	Fl	操作标识	1:新增2.更新3:删除
  UpdateTime:Date,//	是	数字型	F14 更新时间	网约车平台完成数据更新 的时间 YYYYMMDDhhmm ss
});
Platform_baseInfoVehicleTotalMileSchema.plugin(mongoosePaginate);
// A. 4. 10. 驾驶员基本信 息接口
/*
司机信息，后台维护输入
admin设置（可能app填）
*/
let Platform_baseInfoDriverSchema= new Schema({
  CompanyId:String,	//是	字符型	V32	公司标识
  Address:Number,//	是	数字型	F6	注册地行政区划代码	车辆在平台的注册地，见GB/T2260
  DriverName:String,	// 否字符型V64 机动车驾驶员姓名
  DriverPhone:String,	// 是字符型V32 驾驶员手机号
  DriverGender:String,	// 是字符型V2 驾驶员性别见JT/ T 697. 7- 2014中4. 1. 2. 1. 3
  DriverBirthday:Date,	// 是数字型F8 出生日期YYYYMMDD
  DriverNationality:String,	// 杏字符型V32 国籍
  DriverNation:String,	// 是字符型V32 驾驶员民族见JT/T 697. 7-2014中4. 1. 2. 1. 7
  DriverMaritalStatus:String,	// 杏字符型V64 驾驶员婚姻状况未婚;已婚;离异
  DriverLanguageLevel:String,	// 否字符型V64 驾驶员外语能力
  DriverEducation:String,	// 否字符型V64 驾驶员学历见JT/T 697. 7-2014中4. 1. 2. 1. 11

  DriverCensus:String,	//	否	字符型	V256	户口登记机关名称
  DriverAddress:String,	//	否	字符型	V256	户口住址或长住地址 阶iv町
  DriverContactAddress:String,	//	是	字符型	V256	驾驶员通信地址
  Photold:String,	//	否	字符型	V128	驾驶员照片文件编号	FTPS  接口传输;格式 照片文件通过 6. 1 节jpg; 按照居民身份证照片的标准
  PhotoldURL:String,	//	否	字符型	V128	驾驶员照片文件编号	FTPS  接口传输;格式 照片文件通过 6. 1 节jpg; 按照居民身份证照片的标准
  Licenseld:String,	//	是	字符型	V32	机动车驾驶证号
  LicensePhotold:String,	//	否	字符型	V128机动车驾驶证扫描件文件编号扫描件文件通过 6. 1节FTPS 接口传输;格式lPg
  LicensePhotoldURL:String,	//	否	字符型	V128机动车驾驶证扫描件文件编号扫描件文件通过 6. 1节FTPS 接口传输;格式lPg
  DriverType:String,	//	否	字符型	V16	准驾车型见 JT/T 697. 7-2014中 5. 16
  GetDriverLicenseDate:Date,//	是 数字型 F8 初次领取驾驶证日期 YYYYMMDD
  DriverLicenseOn:Date,//	 是 数字型  F8  驾驶证有效期限起  YYYYMMDD
  DriverLicenseOff:Date,//	            是   数字型   F8      驾驶证有效期限止    YYYYMMDD

  TaxiDriver:Boolean,//	                   是   数字型   F1      是否出租汽车驾驶员	。:否
  CertificateNo:String,	//                         是   字符型  V128    网络预约出租汽车驾驶员资格证号
  NetworkCarIssueOrganization:String,	// 是	字符型	V256网络预约出租汽车驾驶员证发证机构
  NetworkCarIssueDate:Date,//		是	数字型	F8	资格证发证日期	YYYYMMDD
  GetNetworkCarProofDate:Date,//		是	数字型	F8	初次领取资格证日期	YYYYMMDD
  NetworkCarProofOn:Date,//		是	数字型	F8	资格证有效起始日期	YYYYMMDD
  NetworkCarProofOff:Date,//		是	数字型	F8	资格证有效截止日期	YYYYMMDD
  RegisterDate:Date,//	 是数字型F8报备日期驾驶员信息向服务所在 地出租汽车行政主管部 门报备日期 YYYYM-MDD

  FullTimeDriver:Boolean,//	 否数字型F1  是否专职驾驶员1:是  0:否
  InDriverBlacklist:Boolean,//	否数字型F1是否在驾驶员黑名单内	1.是。:否
  CommercialType:Number,//	  是数字型F1服务类型1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
  ContractCompany:String,	//是字符型V256驾驶员合同〈或协议〉 签署公司全称
  ContractOn:Date,//	是数字型F8   合同或协议)有效期起 YYYYMMDD
  ContractOff:Date,//	是数字型F8	合同(或协议)有效期止 YYYYMMDD

  EmergencyContact:String,	//	否	字符型V64	紧急情况联系人
  EmergencyContactPhone:String,	//否字符型V32 紧急情况联系人电话手机号
  EmergencyContactAddress:String,	//否字符型V256  紧急情况联系人通信地址

  State:Number,//	是数字型Fl状态	O .有效1:失效
  Flag:Number,//	  是数字型F1  操作标识	1.新增2 .更新3 :删除
  UpdateTime:Date,//	  是数字型F14更新时间网约车平台完成数据更 新的时间 YYYYMMDDhhmmss
});
Platform_baseInfoDriverSchema.plugin(mongoosePaginate);
// A.4.11.网约车驾驶员培训信息接口
/*
司机信息，后台维护输入
admin设置
*/
let Platform_baseInfoDriverEducateSchema= new Schema({
  Companyld:String,	//	是	字符型	V32	公司标识
  Address:Number,//	是	数字型	F6	注册地行政区划代码	驾驶员在平台的注册地， I见 GB/T 2260
  Licenseld:String,	//	是	字符型	V32	机动车驾驶证号
  CourseName:String,	//	是	字符型	V64	驾驶员培训课程名称
  CourseDate:Date,//	是	数字型	F8	培训课程日期
  StartTime:String,	//	是	字符型 V8	培训开始时间
  StopTime:String,	//	是	字符型	V8	培训结束时间
  Duration:Number,//	是	数字型	VIO	培训时长
  Flag:Number,//	是	数字Fl操作标识	1.新增2:更新3 :删除
  UpdateTime:Date,//	是	数字型	F14	更新时间	网约车平台完成数据更新 的时间 YYYYMMDDhhmmss
});
Platform_baseInfoDriverEducateSchema.plugin(mongoosePaginate);
// A. 4. 12. 驾驶员移动终端信息接口
/*
app上报
程序获取
*/
let Platform_baseInfoDriverAppSchema= new Schema({
  Companyld:String,	//	是	字符型	V32	公司标识
  Address:Number,//		是	数字型	F6	注册地行政区划代码	驾驶员在平台的注册地， 见 GB/T 2260
  Licenseld:String,	//	是	字符型	V32	机动车驾驶证号
  DriverPhone:String,	//	是	字符型	V32	驾驶员手机号
  NetType:Number,//	 是	数字型	F1	手机运营商	1.中国联通2 .中国移动3 .中国电信4 :其他
  AppVersion:String,	//	是	字符型	V32	使用APP版本号
  MapType:Number,//	 是	数字型	F1	使用地图类型	1:百度地图2 :高德地图3.其他
  State:Number,//		是	数字型	F1	状态	0 :有效1:失效
  Flag:Number,//		是	数字型	F1	操作标识	1.新增2.更新3 :删除
  UpdateTime:Date,//		是	数字型	F14	更新时间	网约车平台完成数据更新 的时间 YYYYMMDDhhmmss
});
Platform_baseInfoDriverAppSchema.plugin(mongoosePaginate);
// A. 4. 13. 驾驶员统计信息接口
/*
定时任务，定时传送
后台程序自动计算
*/
let Platform_baseInfoDriverStatSchema= new Schema({
  Companyld:String,	//		是	字符型V32	公司标识
  Address:Number,//	是数字型F6注册地行政区划代码车辆在平台的注册地， 见 GB/T2260
  Licenseld:String,	//		是	字符型V32	机动车驾驶证编号
  Cycle:Number,//	 是 数字型 F6统计周期统计周期按月 ，内容填 写统计月份 ，数据格式 YYYYMM
  OrderCount:Number,//		是	数字型 VIO	完成订单次数
  TafficViolationCount:Number,//		是	数字型V32	交通违章次数
  ComplainedCount:Number,//		是	数字型V32	被投诉次数
  Flag:Number,//	 是 数字型 Fl操作标识1:新增2 :更新3 :删除
  UpdateTime:Date,//	是数字型F14更新时间网约车平台完成数据更 新的时间YYYYMMDDhhmmss
});
Platform_baseInfoDriverStatSchema.plugin(mongoosePaginate);
// A. 4. 14. 乘客基本信息接口baselnfoPassenger
/*
乘客信息
注册时候填
*/
let Platform_baseInfoPassengerSchema= new Schema({
  Companyld:String,	//		是	字符型V32	公司标识
  RegisterDate:Date,//	  否	数字型	F8	注册日期	乘客在平台的注册日期YYYYMMDD
  PassengerPhone:String,	//	是	字符型	V32	乘客手机号
  PassengerName:String,	//	否	字符型	V64	乘客称谓
  PassengerGender:String,	//	否	字符型	V2	乘客性别
  State:Number,//	是	数字型	F1	状态	0:有效1.失效
  Flag:Number,//	是	数字型	F1	操作标识	1:新增2 :更新3:删除
  UpdateTime:Date,//	是	数字型	F14	更新时间	网约车平台完成数据更 新的时间 YYYYMMDDh hmmss
});
Platform_baseInfoPassengerSchema.plugin(mongoosePaginate);
// A.5.  订 单信息交换接口
// A. 5. 1.订单发起接 口
// orderCreate
/*
订单信息（阶段N)，程序获取
*/
let Platform_orderCreateSchema= new Schema({
  Companyld:String,	//	是	字符型	V32	公司标识
  Address:Number,//	是	数字型	F6	发起地行政区划代码	见 GB/T 2260
  Orderld:String,	//	是	字符型	V64	订单编号
  DepartTime:Date,//	是	数字型	F14	预计用车时间	YYYYMMDDhhmmss
  OrderTime:Date,//	是	数字型F14	订单发起时间 YYYYMMDDhhmmss
  PassengerNote:String,	//	否	字符型V128	乘客备注
  Departure:String,	//是字符型V128 预计出发地点详细地址
  DepLongitude:Number,//	是	数字型V10	预计出发地点经度	单位 :1 祷 10-6度
  DepLatitude:Number,//	是	数字型V10	预计出发地点纬度	单位:1铃 10-6度
  Destination:String,	//	是	字符型V128	预计目的地
  DestLongitude:Number,//	是	数字型VI0	预计目的地经度	单位 :1铃 10-6度
  DestLatitude:Number,//	是	数字型V10	预计目的地纬度	单位 :1怜 10-6度
  Encrypt:Number,//是数字型F1坐标加密标识1:GCJ-02 测绘局标准2 :WGS84 GPS 标准3 :BD-09 百度标准4 :CGCS2000 北斗标准O .其他
  FareType:String,	//	是	字符型V16	运价类型编码
});
Platform_orderCreateSchema.plugin(mongoosePaginate);
// A. 5. 2. 订单成功接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传订 单成功信息，订单成功是指乘客发出的订单通过抢单或派单等形 式与驾驶员匹配成功。
// orderMatch
/*
订单信息（阶段N)，程序获取
*/
let Platform_orderMatchSchema= new Schema({
  Companyld:String,	//	是	字符型	  V32	公司标识
  Address:Number,//	是	数字型	  F6	发起地行政区划代码	见 GB/T 2260
  Orderld:String,	//	是	字符型	  V64	订单编号
  Longitude:Number,//	否	数字型	VI0	车辆经度	单位 :1赞 10-6 度
  Latitude:Number,//	否	数字型	VI0	车辆纬度	单位:1铃 10-6 度  l :GCJ 一02 测绘局标准2:WGS84 GPS 标准
  Encrypt:Number,//	是	数字型	Fl	坐标加密标识	3:BD-09 百度标准4 :CGCS2000  北斗标准  0 :其他
  Licenseld:String,	//	是	字符型	V32	机动车驾驶证编号 DriverPhone	是	字符型	V32	驾驶员手机号 VehicleNo	是	字符型	V32	车辆号牌
  DriverPhone:String,// 是 字符型 V32 驾驶员手机号
  VehicleNo:String, // 是 字符型 v32 车辆号码
  DistributeTime:Date,//	是	数字型	F14	派单成功时间	YYYYMMDDhhmmss
});
Platform_orderMatchSchema.plugin(mongoosePaginate);
// A. 5. 3. 订单撤销接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传订单撤销信息。
// 接口定义见表 A.35 。
//orderCancel
/*
订单信息（阶段N)，程序获取
*/
let Platform_orderCancelSchema= new Schema({
  Companyld:String,	//	是	字符型	V32	公司标识
  Address:Number,//	是	数字型	F6	上车地点行政区划代码	见 GBjT 2260
  Orderld:String,	//	是	字符型	V64	订单编号
  OrderTime:Date,//	否	数字型	F14	订单时间	YYYYMMDDhhmmss
  CancelTime:Date,//	是	数字型	F14	订单撤销时间	YYYYMMDDhhmmss
  Operator:Number,	//	 是	字符型	V64	  撤销发起方	1.乘客2:驾驶员3 .平台公司
  CancelTypeCode:Number,	//	 是  字符型	  V32	  撤销类型代码	1:乘客提前撤销2:驾驶员提前撤销3:平台公司撤销4 .乘客违约撤销5 .驾驶员违约撤销
  CancelReason:String,	//	否	字符型	  V128	撤销或违约原因
});
Platform_orderCancelSchema.plugin(mongoosePaginate);
// A. 6. 1.车辆经营上线接口
// 业务描述 :用于网约车平台公司向部级平台发起请求，上传车辆经营上线信息。
// operateLogin
/*
程序获取
*/
let Platform_operateLoginSchema= new Schema({
  Companyld:String,	//	是	字符型	V32	公司标识
  Licenseld:String,	//	是	字符型	V32	机动车驾驶证号
  VehicleNo:String,	//	是	字符型	V32	车辆号牌
  LoginTime:Date,//	是	数字型	F14	车辆经营上线时间	YYYYMMDDhhmmss
  Longitude:Number,	//否	数字型	V10	上线经度	单位 :1 铃 10-6度
  Latitude:Number,//	否	数字型	V10	上线纬度	单位 :1 铃 10-6度
  Encrypt:Number,	 // 是	数字型	F1	坐标加密标识	l:GCJ 一02 测绘局标准2:WGS84 GPS 标准 3:BD一09 百度标准4 :CGCS2000 北斗标准0 :其他
});
Platform_operateLoginSchema.plugin(mongoosePaginate);
// A. 6. 2.  车辆经营下线接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传车 辆经营下线信息。operateLogout
/*
程序获取
*/
let Platform_operateLogoutSchema= new Schema({
  Companyld:String,		//是	字符型	V32	公司标识
  Licenseld:String,		//是	字符型	V32	机动车驾驶证 号
  VehicleNo:String,		//是	字符型 V32	车辆号牌
  LogoutTime:Number,	//是	数字型 F14	车辆经营下线时间 YYYYMMDDhhmm ss
  Longitude:Number,	//否	数字型	V10	下线经度	单位 :1铃 10-6度
  Latitude:Number,	//否	数字型	V10	下线纬度	单位 :1铃 10-6度
  Encrypt:Number,	//是	数字型	F1	坐标加密标识	l :GCJ 一02 测绘局标准2:WGS84 GPS 标准3:BD一09 百度标准4: CGCS2000 北斗标准0:其他
});
Platform_operateLogoutSchema.plugin(mongoosePaginate);
// A. 6. 3. 经营出发接口 业务描述:用于网约车平台公司向部级平台发起请求，上传经营出发信息。
/*
程序获取
*/
let Platform_operateDepartSchema= new Schema({
  Companyld:String,		//	是	字符型	V32	公司标识
  Orderld:String,		//	是	字符型	V64	订单号
  Licenseld:String,		//	是	字符型	V32	机动车驾驶证号
  FareType:String,		//	是	字符型	V16	运价类型编码
  VehicleNo:String,		//	是	字符型	V32	车辆号牌
  DepLongitude:Number,	//	是	数字型	V10	车辆出发经度	单位 :1祷 10-6 度
  DepLatitude:Number,	//	是	数字型	V10	车辆出发纬度	单位 :1*10-6 度
  Encrypt:Number,	//	是	数字型	F1	坐标加密标识	l:GCJ 一02 测绘局标准2 :WGS84 GPS 标准3 :BD一09  百度标准4 :CGCS2000 北斗标准0:其他
  DepTime:Date,	//	是	数字型	F14	上车时间	YYYYMMDDhhmmss
  WaitMile:Number,	//	否	数字型	VIO	空驶里程	单位 :km
  WaitTime:Number,	//	否	数字型	VIO	等待时间	单位:秒
});
Platform_operateDepartSchema.plugin(mongoosePaginate);
// A. 6. 4.  经营到达接口
/*
程序获取
*/
let Platform_operateArriveSchema= new Schema({
  Companyld:String,		//	是	字符型	V32	公司标识
  Orderld:String,		//	是	字符型	V64	订单号
  DestLongitude:Number,	//	是	数字型	V10	车辆到达经度	单位 :1祷 10-6 度
  DestLatitude:Number,	//	是	数字型	V10	车辆到达纬度	单位 :1铃 10-6 度
  Encrypt:Number,	//	是	数字型	F1	坐标加密标识	l:GCJ 一 02 测绘局标准2:WGS84 GPS 标准3:BD一09 百度标准4:CGCS2000 北斗标准O.其他
  DestTime:Date,	//	是	数字型	F14	下车时间	YYYYMMDDhhmmss
  DriveMile:Number,	//	是	数字型	V10	载客里程	单位 :km
  DriveTime:Number,	//	是	数字型	V10	载客时间	单位:秒
});
Platform_operateArriveSchema.plugin(mongoosePaginate);
// A. 6. 5. 经营支付接口业务描述:用于网约车平台公司向部级平台发起请求，上传经营支付信息。
// operatePay
/*
程序获取，订单信息
*/
let Platform_operatePaySchema= new Schema({
  Companyld:String,		//	是	字符型	V32	网约车公司标识
  Orderld:String,		//	是	字符型	V64	订单编号
  OnArea:Number,	//	是	数字型	F6	上车位置行政区划编号	见 GB/T 2260
  DriverName:String,		//	否	字符型	V64	机动车驾驶员姓名
  Licenseld:String,		//	是	字符型	V32	机动车驾驶证号
  FareType:String,		//	是	字符型	V16	运价类型编码	由网约车公司定义，与 A. 4. 6运价信息 接 口一一 对应
  VehicleNo:String,		//	是	字符型	V32	车辆号牌
  BookDepTime:Date,	//	是	数字型	F14	预计上车时间	YYYYMMDDhhmmss
  WaitTime:Number,	//	否	数字型	V10	等待时间	单位 :秒
  DepLongitude:Number,	//	是	数字型	V10	车辆出发经度	单位 :1怜 10-6 度
  DepLatitude:Number,	//	是	数字型	V10	车辆 出发纬度	单位 :1传 10-6 度
  DepArea:String,		//	否	字符型	V128	上车地点
  DepTime:Date,	//	是	数字型	F14	上车时间	YYYYMMDDhhmmss
  DestLongitude:Number,	//	是	数字型	V 10	车辆到达经度	单位 :1铃 10-6 度
  DestLatitude:Number,	//	是	数字型	VI0	车辆到达纬度	单位 :1铃 10-6 度
  DestArea:String,		//	否	字符型	V128	下车地点
  DestTime:Date,	//	是	数字型	F14	下车时间	YYYYMMDDhhmm ss
  BookModel:String,		//	否	字符型	V64	预定车型
  Model:String,		//	否	字符型	V64	实际使用车型
  DriveMile:Number,	//	是	数字型	V10	载客里程	单位 :km
  DriveTime:Number,	//	是	数字型	V10	载客时间	单位 :秒
  WaitMile:Number,	//	否	数字型	V10	空驶里程	单位 :km
  FactPrice:Number,	//	是	数字型	V10	实收金额	单位:元
  Price:Number,	//	否	数字型	V10	应收金额	单位 :元
  CashPrice:Number,	//	否	数字型	V10	现金支付金额	单位 :元
  LineName:String,		//	否	字符型	V64	电子支付机构
  LinePrice:Number,	//	否	数字型	V10	电子支付金额	单位 :元
  PosName:String,		//	否	字符型	 V64	POS 机支付机构
  PosPrice:Number,	//	否	数字型	V10	POS 机支付金额	单位:元
  BenfitPrice:Number,	//	否	数字型	V10	优惠金额	单位 :元
  BookTip:Number,	//	否	数字型	 V10	预约服务费	单位:元
  PassengerTip:Number,	//	否	数字型	  V10	附加费	单位:元	高峰时段时间 加价金
  PeakUpPrice:Number,	//	否	数字型	V10	额	单位:.:7G
  NightUpPrice:Number,	//	否	数字型	V10	夜间时段里程加价金 额	单位:元
  FarUpPrice:Number,	//	是	数字型	V10	远途加价金额	单位:元
  OtherUpPrice:Number,	//	是	数字型	V10	其他加价金额	单位:元
  PayState:String,		//	是	字符型	  V32	结算状态	数据取值有效范围 :O .未结算1. 已结算2 :未知
  PayTime:Date,	//	否	数字型	F14	乘客结算时间	YYYYMMDDhhmmss
  OrderMatchTime:Date,	//	否	数字型	F14	订单完成时间	YYYY MMDDhhmm ss
  InvoiceStatus:String,		//	 是	字符型	 V32	发票状态	数据取值有效范围 :0:未开票1.已开票	2 :未知
});
Platform_operatePaySchema.plugin(mongoosePaginate);
// A. 7. 1.驾驶员定位信息接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传驾 驶员定位信息。
/*
程序获取，司机定位信息，定时获取
*/
let Platform_positionDriverSchema= new Schema({
  Companyld:String,		//	是	字符型	V32	网约车公司标识
  Licenseld:String,		//	是	字符型	V32	网约车公司标识	是	字符型	V32		机动车驾驶证号		驾驶员报备地行政区划
  DriverRegionCode:Number,	//	是	数字型	F6		行政区划代码	代码，地市级，应符合GB/T2260
  VehicleNo:String,		//	是	字符型	V32	网约车公司标识	是	字符型 V32		车辆号牌
  PositionTime:Date,	//	是	数字型	V14		定位时间	umxtlme
  Longitude:Number,	//	是	数字型	V10		经度	单位 :1祷 10-6 度
  Latitude:Number,	//	是	数字型	V10		纬度	单位 :1铃 10-6 度 1:GC]-02 测绘局标准
  Encrypt:Number,	//	否	数字型	V10		坐标加密标识	2:WGS84 GPS 标准3:BD一09 百度标准4:CGCS2000 北斗标准0:其他
  Direction:Number,	//	否	数字型	V10		方向角	0-359 ，顺时针方向
  Elevation:Number,	//	否	数字型	V10		海拔高度	单位:米
  Speed:Number,	//	否	数字型	V10		瞬时速度	单位 :公里每小时(km/h)
  BizStatus:Number,	//	否	数字型	V10		营运状态	1:载客、2.接单、3 :空驶4.停运
  Orderld:String,		//	是	字符型	V64		订单编号
});
Platform_positionDriverSchema.plugin(mongoosePaginate);
// A. 7. 2.  车辆定位信息接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传车辆定位信息。positionVehicle
/*
程序获取，车辆定位信息，定时获取
*/
let Platform_positionVehicleSchema= new Schema({
  Companyld:String,	//是	字符型	V32	公司标识
  VehicleNo:String,	//是	字符型	V32	车辆号牌
  VehicleRegionCode:Number,		//是	数字型	F6 行政区划代码	车辆报备地行政区划代码，地市级 ，应符合GB/T2260
  PositionTime:Date,		//是	数字型	 V14	定位时间	Unlxtlme
  Longitude:Number,		//是	数字型	VIO	经度	单位 :1铃 10-6 度
  Latitude:Number,		//是	数字型	VIO	纬度	单位:1祷 10-6 度
  Speed:Number,		//	否	数字型	VIO	瞬时速度	单位 :公里每小时(km/h)
  Direction:Number,		//	否	数字型	VIO	方向角	。一359 ，顺时针方向
  Elevation:Number,		//	否	数字型	VIO	海拔高度	单位 :米
  Mileage:Number,		//	否	数字型	V10	行驶里程	单位 :km
  Encrypt:Number,		//	否	数字型	V10	坐标加密标识	1:∞J一02 测绘局标准2 :WGS84  GPS 标准3:BD一 09 百度标准4:CGCS2000 北斗标准O  .其他
  WarnStatus:Number,		//	否	数字型	V10	预警状态	参考 JT/T808
  VehStatus:Number,		//	否	数字型	V10	车辆状态	参考 JT/T808
  BizStatus:Number,		//	否	数字型	V10	营运状态	1.载客2 :接单3 :空驶  4 .停运
  Orderld:String,	//是	字符型	V64	订单编号	非营运状态下填 "0"
});
Platform_positionVehicleSchema.plugin(mongoosePaginate);
// A.8. 服务质量信息交换接口
// A. 8. 1.乘客评价信息接口 业务描述:用于网约车平台公司向部级平台发起请求，上传乘客评价信息。
// ratedPassenger
/*
程序获取，乘客评价信息;乘客-》评价
*/
let Platform_ratedPassengerSchema= new Schema({
  Companyld:String,	//	是	字符型	V32	公司标识
  Orderld:String,	//	是	字符型	V64	订单号
  EvaluateTime:Date,		//	是	数字型	F14	评价时间	YYYYMMDDhhmmss
  ServiceScore:Number,		//	是	数字型	VI 0	服务满意度	五分制
  DriverScore:Number,		//	否	数字型	VI0	驾驶员满意度	五分制
  VehicleScore:Number,		//	否	数字型	VI0	车辆满意度	五分制
  Detail:String,	//	否	字符型	V128	评价内容
});
Platform_ratedPassengerSchema.plugin(mongoosePaginate);
// A. 8. 2.  乘客投诉信息接口
// 业务描述:用于网约车平台公司向部级平台发起请求，上传乘客投诉信息。
//ratedPassengerComplaint
/*
程序获取，乘客投诉信息;乘客-》投诉
*/
let Platform_ratedPassengerComplaintSchema= new Schema({
  Companyld:String,	//	是	字符型	V32	公司标识
  Orderld:String,	//	是	字符型	V64	订单号
  ComplaintTime:Date,		//	是	数字型	F14	投诉时间	YYYYMMDDhhmmss
  Detail:String,	//	是	字符型	V256	技诉内容
  Result:String,	//	否	字符型	V128	处理结果
});
Platform_ratedPassengerComplaintSchema.plugin(mongoosePaginate);
// A. 8. 3. 驾驶员处罚信息接口
// 业务描述  :用于网约车平台公司向部级平台发起请求，上传驾驶员处罚信息。
// ratedDriverPunish
/*
程序获取，驾驶员处罚信息接口
*/
let Platform_ratedDriverPunishSchema= new Schema({
  Companyld:String,	//	是	字符型	V32	公司标识
  Licenseld:String,	//	是	字符型	V32	机动车驾驶证编号
  PunishTime:Date,	//	是	数字型	F14	处罚时间	YYYYMMDDhhmmss
  PunishReason:String,	//	否	字符型	V128	处罚原因
  PunishResult:String,	//	是	字符型	V128	处罚结果
});
Platform_ratedDriverPunishSchema.plugin(mongoosePaginate);
// . 8. 4. 驾驶员信誉信息接口
// 业务描述  :用于网约车平台公司向部级平台发起请求，上传驾驶员信誉信息。
// ratedDriver
/*
程序获取，驾驶员信誉信息
*/
let Platform_ratedDriverSchema= new Schema({
  Companyld:String,	//	是	字符型	V32	公司标识
  Licenseld:String,	//	是	字符型	V32	机动车驾驶证编号
  Level:Number,	//	是	数字型	VI0	服务质量信誉等级	五分制
  TestDate:Date,	//	是	数字型	  F8	服务质量信誉考核日 期	YYYYMMDD
  TestDepartment:String,	//	是	字符型	V128 服务质量信誉考核机构
});
Platform_ratedDriverSchema.plugin(mongoosePaginate);


//以下为导出部分
exports.Platform_baseInfoCompanySchema = Platform_baseInfoCompanySchema;
exports.Platform_baseInfoCompanyStatSchema= Platform_baseInfoCompanyStatSchema;
exports.Platform_baseInfoCompanyPaySchema= Platform_baseInfoCompanyPaySchema;
exports.Platform_baseInfoCompanyServiceSchema= Platform_baseInfoCompanyServiceSchema;
exports.Platform_baseInfoCompanyPermitSchema= Platform_baseInfoCompanyPermitSchema;
exports.Platform_baseInfoCompanyFareSchema= Platform_baseInfoCompanyFareSchema;
exports.Platform_baseInfoVehicleSchema= Platform_baseInfoVehicleSchema;
exports.Platform_baseInfoVehiclelnsuranceSchema= Platform_baseInfoVehiclelnsuranceSchema;
exports.Platform_baseInfoVehicleTotalMileSchema= Platform_baseInfoVehicleTotalMileSchema;
exports.Platform_baseInfoDriverSchema= Platform_baseInfoDriverSchema;
exports.Platform_baseInfoDriverEducateSchema= Platform_baseInfoDriverEducateSchema;
exports.Platform_baseInfoDriverAppSchema= Platform_baseInfoDriverAppSchema;
exports.Platform_baseInfoDriverStatSchema= Platform_baseInfoDriverStatSchema;
exports.Platform_baseInfoPassengerSchema= Platform_baseInfoPassengerSchema;

exports.Platform_orderCreateSchema= Platform_orderCreateSchema;
exports.Platform_orderMatchSchema= Platform_orderMatchSchema;
exports.Platform_orderCancelSchema= Platform_orderCancelSchema;

exports.Platform_operateLoginSchema= Platform_operateLoginSchema;
exports.Platform_operateLogoutSchema= Platform_operateLogoutSchema;
exports.Platform_operateDepartSchema= Platform_operateDepartSchema;
exports.Platform_operateArriveSchema= Platform_operateArriveSchema;
exports.Platform_operatePaySchema= Platform_operatePaySchema;

exports.Platform_positionDriverSchema= Platform_positionDriverSchema;
exports.Platform_positionVehicleSchema= Platform_positionVehicleSchema;

exports.Platform_ratedPassengerSchema= Platform_ratedPassengerSchema;
exports.Platform_ratedPassengerComplaintSchema= Platform_ratedPassengerComplaintSchema;
exports.Platform_ratedDriverPunishSchema= Platform_ratedDriverPunishSchema;
exports.Platform_ratedDriverSchema= Platform_ratedDriverSchema;
//=============exports model=============
let Platform_baseInfoCompanyModel  = mongoose.model('baseinfocompany',  Platform_baseInfoCompanySchema);
let Platform_baseInfoCompanyStatModel= mongoose.model('baseinfocompanystat',  Platform_baseInfoCompanyStatSchema);
let Platform_baseInfoCompanyPayModel= mongoose.model('baseinfocompanypay',  Platform_baseInfoCompanyPaySchema);
let Platform_baseInfoCompanyServiceModel= mongoose.model('baseinfocompanyservice',  Platform_baseInfoCompanyServiceSchema);
let Platform_baseInfoCompanyPermitModel= mongoose.model('baseinfocompanypermit',  Platform_baseInfoCompanyPermitSchema);
let Platform_baseInfoCompanyFareModel= mongoose.model('baseinfocompanyfare',  Platform_baseInfoCompanyFareSchema);
let Platform_baseInfoVehicleModel= mongoose.model('baseinfovehicle',  Platform_baseInfoVehicleSchema);
let Platform_baseInfoVehiclelnsuranceModel= mongoose.model('baseinfovehiclelnsurance',  Platform_baseInfoVehiclelnsuranceSchema);
let Platform_baseInfoVehicleTotalMileModel= mongoose.model('baseinfovehicletotalmile',  Platform_baseInfoVehicleTotalMileSchema);
let Platform_baseInfoDriverModel= mongoose.model('baseinfodriver',  Platform_baseInfoDriverSchema);
let Platform_baseInfoDriverEducateModel= mongoose.model('baseinfodrivereducate',  Platform_baseInfoDriverEducateSchema);
let Platform_baseInfoDriverAppModel= mongoose.model('baseinfodriverapp',  Platform_baseInfoDriverAppSchema);
let Platform_baseInfoDriverStatModel= mongoose.model('baseinfodriverstat',  Platform_baseInfoDriverStatSchema);
let Platform_baseInfoPassengerModel= mongoose.model('baseinfopassenger',  Platform_baseInfoPassengerSchema);

let Platform_orderCreateModel= mongoose.model('ordercreate',  Platform_orderCreateSchema);
let Platform_orderMatchModel= mongoose.model('ordermatch',  Platform_orderMatchSchema);
let Platform_orderCancelModel= mongoose.model('ordercancel',  Platform_orderCancelSchema);

let Platform_operateLoginModel= mongoose.model('operatelogin',  Platform_operateLoginSchema);
let Platform_operateLogoutModel= mongoose.model('operatelogout',  Platform_operateLogoutSchema);
let Platform_operateDepartModel= mongoose.model('operatedepart',  Platform_operateDepartSchema);
let Platform_operateArriveModel= mongoose.model('operatearrive',  Platform_operateArriveSchema);
let Platform_operatePayModel= mongoose.model('operatepay',  Platform_operatePaySchema);

let Platform_positionDriverModel= mongoose.model('positiondriver',  Platform_positionDriverSchema);
let Platform_positionVehicleModel= mongoose.model('positionvehicle',  Platform_positionVehicleSchema);

let Platform_ratedPassengerModel= mongoose.model('ratedpassenger',  Platform_ratedPassengerSchema);
let Platform_ratedPassengerComplaintModel= mongoose.model('ratedpassengercomplaint',  Platform_ratedPassengerComplaintSchema);
let Platform_ratedDriverPunishModel= mongoose.model('rateddriverpunish',  Platform_ratedDriverPunishSchema);
let Platform_ratedDriverModel= mongoose.model('rateddriver',  Platform_ratedDriverSchema);

exports.Platform_baseInfoCompanyModel = Platform_baseInfoCompanyModel;
exports.Platform_baseInfoCompanyStatModel= Platform_baseInfoCompanyStatModel;
exports.Platform_baseInfoCompanyPayModel= Platform_baseInfoCompanyPayModel;
exports.Platform_baseInfoCompanyServiceModel= Platform_baseInfoCompanyServiceModel;
exports.Platform_baseInfoCompanyPermitModel= Platform_baseInfoCompanyPermitModel;
exports.Platform_baseInfoCompanyFareModel= Platform_baseInfoCompanyFareModel;
exports.Platform_baseInfoVehicleModel= Platform_baseInfoVehicleModel;
exports.Platform_baseInfoVehiclelnsuranceModel= Platform_baseInfoVehiclelnsuranceModel;
exports.Platform_baseInfoVehicleTotalMileModel= Platform_baseInfoVehicleTotalMileModel;
exports.Platform_baseInfoDriverModel= Platform_baseInfoDriverModel;
exports.Platform_baseInfoDriverEducateModel= Platform_baseInfoDriverEducateModel;
exports.Platform_baseInfoDriverAppModel= Platform_baseInfoDriverAppModel;
exports.Platform_baseInfoDriverStatModel= Platform_baseInfoDriverStatModel;
exports.Platform_baseInfoPassengerModel= Platform_baseInfoPassengerModel;

exports.Platform_orderCreateModel= Platform_orderCreateModel;
exports.Platform_orderMatchModel= Platform_orderMatchModel;
exports.Platform_orderCancelModel= Platform_orderCancelModel;

exports.Platform_operateLoginModel= Platform_operateLoginModel;
exports.Platform_operateLogoutModel= Platform_operateLogoutModel;
exports.Platform_operateDepartModel= Platform_operateDepartModel;
exports.Platform_operateArriveModel= Platform_operateArriveModel;
exports.Platform_operatePayModel= Platform_operatePayModel;

exports.Platform_positionDriverModel= Platform_positionDriverModel;
exports.Platform_positionVehicleModel= Platform_positionVehicleModel;

exports.Platform_ratedPassengerModel= Platform_ratedPassengerModel;
exports.Platform_ratedPassengerComplaintModel= Platform_ratedPassengerComplaintModel;
exports.Platform_ratedDriverPunishModel= Platform_ratedDriverPunishModel;
exports.Platform_ratedDriverModel= Platform_ratedDriverModel;
