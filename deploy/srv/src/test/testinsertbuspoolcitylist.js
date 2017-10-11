let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);


//拼车城市站点设置
// BuscarpoolcitylistSchema = new Schema({
//   cityname:String,
//   stations:[],
// });


describe('测试拼车路线', () => {
  it('插入拼车路线', (done) => {
  let buscarpoolcitylistModel = mongoose.model('Buscarpoolcitylist', DBModels.BuscarpoolcitylistSchema);
  let buscarpoolcitylistdata = [
    {
      cityname:'常州',
      stations:['武进客运站','花园街客运站','常州客运站'],
    },
    {
      cityname:'南京',
      stations:['大厂客运站','新街口客运站','浦口客运站'],
    },
    {
      cityname:'上海',
      stations:['闸北区客运站','人民广场客运站'],
    },
    {
      cityname:'天长',
      stations:['天长总站','滁州客运站'],
    },
  ];//obj;
  buscarpoolcitylistdata.forEach((obj)=>{
    let entity = new buscarpoolcitylistModel(obj);
    entity.save((err,result)=>{
      console.log('save --->' + JSON.stringify(result));
    });
  });
});
});
