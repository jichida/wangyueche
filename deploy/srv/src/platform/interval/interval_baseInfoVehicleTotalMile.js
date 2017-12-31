const async = require('async');
const PubSub = require('pubsub-js');
const moment = require('moment');
const geolib = require('geolib');
const dbplatform = require('../../db/modelsplatform.js');
const _ = require('lodash');
// 1、目标表中找到最早的更新时间<--
// 2、到定位表中选择>该时间的所有车辆ID
// 3、循环每个车辆-》
// 4、到目标表中找该车辆更新时间
// 5、到定位表中找到该司机到目前所有的定位数据
// 6、将定位数据累加，更新到目标表

//1、目标表中找到最早的更新时间<--
const fn_getearliestupdatetime = (callbackfn)=>{
  const dbModel = dbplatform.Platform_baseInfoVehicleTotalMileModel;
  dbModel.findOne({},{sort:{UpdateTime:-1}},(err,result)=>{
    if(!err && !!result){
      callbackfn(result.UpdateTime);
    }
    else{
      callbackfn(null);
    }
  });
}

// 2、到定位表中选择>该时间的所有车辆ID
const fn_getalldrivereidfrompositionvehicle = (UpdateTimeString,callbackfn)=>{
  const dbModel = dbplatform.Platform_positionVehicleModel;
  const query = {};
  if(!!UpdateTimeString){
    query = {
      PositionTime:{
        $gte:UpdateTimeString
      }
    };
  }
  dbModel.aggregate([
       {$match:query},
       {$group: {
           _id: '$VehicleNo',
       }
       }],
       (err, list)=> {
         let vehicleno_list = [];
         if(!err && !!list){
           console.log(`result list===>${JSON.stringify(list)}`)
           //DO WITH vehicleno_list
           _.map(list,(v)=>{
             if(v._id !== ''){
               vehicleno_list.push(v._id);
             }
           });
         }
         callbackfn(vehicleno_list);
       });
};

// 4、到目标表中找该车辆更新时间
const fn_getvehicle_updatetime = (vehicleno,callbackfn)=>{
  const dbModel = dbplatform.Platform_baseInfoVehicleTotalMileModel;
  dbModel.findOne({VehicleNo:vehicleno},(err,result)=>{
    if(!err && !!result){
      callbackfn(result.UpdateTime);
    }
    else{
      callbackfn(null);
    }
  });
};


// 5、到定位表中找到该司机到目前所有的定位数据
const fn_getvehicle_positions = (UpdateTimeString,vehicleno,callbackfn)=>{
  const dbModel = dbplatform.Platform_positionVehicleModel;
  const query ={VehicleNo:vehicleno};
  if(!!UpdateTimeString){
    query.PositionTime = {
        $gte:UpdateTimeString
    };
  }
  const fields = 'Latitude Longitude';
  console.log(`query==>${JSON.stringify(query)}`);
  dbModel.find(query,fields,{sort:{PositionTime:1}},(err,list)=>{
    let calc = 0;
    if(!err && !!list){
      //calc
      if(list.length > 1){
        for(let i = 1 ;i < list.length ; i++){
          const distance = geolib.getDistance(
              {latitude: list[i-1].Latitude, longitude: list[i-1].Longitude},
              {latitude: list[i].Latitude, longitude: list[i].Longitude}
          );
          calc += distance;
        }
      }
    }
    callbackfn(calc);
  });
};

// 6、将定位数据累加，更新到目标表
const interval_setvehicle = (vehicleno,calcmile,callbackfn)=>{
  const dbModel = dbplatform.Platform_baseInfoVehicleTotalMileModel;
  dbModel.findOneAndUpdate({VehicleNo:vehicleno},
    {
      $set:{
        VehicleNo:vehicleno,
        UpdateTime:moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      $inc:{TotalMile:calcmile}
    },{
      new:true,
      upsert:true
    },
    (err,result)=>{
    if(!err && !!result){
      callbackfn(result);
    }
    else{
      console.log(err);
      callbackfn(null);
    }
  });
}

const interval_baseInfoVehicleTotalMile = ()=>{
  console.log(`interval_baseInfoVehicleTotalMile===>`);
  fn_getearliestupdatetime((UpdateTimeString)=>{
    console.log(`fn_getearliestupdatetime===>${UpdateTimeString}`);
    fn_getalldrivereidfrompositionvehicle(UpdateTimeString,(vehicleno_list)=>{
        console.log(`fn_getalldrivereidfrompositionvehicle===>${JSON.stringify(vehicleno_list)}`);
        _.map(vehicleno_list,(vehicleno)=>{
          fn_getvehicle_updatetime(vehicleno,(UpdateTimeString)=>{
            console.log(`fn_getvehicle_updatetime===>${JSON.stringify(UpdateTimeString)}`);
            fn_getvehicle_positions(UpdateTimeString,vehicleno,(calcmile)=>{
              console.log(`fn_getvehicle_positions===>${calcmile}`);
              interval_setvehicle(vehicleno,calcmile,(result)=>{
                console.log(`interval_setvehicle===>${JSON.stringify(result)}`);
                if(!!result){
                  PubSub.publish('platformmessage_upload',{
                    action:'findByIdAndUpdate',//'findByIdAndUpdate',
                    collectionname:'baseinfovehicletotalmile',//'baseinfocompany',
                    doc:result
                  });
                }
              });
            });
          })
        });
    });
  })
}

module.exports = interval_baseInfoVehicleTotalMile;
