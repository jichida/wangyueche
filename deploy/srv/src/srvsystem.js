const config = require('./config');
let mongoose = require('mongoose');
let winston = require('./log/log.js');
let DBModels = require('./db/models.js');
var schedule = require('node-schedule');
let PubSub = require('pubsub-js');
const _ = require('lodash');
const city = require('./util/city.js');
let DBPlatformModels = require('./db/modelsplatform.js');

let setRequestExpired = ()=>{
  let TripRequestModel = DBModels.TripRequestModel;
  let nowDate = new Date();
  let min2Ago = new Date(nowDate.getTime() - 1000 * 60 * config.expRequestMinutes);

  TripRequestModel.find({
      'created_at': { // 18 minutes ago (from now)
          $lte: min2Ago
       },
       'requeststatus':'请求中'
     },(err,result)=>{

       let requestidlist = [];
       if(!err && result){

         if(result.length > 0){
           result.forEach((reqobj)=>{
             requestidlist.push(reqobj._id);
           });
           TripRequestModel.update({_id:{$in:requestidlist}},{ $set:{'requeststatus':'已取消'}},{multi: true},(err,res)=>{
                if(!err){
                  result.forEach((reqobj)=>{
                    reqobj.requeststatus = '已取消';
                    PubSub.publish('currentrequest.' + reqobj._id, reqobj);
                    PubSub.publish('request.' + reqobj._id, reqobj);//通知所有司机端更新该请求状态
                  });
                }
            });
         }
       }

     });

};

let createadmin = ()=>{
  let userModel = DBModels.UserAdminModel;
  userModel.findOne({username: 'admin'}, (err, adminuser)=> {
    if(!err && !adminuser) {
        adminuser = {
          username:'admin',
          password: 'admin'
        };
        let entity = new userModel(adminuser);
        entity.save((err)=> {
        });
    }
  });
};

// let getsystemconfig =()=>{
//   let systemconfigModel = mongoose.model('SystemConfig', DBModels.SystemConfigSchema);
//   systemconfigModel.findOne({}, (err, sysconfig)=> {
//     if(!err && sysconfig) {
//       setfaretypemap
//     }
//   });
// }

let setconfigfile = ()=>{
    //设置运价信息
    let dbModel = DBModels.FareTypeModel;
    dbModel.find({},(err,list)=>{
      if(!err && list){
        let faretypemap = {};
        _.map(list,(record)=>{
          faretypemap[record.registertype] = record._id;
        });
        config.setfaretypemap(faretypemap);
      }
    });

    let dbModelCompany = DBPlatformModels.Platform_baseInfoCompanyModel;
    dbModelCompany.findOne({},(err,result)=>{
        if(!err && result){
          config.setcompanyandaddress(result.Companyld,result.Address);
        }
    });
    //设置平台公司信息
    //setcompanyandaddress
};
let dbs = require('./db/index.js');
let platform = require('./platform/index');
let initplatform =()=>{
  // let siglerecordfixedcollections = [
  //   'baseinfocompany',
  //   'baseinfocompanystat',
  //   'baseinfocompanyservice',
  //   'baseinfocompanypermit',
  //   'baseinfovehicletotalmile',
  //   'baseinfodriverstat',
  // ];
  // siglerecordfixedcollections.forEach((item)=>{
  //   let dbInfo = dbs[item];
  //   let dbModel = mongoose.model(dbInfo.collectionname, dbInfo.schema);
  //   dbModel.findOne({}, (err, entityempty)=> {
  //     if(!err && !entityempty) {
  //         entityempty = {
  //           Companyld:config.Companyld
  //         };
  //         let entity = new dbModel(entityempty);
  //         entity.save((err)=> {
  //         });
  //     }
  //   });
  // });
    platform.startplatformmonitor();
}

//
// let test = ()=>{
//   let actionfun =(obj,callfn)=>{
//     let retdoc = obj;
//     retdoc.seatnumbertotal = 0;
//     retdoc.seatnumberpaid = 0;
//     retdoc.seatnumbernotpaid = 0;
//     obj = retdoc;
//     console.log(`retdoc:${JSON.stringify(retdoc)}`);
//     callfn(null,retdoc);
//   }
//
//   let obj = {
//     "_id" :"59085ee59455981a987b1058",
//     "isenabled" : true,
//     "pinchetype" : "专线",
//     "startcity" : "南京",
//     "endcity" : "上海",
//     "seatnumber" : 10,
//     "__v" : 0,
//     "userlist" : [],
//     "endstations" : [
//         "总站",
//         "分站2"
//     ],
//     "startstations" : [
//         "总站",
//         "分站"
//     ],
//     "carpoolprice" : {
//         "分站" : {
//             "分站2" : 50,
//             "总站" : 50
//         },
//         "总站" : {
//             "分站2" : 30,
//             "总站" : 50
//         }
//     }
// };
//   let dbModel = DBModels.BuscarpoolModel;
//   dbModel.paginate({},{},(err,result)=>{
//     //result = result.toJSON(); //turns it into JSON YAY!
//     actionfun(result,(err,resultnew)=>{
//       console.log(`========>result:${JSON.stringify(result)}`);
//       console.log(`========>result:${JSON.stringify(resultnew)}`);
//     });
//   });
//   // dbModel.findById('59085ee59455981a987b1058',(err,result)=>{
//   //   result = result.toJSON(); //turns it into JSON YAY!
//   //   actionfun(result,(err,resultnew)=>{
//   //     console.log(`========>result:${JSON.stringify(result)}`);
//   //     console.log(`========>result:${JSON.stringify(resultnew)}`);
//   //   });
//   // });
// }

let setmycouponsexpired = ()=>{
  let nowDate = new Date();
  let myCouponModel = DBModels.MyCouponModel;
  myCouponModel.update({
      'expdate': { // 小于今天
         '$lte': nowDate
      },
      'usestatus':'未使用'
  },{$set:{usestatus:'已过期'}},(err,result)=>{
      //winston.getlog().info(`设置优惠券过期:${JSON.stringify(result)}`);
  });
};

let job=()=>{
  //test();
  city.initcitymap();
  //建立索引
  DBModels.TripRequestSchema.index({ srclocation: '2dsphere' });

  setconfigfile();
  //判断admin是否有数据...
  createadmin();

  initplatform();
  //自动备份等
  //定时处理请求为无效
  var j = schedule.scheduleJob('*/1 * * * *', ()=>{
    //console.log('每隔一分钟执行这里!');
    setRequestExpired();
  });

  //优惠券自动过期
  setmycouponsexpired();//设置优惠券自动过期
  schedule.scheduleJob('0 0 * * *', ()=>{
    //每天0点更新优惠券过期信息
    setmycouponsexpired();
  });
};

exports.job = job;
