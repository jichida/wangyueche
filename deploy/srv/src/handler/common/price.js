let mongoose     = require('mongoose');
const moment  = require('moment');
const async = require('async');
const blueimp = require('blueimp-tmpl');

const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let dbplatform = require('../../db/modelsplatform.js');
const util = require('../../platform/util');
const winston = require('../../log/log.js');


let getstringofdistance = (leftdistance)=>{
  let leftdistancetxt = '';
  if(leftdistance >= 1000){
    leftdistancetxt = (leftdistance/1000) + '公里';
  }
  else{
    leftdistancetxt = leftdistance + '米';
  }
  return leftdistancetxt;
};


const getstringoftime=(leftduring)=>{
  let leftduringtxt = '';
  if(leftduring >= 60){
    leftduringtxt = leftduring/60 + '分';
  }
  else{
    leftduringtxt = leftduring + '秒';
  }
  return leftduringtxt;
}

/*
 triptype:'快车',
 fareid:'58da12b971983947079ae4f8'
* */
let getBaseInfoCompanyFareList = (param= {
  curtime:new Date(),
  triptype:'快车',
},callback)=>{
  let curtime = param.curtime || new Date();
  let curtimeformatted = curtime;
  if (typeof curtimeformatted === 'string') {
    curtimeformatted = new Date(Date.parse(curtimeformatted));
  }
  let faretype = config.faretypemap[param.triptype];
  let fareModel = dbplatform.Platform_baseInfoCompanyFareModel;
  const query = {
    $and: [
      {FareType:faretype},
      {FareValidOn: {$lte: curtimeformatted}},
      {FareValidOff:{$gte: curtimeformatted}}
    ]
  };
  fareModel.find(query,(err,resultlist)=> {
    if(!err){
      callback(err,resultlist);
    }
    else{
      callback(err,null);
      winston.getlog().error(`注意！getBaseInfoCompanyFareList找不到运价${faretype},查询条件:${JSON.stringify(query)}`);
    }

  });
};
/*
 * 输入参数：里程、耗时、当前时间、注册类型
 * 输出参数：价格、价格详细字符串
 *
 *
 *
 *
 * */
// let Platform_baseInfoCompanyFareSchema = new Schema({
//   Companyld:String,
//   Address:Number,
//   FareType:String,//	是	字符型	V16	运价类型编码	由网约车平台公司统一 编码，应确保唯一性
//   FareTypeNote:String,//	否	字符型	V128	运价类型说明
//   FareValidOn:Date,//	是	数字型	F14	运价有效期起	YYYYMMDDhhmmss<---
//   FareValidOff:Date,//	否	数字型	F14	运价有效期止	YYYYMMDDhhmmss<---
//   StartFare:Number,//	是	数字型	VIO	起步价	单位:元 元素名称	必选	类型	长度	字段名称	描	述<---
//   StartMile:Number,//	是	数字型	VIO	起步里程	单位 :km<---
//   UnitPricePerMile:Number,//	是	数字型	VIO	计程单价〈按公里〉	单位 :元<---
//   UnitPricePerMinute:Number,//	是	数字型	VIO	计时单价 (按分钟)	单位 :元<---
//   UpPrice:Number,//	否	数字型	VIO	单程加价单价	单位 :元
//   UpPriceStartMile:Number,//	否	数字型	V10	单程加价公里	单位 :km
//
//   MorningPeakTimeOn:String,//	是	字符型	V8	营运早高峰时间起	HHmm(24 小时〉 <---
//   MorningPeakTimeOff:String,//	是	字符型	V8	营运早高峰时间止	HHmm(24 小时〉<---
//   EveningPeakTimeOn:String,//	是	字符型	V8	营运晚高峰时间起	HHmm(24 小时〉<---
//   EveningPeakTimeOff:String,//	是	字符型 营运晚高峰时间止<---
//   OtherPeakTimeOn:String,//	否	字符型	V8	其他营运高峰时间起	HHmm(24 小时)<---
//   OtherPeakTimeOff:String,//	否	字符型	V8	其他营运高峰时间止	HHmm(24 小时)<---
//   PeakUnitPrice:Number,//	是	数字型	VIO	高峰时间单程加价单价	单位 z 元
//   PeakPriceStartMile:Number,//	是	数字型	V10	高峰时间单程加价公里	单位 :km
//   LowSpeedPricePerMinute:Number,//	否	数字型	V10	低速计时加价(按分 钟)	单位 z 元
//   NightPricePerMile:Number,//	否	数字型	VIO	夜间费〈按公里)	单位:元
//   NightPricePerMinute:Number,//	否	数字型	V10	夜间费〈按分钟)	单位:元
//   OtherPrice:Number,//	否	数字型	V10	其它加价金额	单位:元
//   State:Number,//	是	数字型	F1	状态	0 :有效1.失效
//   UpdateTime:Date,//	是	数字型	F14	更新时间	网约车平台完成数据更 新的时间 YYYYMMDDhhmmss
//   Flag:Number,// 是	数字型	F1	操作标识	1.新增2 :更新3.删除
// });
let getBaseInfoCompanyFare = (param={
  distance:0,
  during:0,
  curtime:new Date(),
  fareid:'58da12b971983947079ae4f8'
},callback)=>{
  let curtime = param.curtime || new Date();
  let curtimeformatted = curtime;
  if (typeof curtimeformatted === 'string') {
    curtimeformatted = new Date(Date.parse(curtimeformatted));
  }
  let fareModel = dbplatform.Platform_baseInfoCompanyFareModel;
  fareModel.findOne({_id:param.fareid},(err,baseInfoCompanyFare)=>{
    if(!err && baseInfoCompanyFare){
      let price = 0 ;
      let pricestringdebug = '';
      let pricestringdetail = '';
      let pricelistdetail = [];
      let totalkm = Math.ceil(param.distance/1000);
      let totalduringminute = Math.ceil(param.during/60);

      let calcUnitPricePerMile = baseInfoCompanyFare.UnitPricePerMile;
      let calcUnitPricePerMinute = baseInfoCompanyFare.UnitPricePerMinute;
      pricestringdebug += `计程单价${calcUnitPricePerMile.toFixed(2)}元,计时单价${calcUnitPricePerMinute.toFixed(2)}元.`;
      pricestringdebug += `实际里程${totalkm.toFixed(2)}km,实际耗时${totalduringminute.toFixed(2)}分钟.`;
      if(totalkm < baseInfoCompanyFare.StartMile){
         //里程太少，按起步里程算！
        totalkm = baseInfoCompanyFare.StartMile;
        pricestringdebug += `【里程】里程太少,按起步里程${baseInfoCompanyFare.StartMile.toFixed(2)}km后为${totalkm.toFixed(2)}km.`;
      }

        let isinpeak  = false;
        let timehhmm = moment(curtimeformatted).format("HH:mm");
        if(timehhmm > baseInfoCompanyFare.MorningPeakTimeOn && timehhmm < baseInfoCompanyFare.MorningPeakTimeOff){
          pricestringdebug += `当前${timehhmm}处于早高峰时段${baseInfoCompanyFare.MorningPeakTimeOn}~${baseInfoCompanyFare.MorningPeakTimeOff}.`;
          isinpeak = true;
        }

        if(timehhmm > baseInfoCompanyFare.EveningPeakTimeOn && timehhmm < baseInfoCompanyFare.EveningPeakTimeOff){
          pricestringdebug += `当前${timehhmm}处于晚高峰时段${baseInfoCompanyFare.EveningPeakTimeOn}~${baseInfoCompanyFare.EveningPeakTimeOff}.`;
          isinpeak = true;
        }

        if(timehhmm > baseInfoCompanyFare.OtherPeakTimeOn && timehhmm < baseInfoCompanyFare.OtherPeakTimeOff){
          pricestringdebug += `当前${timehhmm}处于自定义高峰时段${baseInfoCompanyFare.OtherPeakTimeOn}~${baseInfoCompanyFare.OtherPeakTimeOff}.`;
          isinpeak = true;
        }

        if(baseInfoCompanyFare.UpPrice > 0){//	否	数字型	VIO	单程加价单价	单位 :元
          calcUnitPricePerMile+=baseInfoCompanyFare.UpPrice;
          pricestringdebug += `【里程单价】设置单程加价单价:${baseInfoCompanyFare.UpPrice.toFixed(2)}元后为:${calcUnitPricePerMile.toFixed(2)}元.`;
        }



      if(baseInfoCompanyFare.UpPriceStartMile > 0){
          totalkm += baseInfoCompanyFare.UpPriceStartMile;
          pricestringdebug += `【里程】加:设置里程${baseInfoCompanyFare.UpPriceStartMile.toFixed(2)}km后为:${totalkm.toFixed(2)}km.`;
        }

        if(isinpeak){
          if(baseInfoCompanyFare.PeakPriceStartMile > 0){//	是	数字型	V10	高峰时间单程加价公里	单位 :km
            totalkm += baseInfoCompanyFare.PeakPriceStartMile;
            pricestringdebug += `【里程】高峰期加:设置里程${baseInfoCompanyFare.PeakPriceStartMile.toFixed(2)}km后为:${totalkm.toFixed(2)}km.`;
          }

          if(baseInfoCompanyFare.PeakUnitPrice > 0){//PeakUnitPrice:Number,//	是	数字型	VIO	高峰时间单程加价单价	单位 z 元
            calcUnitPricePerMile+=baseInfoCompanyFare.PeakUnitPrice;
            pricestringdebug += `【里程单价】高峰期计程单价加:${baseInfoCompanyFare.PeakUnitPrice.toFixed(2)}元后为:${calcUnitPricePerMile}元.`;
          }

        }
        pricestringdebug += `======华丽的分割线=======\n`;
        pricestringdebug += `【里程】:${totalkm.toFixed(2)}km【耗时】:${totalduringminute.toFixed(2)}分钟【里程单价】:${calcUnitPricePerMile.toFixed(2)}元【计时单价】:${calcUnitPricePerMinute.toFixed(2)}元`;
        price = totalkm*calcUnitPricePerMile + totalduringminute*calcUnitPricePerMinute;
        pricestringdebug += `\n【总费用】:${price.toFixed(2)}`;
        pricestringdetail += `里程【${totalkm.toFixed(2)}】km\t【${(totalkm*calcUnitPricePerMile).toFixed(2)}】元\n时长费【${totalduringminute.toFixed(2)}】分钟\t【${(totalduringminute*calcUnitPricePerMinute).toFixed(2)}】元\n
        总费用【${price.toFixed(2)}】元`;

        if(price >=  baseInfoCompanyFare.StartFare){
          pricelistdetail.push({
            name:`里程【${totalkm.toFixed(2)}】公里`,
            fee:`【${(totalkm*calcUnitPricePerMile).toFixed(2)}】元`
          });
          pricelistdetail.push({
            name:`时长费【${totalduringminute.toFixed(2)}】分钟`,
            fee:`【${(totalduringminute*calcUnitPricePerMinute).toFixed(2)}】元`
          });
          pricelistdetail.push({
            name:`总费用`,
            fee:`【${price.toFixed(2)}】元`
          });
        }
        else{
          price = baseInfoCompanyFare.StartFare;
          pricelistdetail.push({
            name:`总费用【最低消费】`,
            fee:`【${price.toFixed(2)}】元`
          });
        }

        callback(null,{
          price:price.toFixed(2),
          fareid:param.fareid,
          pricelistdetail,
          // pricestringdetail:pricestringdetail,
          // pricestringdebug:pricestringdebug,
          totalkm:totalkm.toFixed(2),
          calcUnitPricePerMile:calcUnitPricePerMile.toFixed(2),
          totalduringminute:totalduringminute.toFixed(2),
          calcUnitPricePerMinute:calcUnitPricePerMinute.toFixed(2)
        });
    }
    else{
      winston.getlog().error(`注意！getBaseInfoCompanyFare找不到运价${param.fareid}`);
      callback(`找不到运价${param.fareid}`,null);
    }

  });
}
exports.getBaseInfoCompanyFareList = getBaseInfoCompanyFareList;
exports.getBaseInfoCompanyFare = getBaseInfoCompanyFare;
    /*
    * 输入参数：里程、耗时、当前时间、对应运单
    * 输出参数：价格、价格详细字符串
    *
    *
    *
    * */
let getprice= (param,callback)=>{
  let curtime = new Date();
  getBaseInfoCompanyFareList({triptype:param.registertype,curtime},(err,result)=>{
    if(!err && result.length > 0){
      let fareid = result[0]._id;
      getBaseInfoCompanyFare({
        distance:param.totaldistance,
        during:param.totalduration,
        curtime:curtime,
        fareid
      },(err,result)=>{
        callback(err,result);
      });
    }
    else{
      callback(`注意！getprice找不到运价${param.registertype}`,null);
      winston.getlog().error(`注意！getprice找不到运价${param.registertype}`);
    }
  });
};

exports.getpricestring = (param,callback)=>{
  let fngetsystemconfigtmpl = ((callbackfn)=>{
    // let sysconfigModel = mongoose.model('SystemConfig', DBModels.SystemConfigSchema);
    // sysconfigModel.findOne({},(err,result)=>{
    //   let tmpl = "<span>无法评估价格</span>";
    //   if(!err && result){
    //
    //       // Be careful - they won't produce the same result.
    //       //
    //       // in will also return true if key gets found somewhere in the prototype chain, whereas Object.hasOwnProperty (like the name already tells us), will only return true if key is available on that object directly (its "owns" the property).
    //     if('pricestring' in result){ //注意：对象的对象不能用hasOwnProperty,会返回false
    //       console.log("result.pricestring2==>" + JSON.stringify(result.pricestring));
    //       if(result.pricestring.hasOwnProperty(param.registertype)){
    //         tmpl = result.pricestring[param.registertype];
    //       }
    //     }
    //   }
    //   callbackfn(null,tmpl);
    // });
      callbackfn(null,'不再显示价格字符串了');
  });
  let fngetprice= ((callbackfn)=>{
    getprice(param,(err,result)=>{
      callbackfn(err,result);
    });
  });
  let asyncfnsz = [];
  asyncfnsz.push(fngetsystemconfigtmpl);
  asyncfnsz.push(fngetprice);

  async.parallel(asyncfnsz,(err,result)=>{
    if(!err){
      let tmplstring = result[0];
      let totalprice = result[1].price;
      let totaldistancestring = getstringofdistance(param.totaldistance);
      let totaldurationstring = getstringoftime(param.totalduration);

      // var resulthtmlstring = blueimp(tmplstring, {
      //   totalprice:totalprice,
      //   totaldistancestring:totaldistancestring,
      //   totaldurationstring:totaldurationstring
      // });
      // console.log("getpricestring===>" + JSON.stringify({
      //   resulthtmlstring:resulthtmlstring,
      //   totalprice:totalprice,
      // }));
      callback(null,{
        fareid:result[1].fareid,
        resulthtmlstring:tmplstring,
        totalprice:totalprice,
        totalkm:result[1].totalkm,
        calcUnitPricePerMile:result[1].calcUnitPricePerMile,
        totalduringminute:result[1].totalduringminute,
        calcUnitPricePerMinute:result[1].calcUnitPricePerMinute
      });
    }
    else{
      callback(err,null);
    }
  });
}
