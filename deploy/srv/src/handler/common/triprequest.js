let mongoose     = require('mongoose');
const moment  = require('moment');
let DBModels = require('../../db/models.js');
const config = require('../../config.js');

exports.pushtriporder = (socket,orderid)=>{
  if(typeof orderid === 'string'){
    orderid = mongoose.Types.ObjectId(orderid);
  }
  let TripOrderModel = DBModels.TripOrderModel;
  let queryobj = {_id:orderid};
  //{path:'driveruserid',model:'userdriver',select:'username profile.nickname profile.avatar'},
  TripOrderModel.findOne(queryobj).populate([
    {path:'triprequest',model:'triprequest'},
  ]).exec((err,triporder)=>{
    if(!err && !!triporder){
      let triprequest = triporder.triprequest;
      socket.emit('serverpush_triprequestandorder', {triprequest,triporder});
    }
  });
}
//获取距离最近的司机列表
//getRandomLocation
// const cars = require('../map/cars');
exports.getnearestdrivers = (param,callback)=>{
    //for test
    // let  resultdoc = {
    //     "driverid" : "588c99584624f40529f07865",
    //     "registertype" : null,
    //     "driverlocation" : [
    //         118.729041720895,//longitude
    //         31.9913777116779//latitude
    //     ],
    // };
    // let resultcall = [];
    // let drivers = Math.random()*20+1;
    // for(let i=0;i< drivers;i++){
    //     let coords = param.location;
    //     let loc = cars.getRandomLocation(coords[1],coords[0],3000);
    //     resultcall.push({
    //         "driverlocation" : [
    //             loc.longitude,//longitude
    //             loc.latitude//latitude
    //         ],
    //     })
    // };
    // callback(true,resultcall);
    // return;
    //==
  //param:location,位置信息
  //distance:x(单位km)
  // if(param.hasOwnProperty('userid')){
  //   //更新乘客地理位置
  // }
  let coords = param.location;
  let maxDistance = config.maxDistance;
  let UserDriverRealtimeLocation = mongoose.model('UserDriverRealtimeLocation', DBModels.UserDriverRealtimeLocationSchema);
  console.log("getnearestdrivers coords===>" + JSON.stringify(coords));
  console.log("getnearestdrivers registertype===>" + JSON.stringify(param.registertype));

  UserDriverRealtimeLocation.find({
         driverlocation:
          {
             $near:
             {
                 $geometry: {
                     type: "Point",
                     coordinates:coords
                 },
                 $maxDistance:maxDistance* 1609.34
              }
            },
            registertype:param.registertype
          }, (err, docs)=> {
            if(err){
              callback(false,err);
            }
            else{
              callback(true,docs);
            }

    });

}


exports.getnearbyrequests = (param,callback)=>{
  //param:location,位置信息
  //distance:x(单位km)
  //{$or: [{messagetype:'rider'}, {messagetype:'all'}]},
  console.log("param.userid:" + param.userid);
  if(param.hasOwnProperty("userid")){
    if(param.userid != ''){
      let driverlocationobj = {
        driverid:param.userid,
        updated_at:new Date(),
        driverlocation:param.driverlocation,
        registertype:param.registertype
      };
      console.log("getnearbyrequests driverlocationobj:" + JSON.stringify(driverlocationobj));

      let UserDriverRealtimeLocationModel = DBModels.UserDriverRealtimeLocationModel;
      UserDriverRealtimeLocationModel.update({driverid:param.userid},driverlocationobj,{upsert: true}, (err,result)=>{
        console.log("getnearbyrequests update err:" + JSON.stringify(err));
        console.log("getnearbyrequests update result:" + JSON.stringify(result));
      });
    }

  }


  let TripRequestModel = DBModels.TripRequestModel;
      let coords = param.driverlocation;
      let maxDistance = config.maxDistance;
      let nowDate = new Date();
      let queryobj = {
        'srclocation': {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coords
                },
                // distance to radians
                $maxDistance: maxDistance * 1609.34
            }
        },
        'created_at': { // 18 minutes ago (from now)
            $gt: new Date(nowDate.getTime() - 1000 * 60 * config.expRequestMinutes)
         },
         'requeststatus':'请求中'
      };

      if(param.registertype === '出租车'){
        let newqueryobj = {
          $and:[{$or: [{triptype:'出租车'}, {triptype:'代驾'}]}]
        };
        newqueryobj['$and'].push(queryobj);
        queryobj = newqueryobj;
      }
      else if(param.registertype === '快车'){
        let newqueryobj = {
          $and:[{$or: [{triptype:'快车'}, {triptype:'代驾'}]}]
        };
        newqueryobj['$and'].push(queryobj);
        queryobj = newqueryobj;
      }

      console.log(`getnearbyrequests=========${JSON.stringify(queryobj)}`);
      TripRequestModel.find(queryobj,(err,list)=>{
          console.log("err:" + JSON.stringify(err));
          console.log("list:" + JSON.stringify(list));
          if(err){
            callback(false,err);
          }
          else{
            callback(true,list);
          }
      });
    // });
    // DBModels.TripRequestSchema.index({ srclocation: '2dsphere' });
}
