let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);


//旅游大巴,型号,座位,图标,每小时费用,是否启用
 // let TourbusinfoSchema = new Schema({
 //   name:String,
 //   desc:String,
 //   seatnumber:Number,
 //   icon:String,
 //   priceperhour:Number,
 //   isenabled:Boolean
 // });


describe('测试旅游大巴', () => {
  it('插入旅游大巴', (done) => {
  let tourbusinfoModel = mongoose.model('Tourbusinfo', DBModels.TourbusinfoSchema);
  let tourbusinfolistdata = [
    {
      name:'小型客车',
      desc:'家庭出行最实惠',
      seatnumber:9,
      icon:'/images/car_1.png',
      priceperday:30,
      isenabled:true
    },
    {
      name:'中型客车',
      desc:'单位班车首选',
      seatnumber:20,
      icon:'/images/car_2.png',
      priceperday:80,
      isenabled:true
    },
    {
      name:'大型客车',
      desc:'学校外出旅游必备',
      seatnumber:50,
      icon:'/images/car_3.png',
      priceperday:200,
      isenabled:true
    },
  ];//obj;
  tourbusinfolistdata.forEach((obj)=>{
    let entity = new tourbusinfoModel(obj);
    entity.save((err,result)=>{
      console.log('save --->' + JSON.stringify(result));
    });
  });
});
});
