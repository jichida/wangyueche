const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose  = require('mongoose');
let PubSub = require('pubsub-js');
const winston = require('../../log/log.js');
// const notifymessage_all = require('../common/notifymessage.js');

//查询我的路线
exports.getmypincheroute = (socket,actiondata,ctx)=>{
  let pincherouteModel = DBModels.BuscarpoolModel;
  let query = actiondata.query || {};
  if(ctx.usertype === 'rider' || ctx.usertype === 'driver'){
    socket.emit('common_err',{errmsg:`仅拼车司机端有效`,type:'getmypincheroute'});
    return;
  }

  query.pinchedriveruserid = ctx.userid;
  pincherouteModel.paginate(query,actiondata.options,(err,result)=>{
    if(!err){
      socket.emit('getmypincheroute_result',{result});
    }
    else{
      socket.emit('common_err',{errmsg:err.message,type:'getmypincheroute'});
      winston.getlog().error(`获取到我的路线失败${err.message}`);
    }
  });
}

exports.getonepincheroutepassengers = (socket,actiondata,ctx)=>{
  let targetid = actiondata._id;
  if(typeof targetid === 'string'){
    targetid = mongoose.Types.ObjectId(targetid);
  }
  let dbModel = DBModels.TripOrderModel;
  dbModel.aggregate([
       {$match: {'buscarpoolid':targetid,paystatus:'已支付'}},
       {$group: {
           _id: '$rideruserid',
           seatnumbertotal: { $sum: "$seatnumber" }
       }},
       {$lookup: {from: 'userriders', localField: '_id', foreignField: '_id', as: 'fromuserobj'}},
       {$project: {username:"$fromuserobj.username",userid:"$fromuserobj._id",seatnumbertotal:true,}}
       ],
       (err, list)=> {
        console.log(`getonepincheroutepassengers===========>${JSON.stringify(list)}`);
         if(!err){
           socket.emit('getonepincheroutepassengers_result',{result:list});
         }
         else{
           socket.emit('common_err',{errmsg:err.message,type:'getonepincheroutepassengers'});
           winston.getlog().error(`获取到我的路线失败${err.message}`);
         }
  });
}
