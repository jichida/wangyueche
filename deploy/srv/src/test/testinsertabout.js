let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);


// let AboutSchema = new Schema({
//   keyname:String,
//   title:String,
//   desc:String,
// });

describe('测试关于页面', () => {
  it('插入关于页面', (done) => {
  let aboutModel = mongoose.model('About', DBModels.AboutSchema);
  let aboutlistdata = [
    {
      keyname:'乘客端用户指南',
      title:'用户指南',
      desc:'<br>用户指南</br>',
    },
    {
      keyname:'乘客端计费规则',
      title:'计费规则',
      desc:'<br>计费规则</br>',
    },
    {
      keyname:'乘客端法律条款',
      title:'法律条款',
      desc:'<br>法律条款</br>',
    },
    {
      keyname:'司机端用户指南',
      title:'用户指南',
      desc:'<br>用户指南</br>',
    },
    {
      keyname:'司机端计费规则',
      title:'计费规则',
      desc:'<br>计费规则</br>',
    },
    {
      keyname:'司机端法律条款',
      title:'法律条款',
      desc:'<br>法律条款</br>',
    },
  ];//obj;
  aboutlistdata.forEach((obj)=>{
    let entity = new aboutModel(obj);
    entity.save((err,result)=>{
      console.log('save --->' + JSON.stringify(result));
    });
  });
});
});
