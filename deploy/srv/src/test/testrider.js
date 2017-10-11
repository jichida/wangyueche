//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
const serverurl = 'http://localhost:3004';
let token = '';
let authtoken = '';

describe('测试乘客端', () => {
  describe('测试用户登录', () => {
    it('发送验证码', (done) => {
        let param = {
          phonenumber:'15961125167',
        };
        chai.request(serverurl)
          .post('/rider/loginsendauth')
          .send(param)
          .end((err, res)=> {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            console.log('result:' + JSON.stringify(res.body));
            if(res.body.result === 'OK'){
                authtoken = res.body.data.authtoken;
            }
          });
          done();
        });
    });

  describe('测试用户登录', () => {
    it('获取token', (done) => {
        let param = {
          phonenumber:'15961125167',
          authcode:'5284'
        };
        chai.request(serverurl)
          .post('/rider/loginwithauth')
          .set('Authorization', 'Bearer '+authtoken)
          .send(param)
          .end((err, res)=> {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            console.log('result:' + JSON.stringify(res.body));
            if(res.body.result === 'OK'){
                token = res.body.data.token;
            }
            done();
          });
        });
    });

   describe('更新用户位置信息', () => {
     it('插入位置到数据库', (done) => {
       // Send some JSON
        chai.request(serverurl)
          .post('/rider/updatelocation')
          .set('Authorization', 'Bearer '+token)
          .send({
              longitude:119.96016,
              latitude:31.68762
            })
          .end((err, res)=> {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
     });
   });

 });
