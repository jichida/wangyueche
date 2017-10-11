let geo = require('../geo/index.js');
const config = require('../config');
let mongoose     = require('mongoose');
const axios = require('axios');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);
//注意：子进程需要单独连接数据库

process.on('message', (msgobj)=> {
  //console.log("platformmessage:" + JSON.stringify(msgobj));
  let msg = msgobj.msg;
  let data = msgobj.data;
  process.send({
    msg:{
      result:'OK',
    }
  });

});
