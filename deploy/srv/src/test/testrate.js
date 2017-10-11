let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');
const rate = require('../handler/common/rate.js');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);


rate.getrateuser('593b7c8e91227b0350c295af',(r)=>{
  console.log(`乘客评分为:${r}`);
});//rider

rate.getrateuser('5930c023bccf1014be4f19d3',(r)=>{
  console.log(`司机评分为:${r}`);
});//rider
// let AboutSchema = new Schema({
//   keyname:String,
//   title:String,
//   desc:String,
// });

// describe('测试评价系统', () => {
//   it('测试乘客星级', (done) => {
//
//   });
// });
