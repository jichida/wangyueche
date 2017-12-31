const config = require('../src/config.js');
const getplatformdata = require('./restfulapi/getplatformdata');
const map_platformfn = require('./restfulapi/getmapfn');
const uploadtoplatform = require('./restfulapi/index');
// const mongoose     = require('mongoose');
//
// mongoose.Promise = global.Promise;
// mongoose.connect(config.mongodburl);
// //注意：子进程需要单独连接数据库


process.on('message', (msgobj)=> {
  //console.log("platformmessage:" + JSON.stringify(msgobj));
  let msg = msgobj.msg;
  let data = msgobj.data;
  const mapfn = map_platformfn[data.collectionname];
  if(!!mapfn){
    console.log(`getdata ==>${JSON.stringify(data)}`);
    let uploaddata = getplatformdata(data.action,data.collectionname,data.doc);
    if(!!uploaddata){
      uploadtoplatform(mapfn.IPCType,mapfn.uri,uploaddata);
    }
  }
  else{
    console.log(`找不到===>${data.collectionname}`);
  }

  // data:{
  //   action:actionname,//'findByIdAndUpdate',
  //   collectionname:collectionname,//'baseinfocompany',
  //   doc:retdoc
  // }

  // process.send({
  //   msg:{
  //     result:'OK',
  //   }
  // });

});
