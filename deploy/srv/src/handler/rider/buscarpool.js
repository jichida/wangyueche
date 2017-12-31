const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose     = require('mongoose');
let moment = require('moment');
const winston = require('../../log/log.js');
const async = require('async');
const _ = require('lodash');
const adminaction = require('../../router/action');

exports.getbuscarpool = (socket,actiondata,ctx)=>{
  let buscarpoolModel = DBModels.BuscarpoolModel;
  let query = actiondata;
  if(!!query.startdate){
      if (typeof query.startdate === 'string') {
        query.startdate = new Date(Date.parse(query.startdate));
      }
      let startdate = moment(query.startdate).format("YYYY-MM-DD");
      let curdate =  moment(startdate);
      let nextdate = moment(curdate).add(1, 'days');
      query.startdate = {
        $gte: curdate.format('YYYY-MM-DD'),
        $lt: nextdate.format('YYYY-MM-DD'),
      }
  }
   query.isenabled = true;
   buscarpoolModel.find(query,(err,list)=>{
     if(!err){
      let asyncfnsz = [];
      _.map(list,(item,index)=>{
        let fn = (fncallback)=>{
          item = item.toJSON();
          list[index] = item;
          adminaction.gettakenseatfromorder(item,(err,result)=>{
            console.log(`gettakenseatfromorder,result===>${JSON.stringify(result)}`);
            fncallback(err,result);
          });
        }
        asyncfnsz.push(fn);
      });

      async.parallel(asyncfnsz,(err,result)=>{
        socket.emit('getbuscarpool_result',{list});
      });
     }
     else{
       socket.emit('common_err',{type:'getbuscarpool',errmsg:`获取拼车信息失败(${err.message})`});
       winston.getlog().error(`获取拼车信息失败(${err.message})`);

     }

   });
}
