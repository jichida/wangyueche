const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose  = require('mongoose');
const winston = require('../../log/log.js');

//todo!!!!!!!!!!!!!!!!!!!!!
let getrateuser = (userid,fnresult)=>{
  if(typeof userid !== 'string'){
    userid = userid.toString();
  }
  //从评价表中获取用户评级
  let rateModel = DBModels.RateModel;
  rateModel.aggregate([
       {$match: {'targetid':userid}},
       {$group: {
           _id: '$targetid',
           starnum: { $avg: "$ratestar" }
       }
       }],
       (err, list)=> {
         if(!err && list.length > 0){
           if(list[0]._id === userid){
             try{
               let starnum = list[0].starnum;
               starnum = parseFloat(starnum.toFixed(1));
               fnresult(starnum);
               return;
             }
             catch(e){

             }
           }
         }
         fnresult(0);
       });
}

exports.getrateuser = getrateuser;
