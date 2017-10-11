let DBModels = require('../../db/models.js');
let winston = require('../../log/log.js');
const config = require('../../config.js');

//获取我的优惠券
exports.mycoupongetall = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.MyCouponModel;
  payloaddata.query.creator = ctx.userid;
  dbModel.paginate(payloaddata.query,payloaddata.options,(err,list)=>{
    if(!err){
      socket.emit('mycoupongetall_result',{result:list});
    }
    else{
      socket.emit('common_err',{type:'mycoupongetall',errmsg:`获取我的优惠券失败:${err.message}`});
      winston.getlog().error(`获取我的优惠券失败:${err.message}`);
    }
  });
}
