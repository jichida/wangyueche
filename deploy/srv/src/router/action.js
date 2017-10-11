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

let preaction =(actionname,collectionname,doc,fnresult)=>{
  if(actionname === 'findByIdAndUpdate' && collectionname === 'withdrawcashapply'){
    let retdoc = doc.data;
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
    let retdoc = doc.data;
    if(collectionname === 'baseinfocompany'){
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfocompanystat'){
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfocompanypay'){
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfocompanyservice'){
      if (typeof retdoc.CreateDate === 'string') {
        retdoc.CreateDate = new Date(Date.parse(retdoc.CreateDate));
      }
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfocompanypermit'){
      if (typeof retdoc.StartDate === 'string') {
        retdoc.StartDate = new Date(Date.parse(retdoc.StartDate));
      }
      if (typeof this.StopDate === 'string') {
        retdoc.StopDate = new Date(Date.parse(retdoc.StopDate));
      }
      if (typeof this.CertifyDate === 'string') {
        retdoc.CertifyDate = new Date(Date.parse(retdoc.CertifyDate));
      }
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfocompanyfare'){
      if (typeof retdoc.FareValidOn === 'string') {
        retdoc.FareValidOn = new Date(Date.parse(retdoc.FareValidOn));
      }
      if (typeof retdoc.FareValidOff === 'string') {
        retdoc.FareValidOff = new Date(Date.parse(retdoc.FareValidOff));
      }
      // retdoc.FareValidOn = util.gettimeformat(retdoc.FareValidOn);
      // retdoc.FareValidOff = util.gettimeformat(retdoc.FareValidOff);
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfovehicle'){
      if (typeof retdoc.CertifyDateA === 'string') {
        retdoc.CertifyDateA = new Date(Date.parse(retdoc.CertifyDateA));
      }
      if (typeof retdoc.TransDateStart === 'string') {
        retdoc.TransDateStart = new Date(Date.parse(retdoc.TransDateStart));
      }
      if (typeof retdoc.TransDateStop === 'string') {
        retdoc.TransDateStop = new Date(Date.parse(retdoc.TransDateStop));
      }
      if (typeof retdoc.CertifyDateB === 'string') {
        retdoc.CertifyDateB = new Date(Date.parse(retdoc.CertifyDateB));
      }
      if (typeof retdoc.GPSlnstallDate === 'string') {
        retdoc.GPSlnstallDate = new Date(Date.parse(retdoc.GPSlnstallDate));
      }
      retdoc['Commercial-Type'] = 1;
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfovehiclelnsurance'){
      if (typeof retdoc.InsurEff === 'string') {
        retdoc.InsurEff = new Date(Date.parse(retdoc.InsurEff));
      }
      if (typeof this.InsurExp === 'string') {
        retdoc.InsurExp = new Date(Date.parse(retdoc.InsurExp));
      }
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfovehicletotalmile'){
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfodriver'){
      //注意：不能用=>，否则出错，不知道原因
        if (typeof retdoc.DriverBirthday === 'string') {
          retdoc.DriverBirthday = new Date(Date.parse(retdoc.DriverBirthday));
        }
        if (typeof retdoc.GetDriverLicenseDate === 'string') {
          retdoc.GetDriverLicenseDate = new Date(Date.parse(retdoc.GetDriverLicenseDate));
        }
        if (typeof retdoc.DriverLicenseOn === 'string') {
          retdoc.DriverLicenseOn = new Date(Date.parse(retdoc.DriverLicenseOn));
        }
        if (typeof retdoc.DriverLicenseOff === 'string') {
          retdoc.DriverLicenseOff = new Date(Date.parse(retdoc.DriverLicenseOff));
        }
        if(!retdoc.hasOwnProperty('TaxiDriver')){
          retdoc.TaxiDriver = false;
        }
        if (typeof retdoc.NetworkCarIssueDate === 'string') {
          retdoc.NetworkCarIssueDate = new Date(Date.parse(retdoc.NetworkCarIssueDate));
        }
        if (typeof retdoc.GetNetworkCarProofDate === 'string') {
          retdoc.GetNetworkCarProofDate = new Date(Date.parse(retdoc.GetNetworkCarProofDate));
        }
        if (typeof retdoc.NetworkCarProofOn === 'string') {
          retdoc.NetworkCarProofOn = new Date(Date.parse(retdoc.NetworkCarProofOn));
        }
        if (typeof retdoc.NetworkCarProofOff === 'string') {
          retdoc.NetworkCarProofOff = new Date(Date.parse(retdoc.NetworkCarProofOff));
        }
        if (typeof retdoc.RegisterDate === 'string') {
          retdoc.RegisterDate = new Date(Date.parse(retdoc.RegisterDate));
        }
        if(!retdoc.hasOwnProperty('FullTimeDriver')){
          retdoc.FullTimeDriver = false;
        }
        if(!retdoc.hasOwnProperty('InDriverBlacklist')){
          retdoc.InDriverBlacklist = false;
        }
        if (typeof retdoc.ContractOn === 'string') {
          retdoc.ContractOn = new Date(Date.parse(retdoc.ContractOn));
        }
        if (typeof retdoc.ContractOff === 'string') {
          retdoc.ContractOff = new Date(Date.parse(retdoc.ContractOff));
        }
        retdoc.CommercialType = 1;//1服务类型1.网络预约出租汽车2 .巡游出租汽车3 :私人小客车合乘
        retdoc.UpdateTime =  new Date();
      }
    else if(collectionname === 'baseinfodrivereducate'){
      if (typeof retdoc.CourseDate === 'string') {
        retdoc.CourseDate = new Date(Date.parse(retdoc.CourseDate));
      }
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfodriverapp'){
      retdoc.MapType =  2;
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfodriverstat'){
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'baseinfopassenger'){
      if (typeof retdoc.RegisterDate === 'string') {
        retdoc.RegisterDate = new Date(Date.parse(retdoc.RegisterDate));
      }
      retdoc.UpdateTime =  new Date();
    }
    else if(collectionname === 'ordercreate'){
      if (typeof retdoc.DepartTime === 'string') {
        retdoc.DepartTime = new Date(Date.parse(retdoc.DepartTime));
      }
      if (typeof retdoc.OrderTime === 'string') {
        retdoc.OrderTime = new Date(Date.parse(retdoc.OrderTime));
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'ordermatch'){
      if (typeof retdoc.DistributeTime === 'string') {
        retdoc.DistributeTime = new Date(Date.parse(retdoc.DistributeTime));
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'ordercancel'){
      if (typeof retdoc.OrderTime === 'string') {
        retdoc.OrderTime = new Date(Date.parse(retdoc.OrderTime));
      }
      if (typeof retdoc.CancelTime === 'string') {
        retdoc.CancelTime = new Date(Date.parse(retdoc.CancelTime));
      }
    }
    else if(collectionname === 'operatelogin'){
      if (typeof retdoc.LoginTime === 'string') {
        retdoc.LoginTime = new Date(Date.parse(retdoc.LoginTime));
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatelogout'){
      if (typeof retdoc.LogoutTime === 'string') {
        retdoc.LogoutTime = new Date(Date.parse(retdoc.LogoutTime));
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatedepart'){
      if (typeof retdoc.DepTime === 'string') {
        retdoc.DepTime = new Date(Date.parse(retdoc.DepTime));
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatearrive'){
      if (typeof retdoc.DestTime === 'string') {
        retdoc.DestTime = new Date(Date.parse(retdoc.DestTime));
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'operatepay'){
      if (typeof retdoc.BookDepTime === 'string') {
        retdoc.BookDepTime = new Date(Date.parse(retdoc.BookDepTime));
      }
      if (typeof retdoc.DepTime === 'string') {
        retdoc.DepTime = new Date(Date.parse(retdoc.DepTime));
      }
      if (typeof retdoc.DestTime === 'string') {
        retdoc.DestTime = new Date(Date.parse(retdoc.DestTime));
      }
      if (typeof this.PayTime === 'string') {
        retdoc.PayTime = new Date(Date.parse(retdoc.PayTime));
      }
      if (typeof retdoc.OrderMatchTime === 'string') {
        retdoc.OrderMatchTime = new Date(Date.parse(retdoc.OrderMatchTime));
      }
      retdoc.Encrypt =  2;
    }
    else if(collectionname === 'baseinfodriverstat'){
      if (typeof retdoc.PositionTime === 'string') {
        retdoc.PositionTime = new Date(Date.parse(retdoc.PositionTime));
      }
    }
    else if(collectionname === 'positiondriver'){
      if (typeof retdoc.PositionTime === 'string') {
        retdoc.PositionTime = new Date(Date.parse(retdoc.PositionTime));
      }
    }
    else if(collectionname === 'positionvehicle'){
      if (typeof retdoc.PositionTime === 'string') {
        retdoc.PositionTime = new Date(Date.parse(retdoc.PositionTime));
      }
    }
    else if(collectionname === 'ratedpassenger'){
      if (typeof retdoc.EvaluateTime === 'string') {
        retdoc.EvaluateTime = new Date(Date.parse(retdoc.EvaluateTime));
      }
    }
    else if(collectionname === 'ratedpassengercomplaint'){
      if (typeof retdoc.ComplaintTime === 'string') {
        retdoc.ComplaintTime = new Date(Date.parse(retdoc.ComplaintTime));
      }
    }
    else if(collectionname === 'rateddriverpunish'){
      if (typeof retdoc.PunishTime === 'string') {
        retdoc.PunishTime = new Date(Date.parse(retdoc.PunishTime));
      }
    }
    else if(collectionname === 'rateddriver'){
      if (typeof retdoc.TestDate === 'string') {
        retdoc.TestDate = new Date(Date.parse(retdoc.TestDate));
      }
    }
  }

  if(actionname === 'findByIdAndUpdate' && collectionname==='userdriver'){
    let retdoc = doc.data;
    if(retdoc.issynctoplatform && retdoc.approvalstatus === '已审核'){
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
    }
  }

   console.log(`actionname:${actionname},collectionname:${collectionname}`);
   if(actionname === 'findByIdAndUpdate' && collectionname==='mycar'){
     let retdoc = doc.data;
     console.log(`issynctoplatform:${retdoc.issynctoplatform},retdoc.approvalstatus:${retdoc.approvalstatus}`);
     if(retdoc.issynctoplatform && retdoc.approvalstatus === '已审核'){
       const saveDriverCar = require('../handler/driver/driverandcar.js');
       let fnsavebaseinfovehicle = saveDriverCar.get_fnsavebaseinfovehicle(retdoc);
       fnsavebaseinfovehicle((err,result)=>{
         fnresult(null,result);
       });
       return;
     }
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
    if(retdoc.issynctoplatform){
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
    }
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
