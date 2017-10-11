let winston = require('../../log/log.js');
let PubSub = require('pubsub-js');
const _ = require('lodash');
let DBModels = require('../../db/models.js');
//topic:user.id.request.id+data<---通知司机端更新(有新请求)
exports.pushrequesttodrivers = (socket,actiondata,ctx)=>{
    let TripRequestModel = DBModels.TripRequestModel;
    TripRequestModel.findOne({_id:actiondata.requestid,requeststatus:'请求中'},
      (err,triprequest)=>{
        if(!err && !!triprequest){
          console.log(`推送给所有司机:${JSON.stringify(actiondata.driveridlist)}`);
          _.map(actiondata.driveridlist,(driverid)=>{
            let eventobj = {
              cmd:'serverpush_nearbyrequests_addone',
              data:triprequest
            };
            PubSub.publish(`user.driver.${driverid}` , eventobj);
          });
        }
        socket.emit('pushrequesttodrivers_result',{});
    });
};
