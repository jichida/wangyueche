let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let config = require('../config.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl);


//旅游大巴,型号,座位,图标,每小时费用,是否启用
 // let TourbusinfoSchema = new Schema({
 //   name:String,
 //   desc:String,
 //   seatnumber:Number,
 //   icon:String,
 //   priceperhour:Number,
 //   isenabled:Boolean
 // });


describe('测试插入订单', () => {
  it('插入订单', (done) => {
  let questobj = {
    "_id" : "5893505f991aa7259cdcf342",
    "srcaddress" : {
        "location" : {
            "lng" : 118.7294151918,
            "lat" : 31.9931551257
        },
        "addressname" : "江苏省南京市建邺区沙洲街道缤润汇商场金润国际广场"
    },
    "dstaddress" : {
        "location" : {
            "lng" : 118.798542,
            "lat" : 31.968791
        },
        "addressname" : "南京市雨花台区玉兰路98号南京南站"
    },
    "triptype" : "kuaiche",
    "isrealtime" : false,
    "rideruserid" : "588aee583bb29007004ed1ef",
    "created_at" : new Date(),
    "createtime" : new Date("2017-02-02 23:29:35"),
    "showtimestring" : "02月02日 23:29",
    "srclocation" : [
        118.7294151918,
        31.9931551257
    ],
    "dstlocation" : [
        118.798542,
        31.968791
    ],
    "requeststatus" : "行程完成",
    "driverlocation" : [
        118.7294151918,
        31.9931551257
    ],
    "riderlocation" : [],
    "__v" : 0,
    "driveruserid" : "588d800d18b5a11998ae6b25",
    "driveruserinfo" : {
        "driveruserid" : "588d800d18b5a11998ae6b25",
        "starnum" : 5,
        "drivername" : "ABCDEF",
        "carid" : "苏A*XM323",
        "carname" : "红色福克斯"
    }
};
delete questobj._id;
let orderModel = mongoose.model('Order', DBModels.TripOrderSchema);
let order = questobj;
// if(ctx.usertype === 'rider'){
//   order.rideruserid = ctx.userid;
// }
// else if(ctx.usertype === 'driver'){
//   order.driveruserid = ctx.userid;
// }
order.updated_at = new Date();
order.created_at = new Date();
let entity = new orderModel(order);
console.log("insertorder=>" + JSON.stringify(order));
entity.save((err,result)=>{
  console.log("insertorder err=>" + JSON.stringify(err));
  console.log("insertorder result=>" + JSON.stringify(result));
  done();
  });
});
});
