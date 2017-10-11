//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
const serverurl = 'http://localhost:3004';
let token = '';

describe('测试司机端', () => {
  describe('测试用户注册', () => {
    it('插入一条司机数据', (done) => {
        let param = {
          username:'15961125167',
          password:'123456'
        };
        chai.request(serverurl)
          .post('/driver/register')
          .send(param)
          .end((err, res)=> {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
          });
          done();
        });
    });

  describe('测试用户登录', () => {
    it('获取token', (done) => {
        let param = {
          username:'15961125167',
          password:'123456'
        };
        chai.request(serverurl)
          .post('/driver/login')
          .send(param)
          .end((err, res)=> {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
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
