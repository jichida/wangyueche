let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');
let geo = require('../handler/common/triprequest.js');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);

describe('测试地理信息', () => {
  describe('测试推送给司机最近起始位置的点', () => {
    it('找到当前位置最近请求', (done) => {
      let param = {
        location:[119.96016,31.68762],
      }
      geo.getnearbyrequests(param,(issuc,result)=>{
        console.log("result:" + JSON.stringify(result));
        if(issuc){
          result.forEach((e)=>{
             console.log("找到:" + e.srcaddress.addressname);
          });
        }
        done();
      });
    });
});

// describe('测试推送给乘客最近的司机列表', () => {
//   it('找到当前位置最近的司机信息', (done) => {
//     let param = {
//       location:[119.96016,31.68762],
//       distance:3
//     }
//     geo.getnearestdrivers(param,(issuc,result)=>{
//       if(issuc){
//         result.forEach((e)=>{
//            console.log("找到:" + e.curaddress.addressname);
//         });
//       }
//       done();
//     });
//   });
// });

});
