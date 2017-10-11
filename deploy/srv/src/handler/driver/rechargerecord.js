let DBModels = require('../../db/models.js');
const config = require('../../config.js');
let winston = require('../../log/log.js');
const async = require('async');
let PubSub = require('pubsub-js');
//const orderm = require('./order.js');

//获取充值明细
exports.getrechargerecords = (socket,payloaddata,ctx)=>{
   let dbModel = DBModels.RechargerecordModel;
    payloaddata.query.creator = ctx.userid;
    payloaddata.options.populate =   [
      {
        path:'fromorder', select:'triptype', model: 'triporder'
      },
    ];
    dbModel.paginate(payloaddata.query,payloaddata.options,(err,list)=>{
        if(!err){
            socket.emit('getrechargerecords_result',{result:list});
        }
        else{
            socket.emit('common_err',{type:'getrechargerecords',errmsg:`获取充值明细:${err.message}`});
            winston.getlog().error(`获取充值明细:${err.message}`);
        }
    });
}
