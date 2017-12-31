let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let path = require('path');
var fs = require('fs');
const config = require('../config.js');
let middlewareauth = require('./middlewareauth.js');
const pinche = require('../handler/common/pinche.js');
const _ = require('lodash');
let dbs = require('../db/index.js');

let startadmincustom = (app)=>{
  app.post('/findone/:resourcename',(req,res)=>{
    console.log("findone:" + req.params.resourcename);
    let schmodel = dbs[req.params.resourcename];
    let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
    dbModel.findOne({},(err,result)=>{
      if(!err && !!result){
        result = result.toJSON();
        res.status(200).json(result);
      }
      else{
        res.status(404).json({});
      }
    });
  });


  app.post('/pincheorderrefund/:orderid',(req,res)=>{
      console.log("orderid:" + req.params.orderid);
      pinche.pincheorderrefund(req.params.orderid,(err,result)=>{
        if(!!result){
          res.status(200).json(result);
        }
        else{
          res.status(200).json({err});
        }
      });
  });

  app.post('/createmycouponsbatch',(req,res)=>{
      //console.log("orderid:" + req.params.orderid);
      let record = req.body;
      console.log(`createmycouponsbatch record===>${JSON.stringify(record)}`);
      _.map(record.creators,(creator)=>{
        _.map(record.triptypes,(triptype)=>{
          for(let i = 0;i < record.couponnumber;i++){
            let dbModel = DBModels.MyCouponModel;
            let recordcoupon = {
              creator,
              triptype,
              name:record.name,
              expdate:record.expdate,
              pricediscountpercent:record.pricediscountpercent,
              pricediscountmax:record.pricediscountmax,
              usestatus:'未使用'
            };
            let entity = new dbModel(recordcoupon);
            entity.save((err,result)=>{
            });
          }
        });
      });
      res.status(200).json({result:'OK'});
  });

}

module.exports= startadmincustom;
