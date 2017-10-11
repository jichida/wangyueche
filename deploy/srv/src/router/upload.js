let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let path = require('path');
var fs = require('fs');
const config = require('../config.js');
const moment  = require('moment');
let middlewareauth = require('./middlewareauth.js');
let formidable = require('formidable');
let util = require('util');

let startuploader = (app)=>{
  app.post('/upload',middlewareauth,(req,res)=>{
    console.log("userid:" + req.userid);
    // let data = req.body;
    // data.userid = req.userid;
    // let userModel = mongoose.model('UserRider', DBModels.UserRiderSchema);

     var form = new formidable.IncomingForm();
     form.uploadDir = path.join(__dirname,config.uploaddir);
     //form.keepExtensions = true;

     form.parse(req, (err, fields, files)=> {
       console.log('file name:' + util.inspect({fields: fields, files: files}));
       console.log('file name:' + files['file'].path);
       let basename = path.basename(files['file'].path);
       let extname = path.extname(fields['filename']);
       let filename = basename + extname;
       fs.rename(files['file'].path,files['file'].path+extname,(err)=>{
         if(err){
           res.status(200)
               .json({
                 result:'Error',
               });
         }
         else{
           res.status(200)
               .json({
                 result:'OK',
                 data:{
                   url:config.uploadurl + '/' + filename
                 }
               });
         }
       })

     });
    //  form.on('file', (name, file)=> {
    //    console.log("file name:" + name);
    //    console.log("file file:" + JSON.stringify(file));
    //  });
     form.on('progress', (bytesReceived, bytesExpected)=> {
       console.log('已接受:' + bytesReceived);
       console.log('一共:' + bytesExpected);
     });

  });

}

module.exports= startuploader;
