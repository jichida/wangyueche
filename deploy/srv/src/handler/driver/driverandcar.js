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
      baseInfoDriver.CompanyId = config.Companyld;
      baseInfoDriver.Address = config.Address;
      let dbplatformmodel = DBPlatformModels.Platform_baseInfoDriverModel;
      let baseInfoDriverid = retdoc.Platform_baseInfoDriverId;
      if(typeof baseInfoDriverid === 'string'){
        baseInfoDriverid =  mongoose.Types.ObjectId(baseInfoDriverid);
      }
      baseInfoDriverid = baseInfoDriverid || new mongoose.mongo.ObjectID();

      baseInfoDriver._id = baseInfoDriverid;
      dbplatformmodel.findOneAndUpdate({_id:baseInfoDriverid},{$set:baseInfoDriver},{upsert:true,new:true},(err,result)=>{
        console.log(`get_fnsavebaseinfodriver err==>${JSON.stringify(err)}`);
        console.log(`get_fnsavebaseinfodriver result==>${JSON.stringify(result)}`);
        fncallback(err,result);
      });
  };
}

let get_fnsavebaseinfovehicle = (retdoc)=>{
  //以Platform_baseInfoVehicle为主体，插入／更新到Platform_baseInfoVehicle,返回Platform_baseInfoVehicle
  //以Platform_baseInfoVehicle为主体，插入／更新到MycarModel,返回MycarModel
  return (fncallback)=>{
      let baseinfovehicleid = retdoc.Platform_baseInfoVehicleId;
      if(typeof baseinfovehicleid === 'string'){
        baseinfovehicleid =  mongoose.Types.ObjectId(baseinfovehicleid);
      }
      baseinfovehicleid = baseinfovehicleid || new mongoose.mongo.ObjectID();

      if(typeof driveruserid === 'string'){
        driveruserid =  mongoose.Types.ObjectId(driveruserid);
      }

      let mycarid = retdoc.defaultmycar;
      if(typeof mycarid === 'string'){
        mycarid =  mongoose.Types.ObjectId(mycarid);
      }
      mycarid = mycarid || new mongoose.mongo.ObjectID();

      let baseInfovehicle = retdoc.Platform_baseInfoVehicle || {};
      baseInfovehicle._id = baseinfovehicleid;
      baseInfovehicle.CompanyId = config.Companyld;
      baseInfovehicle.Address = config.Address;

      console.log(`fnsavebaseinfovehicle:baseinfovehicleid:${baseinfovehicleid},mycarid:${mycarid}`);

      let dbplatformmodel = DBPlatformModels.Platform_baseInfoVehicleModel;
      dbplatformmodel.findOneAndUpdate({_id:baseinfovehicleid},{$set:baseInfovehicle},{upsert:true,new:true},(err,result)=>{
        console.log(`get_fnsavebaseinfovehicle err==>${JSON.stringify(err)}`);
        console.log(`get_fnsavebaseinfovehicle result==>${JSON.stringify(result)}`);
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
      console.log(`get_fnsavemycar err==>${JSON.stringify(err)}`);
      console.log(`get_fnsavemycar result==>${JSON.stringify(result)}`);
      if(!err){
          let dbcarmodel = DBModels.MycarModel;
          let cardata = {
            _id:mycarid,
            creator:driveruserid,
            created_at:new Date(),
            PhotoandCarmanURL:retdoc.PhotoandCarmanURL,//人车合影
            LicensePhotoldURL:retdoc.LicensePhotoldURL,//机动车驾驶证
            CarrunPhotoldURL:retdoc.CarrunPhotoldURL,//机动车行驶证
            Platform_baseInfoVehicleId:result._id,
            Platform_baseInfoVehicle:result
          };

          dbcarmodel.findOneAndUpdate({_id:mycarid},{$set:cardata},{upsert:true,new:true},(err,result)=>{
            fncallback(err,result);
          });
        }
    });
  }
}

let presave_driver =(retdoc,driveruserid,fnresult)=>{
  let fnsavebaseinfodriver = get_fnsavebaseinfodriver(retdoc);
  let fnsavemycar = get_fnsavemycar(retdoc,driveruserid);
  let asyncfnsz = [fnsavebaseinfodriver,fnsavemycar];
  async.parallel(asyncfnsz,(err,result)=>{
    console.log(`async.parallel ==>:${JSON.stringify(result)}`);
    if(!err){
      console.log(`async.parallel ==>:${ result[0]._id}${ result[1]._id}`);
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
