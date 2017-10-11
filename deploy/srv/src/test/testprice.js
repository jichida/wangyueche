let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');
let price = require('../handler/common/price.js');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);

describe('测试价格', () => {
  let priceModel = mongoose.model('Price', DBModels.PriceSchema);
  // priceModel.remove({});
  // let pricedata = [
  //   {
  //     registertype:'kuaiche',
  //     starttime:'00:00',//开始时间
  //     endtime:'09:00',//结束时间
  //     priceperkm:3,//每公里价格
  //     minkem:3,
  //     minprice:8//起步价
  //   },
  //   {
  //     registertype:'kuaiche',
  //     starttime:'09:00',//开始时间
  //     endtime:'10:00',//结束时间
  //     priceperkm:3,//每公里价格
  //     minkem:3,
  //     minprice:10//起步价
  //   },
  //   {
  //     registertype:'kuaiche',
  //     starttime:'10:00',//开始时间
  //     endtime:'17:00',//结束时间
  //     priceperkm:3,//每公里价格
  //     minkem:3,
  //     minprice:9//起步价
  //   },
  //   {
  //     registertype:'kuaiche',
  //     starttime:'17:00',//开始时间
  //     endtime:'23:59',//结束时间
  //     priceperkm:3,//每公里价格
  //     minkem:3,
  //     minprice:10//起步价
  //   },
  //   {
  //     registertype:'daijia',
  //     starttime:'00:00',//开始时间
  //     endtime:'09:00',//结束时间
  //     priceperkm:3,//每公里价格
  //     minkem:3,
  //     minprice:18//起步价
  //   },
  //   {
  //     registertype:'daijia',
  //     starttime:'09:00',//开始时间
  //     endtime:'10:00',//结束时间
  //     priceperkm:3,//每公里价格
  //     minkem:3,
  //     minprice:12//起步价
  //   },
  //   {
  //     registertype:'daijia',
  //     starttime:'10:00',//开始时间
  //     endtime:'17:00',//结束时间
  //     priceperkm:3,//每公里价格
  //     minkem:3,
  //     minprice:19//起步价
  //   },
  //   {
  //     registertype:'daijia',
  //     starttime:'17:00',//开始时间
  //     endtime:'23:59',//结束时间
  //     priceperkm:3,//每公里价格
  //     minkem:3,
  //     minprice:12//起步价
  //   },
  // ];
  // pricedata.forEach((priceobj)=>{
  //   let entity = new priceModel(priceobj);
  //   entity.save((err,result)=>{
  //   });
  // });

  describe('测试快车价格', () => {
    it('测试快车3km价格', (done) => {
      price.getprice({registertype:'kuaiche',totaldistance:3000},(price)=>{
        console.log('快车3km价格为:' + price);
        done();
      });
    });
    it('测试快车5km价格', (done) => {
      price.getprice({registertype:'kuaiche',totaldistance:5000},(price)=>{
        console.log('快车5km价格为:' + price);
        done();
      });
    });
    it('测试快车10km价格', (done) => {
      price.getprice({registertype:'kuaiche',totaldistance:10000},(price)=>{
        console.log('快车10km价格为:' + price);
        done();
      });
    });
    it('测试快车100km价格', (done) => {
      price.getprice({registertype:'kuaiche',totaldistance:100000},(price)=>{
        console.log('快车100km价格为:' + price);
        done();
      });
    });
    it('测试快车xxx价格', (done) => {
      price.getprice({registertype:'kuaiche',totaldistance:29188},(price)=>{
        console.log('快车29188价格为:' + price);
        done();
      });
    });
    });

    describe('测试代驾价格', () => {
      it('测试代驾3km价格', (done) => {
        price.getprice({registertype:'daijia',totaldistance:3000},(price)=>{
          console.log('快车3km价格为:' + price);
          done();
        });
      });
      it('测试代驾5km价格', (done) => {
        price.getprice({registertype:'daijia',totaldistance:5000},(price)=>{
          console.log('代驾5km价格为:' + price);
          done();
        });
      });
      it('测试代驾10km价格', (done) => {
        price.getprice({registertype:'daijia',totaldistance:10000},(price)=>{
          console.log('代驾10km价格为:' + price);
          done();
        });
      });
      it('测试代驾100km价格', (done) => {
        price.getprice({registertype:'daijia',totaldistance:100000},(price)=>{
          console.log('代驾100km价格为:' + price);
          done();
        });
      });

      });
});
