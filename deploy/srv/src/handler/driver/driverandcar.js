let DBModels = require('../../db/models.js');
let DBPlatformModels = require('../../db/modelsplatform.js');
let mongoose = require('mongoose');
let PubSub = require('pubsub-js');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const async = require('async');


let get_fnsavebaseinfodriver = (retdoc)=>{
  //以Platform_baseInfoDriver为主体，插入到Platform_baseInfoDriverModel,返回Platform_baseInfoDriverModel
  return (fncallback)=>{
      let baseInfoDriver = retdoc.Platform_baseInfoDriver || {};
      baseInfoDriver.CompanyId = config.CompanyId;
      baseInfoDriver.Address = config.Address;
      let dbplatformmodel = DBPlatformModels.Platform_baseInfoDriverModel;
      let baseInfoDriverid = retdoc.Platform_baseInfoDriverId;
      if(typeof baseInfoDriverid === 'string'){
        baseInfoDriverid =  mongoose.Types.ObjectId(baseInfoDriverid);
      }
      baseInfoDriverid = baseInfoDriverid || new mongoose.mongo.ObjectID();

      baseInfoDriver._id = baseInfoDriverid;
      dbplatformmodel.findOneAndUpdate({_id:baseInfoDriverid},{$set:baseInfoDriver},{upsert:true,new:true},(err,result)=>{
        console.log(`[保存到Platform_baseInfoDriverModel]传入参数:${JSON.stringify(retdoc)}\n结果:${JSON.stringify(result)}\n\n`);
        fncallback(err,result);
      });
  };
}

let get_fnsavebaseinfovehicle = (retdoc)=>{
  //以Platform_baseInfoVehicle为主体，插入／更新到Platform_baseInfoVehicle,返回Platform_baseInfoVehicle
  //以Platform_baseInfoVehicle为主体，插入／更新到MycarModel,返回MycarModel
  return (fncallback)=>{
      let baseinfovehicleid = retdoc.Platform_baseInfoVehicleId;
      if(!!baseinfovehicleid){
        if(typeof baseinfovehicleid === 'string'){
          baseinfovehicleid =  mongoose.Types.ObjectId(baseinfovehicleid);
        }
      }
      baseinfovehicleid = baseinfovehicleid || new mongoose.mongo.ObjectID();

      if(typeof driveruserid === 'string'){
        driveruserid =  mongoose.Types.ObjectId(driveruserid);
      }
      let mycarid = retdoc.defaultmycar;
      if(!!mycarid){
        if(typeof mycarid === 'string'){
          mycarid =  mongoose.Types.ObjectId(mycarid);
        }
      }

      mycarid = mycarid || new mongoose.mongo.ObjectID();

      let baseInfovehicle = retdoc.Platform_baseInfoVehicle || {};
      baseInfovehicle._id = baseinfovehicleid;
      baseInfovehicle.CompanyId = config.CompanyId;
      baseInfovehicle.Address = config.Address;


      let dbplatformmodel = DBPlatformModels.Platform_baseInfoVehicleModel;
      dbplatformmodel.findOneAndUpdate({_id:baseinfovehicleid},{$set:baseInfovehicle},{upsert:true,new:true},(err,result)=>{
        console.log(`[保存到Platform_baseInfoVehicleModel]传入参数:${JSON.stringify(retdoc)}\n结果:${JSON.stringify(result)}\n\n`);
        fncallback(err,result);
      });
  };
}

let get_fnsavemycar = (retdoc,driveruserid)=>{
  let mycarid = retdoc.defaultmycar;
  if(typeof mycarid === 'string'){
    mycarid =  mongoose.Types.ObjectId(mycarid);
  }
  mycarid = mycarid || new mongoose.mongo.ObjectID();
  retdoc.defaultmycar = mycarid;
  return (fncallback)=>{
    let fnsavebaseinfovehicle = get_fnsavebaseinfovehicle(retdoc);
    fnsavebaseinfovehicle((err,result)=>{

      if(!err){
          let dbcarmodel = DBModels.MycarModel;
          let cardata = {
            creator:driveruserid,

            LicensePhotoIdURL:retdoc.LicensePhotoIdURL,//机动车驾驶证
            CarrunPhotoIdURL:retdoc.CarrunPhotoIdURL,//机动车行驶证
            PhotoandCarmanURL:retdoc.PhotoandCarmanURL,//人车合影

            Platform_baseInfoVehicleId:result._id,

            Platform_baseInfoVehicle:{
              VehicleNo:result.VehicleNo,//<----	是	字符型	V32	车辆号牌
              PlateColor:result.PlateColor,//<----()	是	字符型	V32	车牌颜色	见 J T/T 697. 7-2014 中5.6
              Seats:result.Seats,//<----	是	数字型	V10	核定载客位
              Brand:result.Brand,//<----()	是	字符型	V64	车辆厂牌
              Model:result.Model,//<----()	是	字符型	V64	车辆型号
              VehicleType:result.VehicleType,//	是	字符型	V64	车辆类型	以机动车行驶证为准
              OwnerName:result.OwnerName,//<----	是	字符型	V64	车辆所有人	应与《机动车登记证书》所注明的车辆所有人一致
              VehicleColor:result.VehicleColor,//	是	字符型	V32	车身颜色

              EngineId:result.EngineId,//	是	字符型	V32	发动机号	以机动车行驶证为准
              VIN:result.VIN,//	是	字符型	F17	车辆VIN码	以机动车行驶证为准
              CertifyDateA:result.CertifyDateA,//	是	数字型	F8	车辆注册日期	以机动车行驶证为准
              FuelType:result.FuelType,//	是	字符型	V32	牢辆燃料类型	见 JT/T697. 7-2014  中4. 1.4. 15
              EngineDisplace:result.EngineDisplace,//	是	字符型	V32	发动机排量	单位 :毫升

              PhotoId:result.PhotoId,//	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
              PhotoIdURL:result.PhotoIdURL,//	否	字符型	V128	车辆照片文件编号	本字段传输照片文件编 号，照片文件通过 6. 1节FTPS 接 口 传输;格式 jpg; 按照车辆行驶证照片 的标准。
              Certificate:result.Certificate,//<----	否	字符型	V64	运输证字号	见 JT/T  415-2006  中5. 4.1，地市字别可包含三个汉字
              TransAgency:result.TransAgency,//	是	字符型	V256	车辆运输证发证机构	全称
              TransArea:result.TransArea,//	是	字符型	V256	车辆经营区域
              TransDateStart:result.TransDateStart,//	是	数字型	F8	车辆运输证有效期起	YYYYMMDD 元素名称	必选	类型	长度	字段名称	描	述
              TransDateStop:result.TransDateStop,//	是	数字型	F8	车辆运输证有效期止	YYYYMMDD
              CertifyDateB:result.CertifyDateB,//	是	数字型	F8	车辆初次登记日期	YYYYMMDD
              FixState:result.FixState,//	是字符型	V64	车辆检修状态	数据取值有效范围 :0 :未检修1.已检修2 :未知
              NextFixDate:result.NextFixDate,//	否	数字型	F8	车辆下次年检时间
              CheckState:result.CheckState,//<----	是	字符型	F2	车辆年度审验状态	见 JT/T 415-2006 中5.4.4
              FeePrintId:result.FeePrintId,//	是	字符型	V32	发票打印设备序列号

              GPSBrand:result.GPSBrand,//	是	字符型	V2 56	卫星定位装置品牌
              GPSModel:result.GPSModel,//	是	字符型	V64	卫星定位装置型号
              GPSIMEI:result.GPSIMEI,//	否	字符型	V128	卫星定位装置IMEI号
              GPSlnstallDate:result.GPSlnstallDate,//	是	数字型	F8	卫星定位设备安装日期	YYYYMMDD

              RegisterDate:result.RegisterDate,//	是	数字型	F8	报备日期	车辆信息向服务所在地出租汽车行政主管部门报备 日期 YYYYMMDD
              CommercialType:result.CommercialType,//	是	数字型	F1	服务类型	1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
              FareType:result.FareType,//	是	字符型	V16	运价类型编码由网约车公司定义，与 A. 4.6 运价信息接口一一对 应
            }

          };

          console.log(`开始--->\nmycarid:${mycarid},数据:${JSON.stringify(cardata)}\n`);
          dbcarmodel.findOneAndUpdate({_id:mycarid},{$set:cardata},{upsert:true,new:true},(err,result)=>{
            console.log(`[保存到MycarModel]传入参数:${JSON.stringify(retdoc)}\n结果:${JSON.stringify(result)}\n\n`);
            console.log(err);
            fncallback(err,result);
          });
        }
        else{
          fncallback(err,null);
        }
    });
  }
}

let presave_driver =(retdoc,driveruserid,fnresult)=>{
  let fnsavebaseinfodriver = get_fnsavebaseinfodriver(retdoc);
  let fnsavemycar = get_fnsavemycar(retdoc,driveruserid);
  let asyncfnsz = [fnsavebaseinfodriver,fnsavemycar];
  async.parallel(asyncfnsz,(err,result)=>{
    if(!err){
      retdoc.Platform_baseInfoDriverId = result[0]._id;
      retdoc.defaultmycar = result[1]._id;
    }
    fnresult(null,retdoc);
  });
}

exports.get_fnsavebaseinfodriver = get_fnsavebaseinfodriver;
exports.get_fnsavebaseinfovehicle = get_fnsavebaseinfovehicle;
exports.get_fnsavemycar = get_fnsavemycar;
exports.presave_driver = presave_driver;
