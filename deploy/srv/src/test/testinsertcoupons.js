let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);

//
// //优惠券
// let CouponSchema = new Schema({
//     expdate:Date,//过期时间
//     name:String,//名字
//     type:String,//打折券,优惠券
//     maxprice:Number,//设置上限
//     onlycity:String,//限制城市
//     value:Number,//如果是打折券，0.8表示八折；如果是优惠券，表示折扣金额
//     isenabled:Boolean//是否启用
// });
// CouponSchema.plugin(mongoosePaginate);
//
// //UserRiderCouponSchema
// let UserRiderCouponSchema = new Schema({
//     userid:String,//用户id
//     expdate:Date,//过期时间
//     name:String,//名字
//     type:String,//打折券,优惠券
//     maxprice:Number,//设置上限
//     onlycity:String,//限制城市
//     value:Number,//如果是打折券，0.8表示八折；如果是优惠券，表示折扣金额
//     status:String,//状态：未使用，已使用
//     couponid:String,//关联优惠券ID
//     orderid:String,//关联订单
//     sourceid:String,//来源id,一般来源于某个消息，为避免重复，一般需要判断是否重复,避免重复领取
// });
// UserRiderCouponSchema.plugin(mongoosePaginate);
describe('测试优惠券', () => {
  it('插入优惠券', (done) => {
    let obj = {
      expdate:new Date(),
      name:'9折优惠券',
      type:'打折券',
      maxprice:5,
      onlycity:'南京',
      value:0.8,
      isenabled:true
    };
  let mycouponModel = mongoose.model('UserRiderCoupon', DBModels.UserRiderCouponSchema);
  let entity = new couponModel(obj);
  entity.save((err,result)=>{
    console.log('save --->' + JSON.stringify(result));
    for(var i = 0 ;i < 100;i ++){
      //仅供测试
      let mycoupon = {
        userid:'588aee583bb29007004ed1ef',
        expdate:obj.expdate,
        name:obj.name,//名字
        type:obj.type,//打折券,优惠券
        maxprice:i,//设置上限
        onlycity:obj.onlycity,//限制城市
        value:obj.value,//如果是打折券，0.8表示八折；如果是优惠券，表示折扣金额
        couponid:result._id,//如果是打折券，0.8表示八折；如果是优惠券，表示折扣金额
      };
      let myentity = new mycouponModel(mycoupon);
      myentity.save((err,result)=>{
      });
    }
  });

});
});
