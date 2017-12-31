const async = require('async');
const PubSub = require('pubsub-js');
const moment = require('moment');
const geolib = require('geolib');
const dbplatform = require('../../db/modelsplatform.js');
const _ = require('lodash');

const fn_getOrderCount = (monthtimestring,callbackfn)=>{
  //根据LicenseId 统计 ordermatch
  //DistributeTime
  const monthtime = moment(monthtimestring).format('YYYY-MM-01 00:00:00');
  const nextmonthtime = moment(monthtime).add(1, 'months').format('YYYY-MM-01 00:00:00');
  const dbModel = dbplatform.Platform_orderMatchModel;
  const query = {
    DistributeTime:{
      $gte: monthtime,
      $lt: nextmonthtime,
    }
  };

  console.log(`fn_getOrderCount--->query ${JSON.stringify(query)}`);
  dbModel.aggregate([
       {$match:query},
       {$group: {
           _id: '$LicenseId',
           count: { $sum: 1 },
       }
       }],
       (err, list)=> {
         console.log(`fn_getOrderCount--->${JSON.stringify(list)}`);
         //[{"_id":"BBB","count":2},{"_id":"","count":2},{"_id":"AAA","count":3}]
         let result = {};
         if(!err && !!list){
           _.map(list,(v)=>{
             if(v._id !== ''){
               result[v._id] = v.count;
             }
           });
         }
         callbackfn(result);
       });
}

const fn_getComplainedCount = (monthtimestring,callbackfn)=>{
  //根据LicenseId 统计 ratedPassengerComplaint
  //ComplaintTime
  const monthtime = moment(monthtimestring).format('YYYY-MM-01 00:00:00');
  const nextmonthtime = moment(monthtime).add(1, 'months').format('YYYY-MM-01 00:00:00');

  const dbModel = dbplatform.Platform_ratedPassengerComplaintModel;
  const query = {
    ComplaintTime:{
      $gte: monthtime,
      $lt: nextmonthtime,
    }
  };
  console.log(`fn_getComplainedCount--->query ${JSON.stringify(query)}`);
  dbModel.aggregate([
       {$match:query},
       {$group: {
           _id: '$LicenseId',
           count: { $sum: 1 },
       }
       }],
       (err, list)=> {
         let result = {};
         if(!err && !!list){
           _.map(list,(v)=>{
             if(v._id !== ''){
               result[v._id] = v.count;
             }
           });
         }
         console.log(`fn_getComplainedCount--->${JSON.stringify(list)}`);
         callbackfn(result);
       });

}

const fn_setbaseInfoDriverStat = (updateddata,callbackfn)=>{
  const dbModel = dbplatform.Platform_baseInfoDriverStatModel;
  dbModel.findOneAndUpdate({LicenseId:updateddata.LicenseId},
    {
      $set:updateddata
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
};

const interval_baseInfoDriverStat = ()=>{
  // let Platform_baseInfoDriverStatSchema= new Schema({
  //   CompanyId:String,	//		是	字符型V32	公司标识
  //   Address:Number,//	是数字型F6注册地行政区划代码车辆在平台的注册地， 见 GB/T2260
  //   LicenseId:String,	//		是	字符型V32	机动车驾驶证编号
  //   Cycle:Number,//	 是 数字型 F6统计周期统计周期按月 ，内容填 写统计月份 ，数据格式 YYYYMM
  //   OrderCount:Number,//		是	数字型 VIO	完成订单次数
  //   TafficViolationCount:Number,//		是	数字型V32	交通违章次数
  //   ComplainedCount:Number,//		是	数字型V32	被投诉次数
  //   Flag:Number,//	 是 数字型 Fl操作标识1:新增2 :更新3 :删除
  //   UpdateTime:String,//	是数字型F14更新时间网约车平台完成数据更 新的时间YYYYMMDDhhmmss
  // });
  const curmoment = moment();
  const monthtime = curmoment.format('YYYY-MM-01 00:00:00');
  const fn1 = (callbackfn)=>{
    fn_getOrderCount(monthtime,(result)=>{
      callbackfn(null,result);
    });
  }

  const fn2 = (callbackfn)=>{
    fn_getComplainedCount(monthtime,(result)=>{
      callbackfn(null,result);
    });
  }

  let asyncfnsz = [fn1,fn2];
  async.parallel(asyncfnsz,(err,result)=>{
      let resultobj = {};
      if(!err){
        let result0 = result[0];
        let result1 = result[1];
        _.map(result0,(v,k)=>{
          resultobj[k] = {
            LicenseId:k,
            OrderCount:v,
            Cycle:parseInt(curmoment.format('YYYYMM'))
          }
        });

        _.map(result1,(v,k)=>{
          let tmp = resultobj[k];
          if(!tmp){
            tmp = {
              LicenseId:k,
              ComplainedCount:v,
              Cycle:parseInt(curmoment.format('YYYYMM'))
            }
          }
          else{
            tmp.ComplainedCount = v;
          }
          tmp.TafficViolationCount = 0;

          resultobj[k] = tmp;
        });

        console.log(`合并后--->${JSON.stringify(resultobj)}`);
        _.map(resultobj,(updateddata)=>{
            fn_setbaseInfoDriverStat(updateddata,(result)=>{
              if(!!result){
                PubSub.publish('platformmessage_upload',{
                  action:'findByIdAndUpdate',//'findByIdAndUpdate',
                  collectionname:'baseinfodriverstat',//'baseinfocompany',
                  doc:result
                });
              }
            });
        });
      }
  });

}

module.exports = interval_baseInfoDriverStat;
