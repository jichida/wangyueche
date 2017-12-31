let express = require('express');
let app = express();
let path = require('path');
let winston = require('./log/log.js');
let http = require('http').Server(app);
let bodyParser = require("body-parser");
const config = require('./config');
const routerindex = require("./router/index.js");
const upload = require('jquery-file-upload-middleware');
const uuid = require('uuid');
const _  = require('lodash');

let startsrv = ()=>{
  let riderdir = path.join(__dirname,config.publishdirrider);
  console.log("static rider:" + riderdir);
  app.use('/rider', express.static(riderdir));

  let driverdir = path.join(__dirname,config.publishdirdriver);
  console.log("static driver:" + driverdir);
  app.use('/driver', express.static(driverdir));

  let driverdirpinche = path.join(__dirname,config.publishdirriderpinche);
  console.log("static driverdirpinche:" + driverdirpinche);
  app.use('/driverpinche', express.static(driverdirpinche));


  let testdir = path.join(__dirname,config.publishdirtest);
  console.log("static test:" + testdir);
  app.use('/test', express.static(testdir));

  let admindir = path.join(__dirname,config.publishdiradmin);
  console.log("static admin:" + admindir);
  app.use('/admin', express.static(admindir));

  let uploaddir = path.join(__dirname,config.uploaddir);
  console.log("static upload:" + uploaddir);
  app.use(config.uploadurl, express.static(uploaddir));


  console.log('uploadurl:' + config.uploadurl);
  console.log('uploaddir:' + uploaddir);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use((req, res, next)=> {
      console.log('req.url:' + req.url);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
      next();
  });

  upload.configure({
    uploadDir: uploaddir,
    uploadUrl: config.uploadurl,
    accessControl: {
        allowOrigin: '*',
        allowMethods: 'POST'
    },
    imageVersions: {// apt-get install imagemagick
      thumbnail: {
        width: 80,
        height: 80
      }
    }
  });

  upload.on("begin", (fileInfo)=> {
    let ext = 'jpg';
    let sz = _.split(fileInfo.type, '/');
    if(sz.length > 1){
      ext = sz[sz.length - 1];
    }
    fileInfo.name = `${uuid.v4()}.${ext}`;
    console.log(`开始上传文件:${JSON.stringify(fileInfo)}`);
  });

  upload.on('error', function (e, req, res) {
    winston.getlog().error(`上传文件失败${e.message}`);
  });
  app.use('/uploadavatar',upload.fileHandler());


  routerindex.startrouter(app);

  http.listen(config.listenport, ()=>{
    winston.initLog();
    console.log(`服务启动,端口号为${config.listenport}`);
    winston.getlog().info(`服务启动,端口号为${config.listenport}`);
  });

  return http;
};

exports.startsrv = startsrv;
