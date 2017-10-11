let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');
let price = require('../handler/common/price.js');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);

describe('测试价格', () => {
  it('插入价格', (done) => {
  let priceModel = mongoose.model('Price', DBModels.PriceSchema);
  let pricedata = [
    {
      registertype:'kuaiche',
      starttime:'00:00',//开始时间
      endtime:'09:00',//结束时间
      priceperkm:3,//每公里价格
      minkem:3,
      minprice:8//起步价
    },
    {
      registertype:'kuaiche',
      starttime:'09:00',//开始时间
      endtime:'10:00',//结束时间
      priceperkm:3,//每公里价格
      minkem:3,
      minprice:10//起步价
    },
    {
      registertype:'kuaiche',
      starttime:'10:00',//开始时间
      endtime:'17:00',//结束时间
      priceperkm:3,//每公里价格
      minkem:3,
      minprice:9//起步价
    },
    {
      registertype:'kuaiche',
      starttime:'17:00',//开始时间
      endtime:'23:59',//结束时间
      priceperkm:3,//每公里价格
      minkem:3,
      minprice:10//起步价
    },
    {
      registertype:'daijia',
      starttime:'00:00',//开始时间
      endtime:'09:00',//结束时间
      priceperkm:3,//每公里价格
      minkem:3,
      minprice:18//起步价
    },
    {
      registertype:'daijia',
      starttime:'09:00',//开始时间
      endtime:'10:00',//结束时间
      priceperkm:3,//每公里价格
      minkem:3,
      minprice:12//起步价
    },
    {
      registertype:'daijia',
      starttime:'10:00',//开始时间
      endtime:'17:00',//结束时间
      priceperkm:3,//每公里价格
      minkem:3,
      minprice:19//起步价
    },
    {
      registertype:'daijia',
      starttime:'17:00',//开始时间
      endtime:'23:59',//结束时间
      priceperkm:3,//每公里价格
      minkem:3,
      minprice:12//起步价
    },
  ];
  pricedata.forEach((priceobj)=>{
    let entity = new priceModel(priceobj);
    entity.save((err,result)=>{
      console.log('save --->' + JSON.stringify(result));
    });
  });
});
});
