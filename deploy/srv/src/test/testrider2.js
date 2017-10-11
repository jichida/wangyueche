//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
const serverurl = 'http://localhost:3004';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODY1Mzc5MjksIl9pZCI6IjU4NmJlYjZlOGU4OTZlMWZkYzc4ZDMzYyIsImxvZ2ludGltZSI6IjIwMTctMDEtMDkgMTU6MTI6MDkiLCJpYXQiOjE0ODM5NDU5Mjl9.L5pLGpINyem6Dy5pQdevEC-cAp_yDQftb1rJ4Jh5eUw';
let authtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODM5NDYxODMsInBob25lbnVtYmVyIjoiMTU5NjExMjUxNjciLCJhdXRoY29kZSI6IjUyODQiLCJsb2dpbnRpbWUiOiIyMDE3LTAxLTA5IDE1OjA2OjIzIiwiaWF0IjoxNDgzOTQ1NTgzfQ.3I9f8apBKVIGJNWmAuApInk2yXhDtCLLLxYFC_VpaSM';
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

   describe('更新用户信息', () => {
     it('更新用户信息', (done) => {
       // Send some JSON
        chai.request(serverurl)
          .post('/rider/fillprofile')
          .set('Authorization', 'Bearer '+token)
          .send({
              profile:{
                sex:'male',
                birthday:'2010-09-12'
              }
            })
          .end((err, res)=> {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            console.log('result:' + JSON.stringify(res.body));
            done();
          });
     });
   });

 });
