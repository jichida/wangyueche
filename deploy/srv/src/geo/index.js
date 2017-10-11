let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
const config = require('../config.js');
//获取距离最近xkm的请求列表
let getnearestrequest =(param,callback)=>{
  //param:location,位置信息
  //distance:x(单位km)
  let TripRequestModel = mongoose.model('TripRequest', DBModels.TripRequestSchema);
  let coords = param.location;
  let maxDistance = config.maxDistance;
  TripRequestModel.find({
      'srclocation': {
          $near: {
              $geometry: {
                  type: "Point",
                  coordinates: coords
              },
              // distance to radians
              $maxDistance: maxDistance * 1609.34
          }
      }
  },(err,list)=>{
      if(err){
        callback(false,err);
      }
      else{
        callback(true,list);
      }
  });
}
//获取距离最近的司机列表
let getnearestdrivers = (param,callback)=>{
  //param:location,位置信息
  //distance:x(单位km)
  let coords = param.location;
  let maxDistance = config.maxDistance;
  let UserDriverRealtimeLocation = DBModels.UserDriverRealtimeLocationModel;
  UserDriverRealtimeLocation.on('index', (err)=> {
      if(err){
        callback(false,err);
        return;
      }
      UserDriverRealtimeLocation.find({
         location:
          {
             $near:
             {
                 $geometry: {
                     type: "Point",
                     coordinates:coords
                 },
                 $maxDistance:maxDistance* 1609.34
              }
            }
          }, (err, docs)=> {
            if(err){
              callback(false,err);
            }
            else{
              callback(true,docs);
            }

        });

      });

      DBModels.UserDriverRealtimeLocationSchema.index({ location: '2dsphere' });
}


exports.getnearestdrivers = getnearestdrivers;
exports.getnearestrequest = getnearestrequest;
