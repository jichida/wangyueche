let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);


//拼车--行程路线(后台发布)
// BuscarpoolSchema = new Schema({
//     pinchetype:String,//拼车类型:专线、人气团拼
//     startcity:String,//开始城市
//     endcity:String,//结束城市
//     starttime:String,//出发时间
//     seatnumber:Number,//座位
//     startstations:[],//出发点站台{name/address/desc/location}
//     endstations:[],//结束点站台{name/address/desc/location}
//     status:String,//状态
//     takennumber:Number,//预约人数
//     carpoolprice:Schema.Types.Mixed,//价格信息
// });

describe('测试拼车路线', () => {
  it('插入拼车路线', (done) => {
  let buscarpoolModel = mongoose.model('Buscarpool', DBModels.BuscarpoolSchema);
  let buscarpooldata = [
    {
      pinchetype:'专线',//拼车类型:专线、人气团拼
      startcity:'天长',
      endcity:'常州',
      starttime:'09:00',//出发时间
      seatnumber:32,//座位
      startstations:['天长总站','滁州客运站'],//出发点站台{name/address/desc/location}
      endstations:['武进客运站','花园街客运站','常州客运站'],//结束点站台{name/address/desc/location}
      status:'待出发',//状态
      takennumber:20,//预约人数
      carpoolprice:{
        '天长总站':{
          '武进客运站':220
        },
        '天长总站':{
          '花园街客运站':225
        },
        '天长总站':{
          '常州客运站':250
        },
        '滁州客运站':{
          '武进客运站':218
        },
        '滁州客运站':{
          '花园街客运站':223
        },
        '滁州客运站':{
          '常州客运站':245
        },
      },//价格信息
    },//obj
        {
        pinchetype:'专线',//拼车类型:专线、人气团拼
        startcity:'天长',
        endcity:'南京',
        starttime:'09:00',//出发时间
        seatnumber:32,//座位
        startstations:['天长总站','滁州客运站'],//出发点站台{name/address/desc/location}
        endstations:['大厂客运站','新街口客运站','浦口客运站'],//结束点站台{name/address/desc/location}
        status:'待出发',//状态
        takennumber:20,//预约人数
        carpoolprice:{
          '天长总站':{
            '大厂客运站':120
          },
          '天长总站':{
            '浦口客运站':125
          },
          '天长总站':{
            '新街口客运站':150
          },
          '滁州客运站':{
            '大厂客运站':118
          },
          '滁州客运站':{
            '浦口客运站':123
          },
          '滁州客运站':{
            '新街口客运站':145
          },
        },//价格信息
      },//obj
      {
        pinchetype:'人气团拼',//拼车类型:专线、人气团拼
        startcity:'天长',
        endcity:'南京',
        startdate:'2017-02-02',
        starttime:'19:00',//出发时间
        seatnumber:32,//座位
        startstations:['天长总站','滁州客运站'],//出发点站台{name/address/desc/location}
        endstations:['大厂客运站','新街口客运站','浦口客运站'],//结束点站台{name/address/desc/location}
        status:'待出发',//状态
        takennumber:20,//预约人数
        carpoolprice:{
          '天长总站':{
            '大厂客运站':120
          },
          '天长总站':{
            '浦口客运站':125
          },
          '天长总站':{
            '新街口客运站':150
          },
          '滁州客运站':{
            '大厂客运站':118
          },
          '滁州客运站':{
            '浦口客运站':123
          },
          '滁州客运站':{
            '新街口客运站':145
          },
        },//价格信息
      }]//obj;
  buscarpooldata.forEach((obj)=>{
    let entity = new buscarpoolModel(obj);
    entity.save((err,result)=>{
      console.log('save --->' + JSON.stringify(result));
    });
  });
});
});
