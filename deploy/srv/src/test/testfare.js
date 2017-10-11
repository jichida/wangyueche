/**
 * Created by wangxiaoqing on 2017/3/28.
 */
let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');
let price = require('../handler/common/price');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);


describe('价格信息', () => {
    it('测试价格信息', (done) => {
        let input = {
            distance:5000,
            during:15*60,
            curtime:new Date(),
            fareid:'58da12b971983947079ae4f8'
        };
        price.getBaseInfoCompanyFare(input,(err,result)=>{
            if(!err){
                console.log('测试结果：'+JSON.stringify(result));
            }
            done();
        });

    });
});
