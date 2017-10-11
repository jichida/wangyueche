const request = require('request');
const config = require('../config.js');
let sendsms= (tel,smstext,callbackfn)=> {
    const baseUrl = 'http://sms.1xinxi.cn/asmx/smsservice.aspx?';
    const params = {
        'name': '18019890099', //必填参数。用户账号
        'pwd': 'D58505597769028E4AF448C7B234', //必填参数。（web平台：基本资料中的接口密码）
        'content': smstext, //必填参数。发送内容（1-500 个汉字）UTF-8编码
        'mobile': tel, //必填参数。手机号码。多个以英文逗号隔开
        'stime': '', //可选参数。发送时间，填写时已填写的时间发送，不填时为当前时间发送
        'sign': '中南出行', //必填参数。用户签名。
        'type': 'pt', //必填参数。固定值 pt
        'extno': '' //可选参数，扩展码，用户定义扩展码，只能为数字
    }
    request.post({
        url: baseUrl,
        form: params
    }, (err, resp, body)=> {
         let result = body.split(',');
         if (result[0] !== '0') {
            let error = new Error(result[1]);
            error.status = parseInt(result[0], 10);
            error.raw = body;
            callbackfn(error,null);
          }
          else{
            callbackfn(null,true);
          }
    });
};


let sendsmstouser = (tel,reason,authcode,callbackfn)=>{
    const textobj = {
        'rider_login':`您正在注册(登录)中南出行乘客端账号，验证码是：${authcode}，请勿泄漏。`,//【中南出行】
        'driver_findpwd':`您正在找回中南司机密码，验证码是：${authcode}，请勿泄漏。`,
        'driver_withdraw':`您正在申请提现，验证码是：${authcode}，请勿泄漏。`,
        'driver_register':`您正在注册中南出行司机端账号，验证码是：${authcode}，请勿告诉他人！`,
        'driver_login':`您正在登录中南出行司机端，验证码是：${authcode}，请勿泄漏。`,
        'driver_isapprovaledtrue':`您已经审核为中南出行司机,请登录后查看。`,
        'driver_isapprovaledfalse':`您申请中南出行司机未通过,请登录后查看。`,
      }
    if(!!textobj[reason]){
      if(config.issmsdebug){
        callbackfn(null,{result:true,msg:textobj[reason]});
        return;
      }
      sendsms(tel,textobj[reason],(err,result)=>{
        if(!err){
          callbackfn(err,{result,msg:'验证码发送成功'});
        }
        else{
          callbackfn(error,null);
        }
      });
    }
    else{
      let error = new Error('请发送验证短信原因');
      callbackfn(error,null);
    }

}

exports.sendsmstouser = sendsmstouser;

// sendsmstouser('15961125167','register','3456',(err,result)=>{
//     console.log(`err=====>${JSON.stringify(err)}`);
//     console.log(`result=====>${JSON.stringify(result)}`);
// });
