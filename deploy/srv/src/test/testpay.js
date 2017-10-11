let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const pay = require('../pay/pay.js');
var expect = chai.expect;
chai.use(chaiHttp);
const serverurl = 'http://localhost:3004';
let token = '';
let orderDoc = {
  out_trade_no: 'xxxxxxxxxxxx',
  subject: '商品名称',//$('#subject').val(),//'WL144626511265842',//$('#subject').val(),
  body: '商品详情',//$('#body').val(),//'WL144626511265842',//
  total_fee: '0.01',//$('#fee').val(),//'9.00',
};


describe('测试支付方式', () => {
  describe('测试支付宝', () => {
    it('获得支付宝数据', (done) => {
          orderDoc.finalmoney = 0.01;
          pay.getpayresultstring('alipay',orderDoc,(err,result)=>{
            console.log("err:" + JSON.stringify(err));
            console.log("result:" + JSON.stringify(result));
            done();
          });
      });
    });
    describe('测试微信', () => {
      it('获得微信数据', (done) => {
        orderDoc.total_fee = 0.01 * 100;
        orderDoc.product_id = 'xxxxxxxxxxx';
        pay.getpayresultstring('weixin',orderDoc,(err,result)=>{
          console.log("err:" + JSON.stringify(err));
          console.log("result:" + JSON.stringify(result));
          done();
        });
      });
    });
  });
