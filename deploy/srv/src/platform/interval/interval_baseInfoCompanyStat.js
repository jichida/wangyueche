const async = require('async');
const PubSub = require('pubsub-js');
const moment = require('moment');
// const DBModels = require('../db/models.js');
const dbplatform = require('../../db/modelsplatform.js');

const interval_baseInfoCompanyStat = ()=>{

  const fn_VehicleNum = (callbackfn)=>{
      const vehicleModel = dbplatform.Platform_baseInfoVehicleModel;
      vehicleModel.count({
            },(err, list)=> {
          callbackfn(err,list);
      });
  };

  const fn_DriverNum = (callbackfn)=>{
      const driverModel = dbplatform.Platform_baseInfoDriverModel;
      driverModel.count({
            },(err, list)=> {
          callbackfn(err,list);
      });
  };

  let asyncfnsz = [fn_VehicleNum,fn_DriverNum];
  async.parallel(asyncfnsz,(err,result)=>{
    if(!err && !!result){
      const VehicleNum = result[0];
      const DriverNum = result[1];
      const baseInfoCompanyStat = dbplatform.Platform_baseInfoCompanyStatModel;
      let entity = new baseInfoCompanyStat({
        VehicleNum,
        DriverNum,
        UpdateTime:moment().format('YYYY-MM-DD HH:mm:ss')
      });
      entity.save((err,result)=>{
        if(!err && !!result){
          PubSub.publish('platformmessage_upload',{
            action:'save',//'findByIdAndUpdate',
            collectionname:'baseinfocompanystat',//'baseinfocompany',
            doc:result
          });
        }
      });
    }
  });
}

module.exports = interval_baseInfoCompanyStat;
