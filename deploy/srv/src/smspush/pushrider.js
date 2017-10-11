const JPush = require('jpush-sdk');

//中南出行-乘客端
const client = JPush.buildClient('e268c790fbdc578930466618', '66c2f730ed07601e714bdc61');

// messagetype:String,//all,app
// touserid:String,
// messagetitle:String,
// messagecontent:String,
// created_at:{ type: Date, default:new Date()},

let sendallmsg = (notifymessage,fncallback)=>{
  let msgpayload = {
    _id:notifymessage._id,
    subtype:notifymessage.subtype,
  };
  if(notifymessage.subtype !== 'msg'){
    msgpayload.messagecontent = notifymessage.messagecontent;
  }
  client.push().setPlatform('ios', 'android')
    .setAudience(JPush.ALL)
    .setOptions(null, 60, null, true)
    .setNotification(notifymessage.messagetitle,
        JPush.ios(notifymessage.messagetitle, 'happy', 0,false,msgpayload),
        JPush.android(notifymessage.messagetitle, null, 1,msgpayload)
    )
    .send( (err, res)=> {
      if (!!err) {
        if (err instanceof JPush.APIConnectionError) {
          console.log(err.message)
        } else if (err instanceof JPush.APIRequestError) {
          console.log(err.message)
        }
      } else {
        console.log('【乘客端全部】Sendno: ' + res.sendno)
        console.log('【乘客端全部】Msg_id: ' + res.msg_id)
      }
      fncallback(err,res);
    });
}


//useralias 用逗号分隔
let sendusermsg = (notifymessage,fncallback)=>{
  console.log(`sendusermsg==>${JSON.stringify(notifymessage)}`);
  let msgpayload = {
    _id:notifymessage._id,
    subtype:notifymessage.subtype,
  };
  if(notifymessage.subtype !== 'msg'){
    msgpayload.messagecontent = notifymessage.messagecontent;
  }
  client.push().setPlatform('ios', 'android')
    .setAudience(JPush.alias(notifymessage.touserid))
    .setOptions(null, 60, null, true)
    .setNotification(notifymessage.messagetitle,
        JPush.ios(notifymessage.messagetitle, 'happy', 0,false,msgpayload),
        JPush.android(notifymessage.messagetitle, null, 1,msgpayload)
    )
    .send((err, res)=> {
      if (err) {
        if (err instanceof JPush.APIConnectionError) {
          console.log(err.message)
          // Response Timeout means your request to the server may have already received,
          // please check whether or not to push
          console.log(err.isResponseTimeout)
        } else if (err instanceof JPush.APIRequestError) {
          console.log(err.message)
        }
      } else {
        console.log('【乘客端用户】Sendno: ' + res.sendno)
        console.log('【乘客端用户】Msg_id: ' + res.msg_id)
      }
      fncallback(err,res);
    })
}

let sendnotifymessage =  (notifymessage,fn)=>{
    console.log(`sendnotifymessage==>${JSON.stringify(notifymessage)}`);
    notifymessage.touserid = notifymessage.rideruserid;
    if(!!notifymessage.touserid){
        if(typeof notifymessage.touserid !== 'string'){
          notifymessage.touserid = notifymessage.touserid.toString();
        }

        sendusermsg(notifymessage,fn);
    }
    else{
        sendallmsg(notifymessage,fn);
    }
}

exports.sendnotifymessage = sendnotifymessage;

// sendnotifymessage({
//   _id:'593e4b20c9131303d0d0a9f2',
//   rideruserid:'58e50f2fee5477035f8d91c6',
//   messagetitle:'您的请求已被司机接单，请您在路边等候!',
//   messagecontent:'您的请求已被司机接单，请您在路边等候!'
// },(err,result)=>{
//     console.log(`------------>` + JSON.stringify(result));
// });
