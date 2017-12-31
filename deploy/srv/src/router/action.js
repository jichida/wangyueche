let PubSub = require('pubsub-js');
const async = require('async');
const _ = require('lodash');
const config = require('../config.js');
let DBModels = require('../db/models.js');
let DBPlatformModels = require('../db/modelsplatform.js');
let mongoose  = require('mongoose');
const withdraw = require('../handler/driver/withdrawcash.js');
const jpushdriver = require('../smspush/pushdriver.js');
const jpushrider = require('../smspush/pushrider.js');
const moment = require('moment');

let preaction =(actionname,collectionname,doc,fnresult)=>{
  let retdoc = doc.data;
  if(actionname === 'findByIdAndUpdate' && collectionname === 'withdrawcashapply'){
    //这里需要判断很多东西，比如用户余额是否大于可提取余额
    //是否已经提取过等等
    //==============待定==============
    let userModel = DBModels.UserDriverModel;
    userModel.findOne({_id:retdoc.creator},(err,result)=>{
      if(!err && result){
        if(result.balance > retdoc.cashmoney){
          //用户余额是否大于可提取余额
          let withdrawModel = DBModels.WithdrawcashapplyModel;
          withdrawModel.findOne({_id:retdoc.id,status: { $ne: '已支付' }},(err,result)=>{
            if(!err && result){
              fnresult(null,true);
              return;
            }
            fnresult({errmessage:'已经支付过了，请勿重新操作'});
          });
          return;
        }
      }
      fnresult({errmessage:'可能用户余额不足,或找不到该用户'});
    })
    return;
  }
  if(actionname === 'save' || actionname === 'findByIdAndUpdate'){
    retdoc.UpdateTime =  moment().format('YYYY-MM-DD HH:mm:ss');
    if(collectionname === 'baseinfovehicle'){
      retdoc['CommercialType'] = 1;
    }
    else if(collectionname === 'baseinfodriver'){
      //注意：不能用=>，否则出错，不知道原因
        if(!retdoc.hasOwnProperty('TaxiDriver')){
          retdoc.TaxiDriver = false;
        }
        if(!retdoc.hasOwnProperty('FullTimeDriver')){
          retdoc.FullTimeDriver = false;
        }
        if(!retdoc.hasOwnProperty('InDriverBlacklist')){
          retdoc.InDriverBlacklist = false;
        }
        retdoc.CommercialType = 1;//1服务类型1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
    }
    else if(collectionname === 'baseinfodriverapp'){
      retdoc.MapType =  2;
    }
    else if(collectionname === 'ordercreate'){
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'ordermatch'){
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatelogin'){
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatelogout'){
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatedepart'){
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatearrive'){
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatepay'){
      retdoc.Encrypt =  2;
    }
  }

  if(actionname === 'findByIdAndUpdate' && collectionname==='userdriver'){
      let retdoc = doc.data;
      // if(retdoc.approvalstatus === '已审核'){
        //将Platform_baseInfoVehicle和Platform_baseInfoDriver存入到数据库
      const saveDriverCar = require('../handler/driver/driverandcar.js');
      let creatorid = retdoc.id;
      if(typeof creatorid === 'string'){
        creatorid =  mongoose.Types.ObjectId(creatorid);
      }
      saveDriverCar.presave_driver(retdoc,creatorid,(err,result)=>{
        fnresult(null,doc);
      });
      return;
      // }
  }

   console.log(`actionname:${actionname},collectionname:${collectionname}`);
   if(actionname === 'findByIdAndUpdate' && collectionname==='mycar'){
     let retdoc = doc.data;
     console.log(`issynctoplatform:${retdoc.issynctoplatform},retdoc.approvalstatus:${retdoc.approvalstatus}`);
    //  if(retdoc.issynctoplatform && retdoc.approvalstatus === '已审核'){
     const saveDriverCar = require('../handler/driver/driverandcar.js');
     let fnsavebaseinfovehicle = saveDriverCar.get_fnsavebaseinfovehicle(retdoc);
     fnsavebaseinfovehicle((err,result)=>{
       fnresult(null,result);
     });
     return;
    //  }
   }

   fnresult(null,doc);
}

let gettakenseatfromorder = (retdoc,fncallback)=>{
  let targetid = retdoc._id;
  if(typeof targetid === "string"){
    targetid = mongoose.Types.ObjectId(targetid);
  }
  retdoc.seatnumbertotal = 0;
  retdoc.seatnumberpaid = 0;
  retdoc.seatnumbernotpaid = 0;

  let dbModel = DBModels.TripOrderModel;
  dbModel.aggregate([
       {$match: {'buscarpoolid':targetid}},
       {$group: {
           _id: '$orderstatus',
           seatnumbertotal: { $sum: "$seatnumber" }
       }
       }],
       (err, list)=> {

          console.log(`postaction===========>${JSON.stringify(list)}`);
         _.map(list,(item)=>{
           if(item._id === '未支付'){
             retdoc.seatnumbernotpaid = item.seatnumbertotal;
             console.log(`doc.seatnumbernotpaid===========>${retdoc.seatnumbernotpaid}`);
           }
           else if(item._id === '已支付'){
             retdoc.seatnumberpaid  = item.seatnumbertotal;
             console.log(`doc.seatnumberpaid===========>${retdoc.seatnumberpaid}`);
           }
         });
         retdoc.seatnumbertotal =  retdoc.seatnumbernotpaid + retdoc.seatnumberpaid;
         console.log(`doc.seatnumbertotal===========>${retdoc.seatnumbertotal}`);
         console.log(`postaction===========>${JSON.stringify(retdoc)}`);
         fncallback(null,retdoc);
       });
}

let postaction = (actionname,collectionname,doc,fncallback)=>{
  // let retdoc = _.extend(doc,{
  //   seatnumbertotal:0,
  //   seatnumberpaid:0,
  //   seatnumbernotpaid:0
  // });
  let retdoc = doc;
  console.log(`retdoc===========>${JSON.stringify(retdoc)}`);
  if(actionname === 'findByIdAndUpdate' && collectionname === 'withdrawcashapply'){
    if(doc.status === '已支付' || doc.status === '已拒绝'){
      withdraw.withdrawcashapplypaid(doc,(err,result)=>{
          console.log("withdrawcashapplypaid err======>" + JSON.stringify(err));
          console.log("withdrawcashapplypaid result======>" + JSON.stringify(result));
      });
    }
  }

  if(actionname === 'save' || actionname === 'findByIdAndUpdate'){
    if(collectionname === 'baseinfocompany'){
      //转换doc
    }
  }

  if(collectionname==='notifymessage'){
      if(actionname=== 'save' || actionname === 'findByIdAndUpdate'){

        if(doc.messagetype === 'all' || doc.messagetype === 'rider'){
          jpushrider.sendnotifymessage(doc,(err,result)=>{
             //设置推送消息：
             console.log(`设置推送消息：err:${JSON.stringify(err)}`);
             console.log(`设置推送消息：result:${JSON.stringify(result)}`);
          });
        }
        if(doc.messagetype === 'all' || doc.messagetype === 'driver'){
          jpushdriver.sendnotifymessage(doc,(err,result)=>{
             //设置推送消息：
             console.log(`设置推送消息：err:${JSON.stringify(err)}`);
             console.log(`设置推送消息：result:${JSON.stringify(result)}`);
          });
        }
      }
  }

  //司机审核通过／拒绝要发送短信通知
  if(actionname === 'findByIdAndUpdate' && collectionname==='userdriver'){
    // if(retdoc.issynctoplatform){
      if(retdoc.approvalstatus === '已审核' || retdoc.approvalstatus === '已拒绝' ){
        //将Platform_baseInfoVehicle和Platform_baseInfoDriver存入到数据库
        const sms = require('../smspush/sms.js');
        sms.sendsmstouser(retdoc.username,retdoc.approvalstatus === '已审核'?
        'driver_isapprovaledtrue':'driver_isapprovaledfalse','',(err,result)=>{
          console.log(`发送短信通知:${JSON.stringify(result)}`);
        });
        fncallback(null,retdoc);
        return;
      }
    // }
  }
  if(collectionname === 'buscarpool'){
      if(actionname === 'findById'){
        gettakenseatfromorder(retdoc,fncallback);
        return;
    }
    else if(actionname === 'paginate'){
      let asyncfnsz = [];
      _.map(retdoc.docs,(item,index)=>{
        let fn = (fncallback)=>{
          item = item.toJSON();
          retdoc.docs[index] = item;
          gettakenseatfromorder(item,(err,result)=>{
            console.log(`gettakenseatfromorder,result===>${JSON.stringify(result)}`);
            fncallback(err,result);
          });
        }
        asyncfnsz.push(fn);
      });

      async.parallel(asyncfnsz,fncallback);
      return;
    }
  }
  fncallback(null,retdoc);
  PubSub.publish('platformmessage_upload',{
    action:actionname,//'findByIdAndUpdate',
    collectionname:collectionname,//'baseinfocompany',
    doc:retdoc
  });
}


exports.gettakenseatfromorder  = gettakenseatfromorder;
exports.preaction = preaction;
exports.postaction = postaction;
