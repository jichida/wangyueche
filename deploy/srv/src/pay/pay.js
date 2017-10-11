const globalpayparam = require('./payparam.js');
const crypto = require('crypto');
const fs = require('fs');
const xml2js = require('xml2js');
const CryptoJS = require("crypto-js");
const request = require('request');
const moment = require('moment');
const Chance = require('chance');
const  chance = new Chance();
const alipaysigner = require('./alipay_signer.js');

let getpayresultstring = (paytype,orderDoc,resultcallback)=>{
      var payobj = {};
      if(paytype == 'alipay'){
        payobj = globalpayparam.alipay;
      }
      else if(paytype == 'weixin'){
        payobj = globalpayparam.weixin;
      }
      console.log("payobj:" + JSON.stringify(payobj));
      if(paytype == 'alipay'){
        var strcontent = "partner=\"";
        strcontent+= payobj.partner;//"2088021265636683";
        strcontent+="\"&seller_id=\"";
        strcontent+= payobj.seller_id;//"guorouwang@126.com";
        strcontent+="\"&out_trade_no=\"";
        strcontent+=orderDoc.out_trade_no;//"WL144465405306243\"";
        strcontent+="\"&subject=\"";
        strcontent+=orderDoc.subject;//"WL144465405306243";
        strcontent+="\"&body=\"";
        strcontent+=orderDoc.body;//"WL144465405306243";
        strcontent+="\"&total_fee=\"";
        strcontent+=orderDoc.total_fee;//"23.80";
        strcontent+="\"&notify_url=\"";
        strcontent+=payobj.notify_url;//"http://www.guorouwang.com/wap_ios3/pay/notify_url.jsp";
        strcontent+="\"&service=\"";
        strcontent+=payobj.service;//"mobile.securitypay.pay";
        strcontent+="\"&payment_type=\"";
        strcontent+=payobj.payment_type;//"1";
        strcontent+="\"&_input_charset=\"";
        strcontent+=payobj._input_charset;//"utf-8";
        strcontent+="\"&it_b_pay=\"";
        strcontent+=payobj.it_b_pay;//"30m";
        strcontent+="\"";
        console.log("strcontent:"+strcontent);
        let sign = alipaysigner.getAlipayPaySign(strcontent);
        const retdata = strcontent +
            '&sign_type="RSA"' +
            '&sign="' + sign + '"';
        console.log(retdata);
        resultcallback(null,retdata);
      }
      else if(paytype == 'weixin'){
        var appid = payobj.appid;//微信分配的公众账号ID（企业号corpid即为此appId）,wxd678efh567hg6787
        var attach = payobj.attach;//附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
        var body = orderDoc.body;
        var mch_id = payobj.mch_id;//微信支付分配的商户号,例:1230000109
        var nonce_str = chance.string({length: 32, pool: 'abcdefghijklmnopqrstuvwxyz1234567890'});//Random.id([32]);//随机字符串，不长于32位。推荐随机数生成算法
        var notify_url = payobj.notify_url;//接收微信支付异步通知回调地址
        var openid = '';//trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识。openid如何获取，可参考【获取openid】。企业号请使用【企业号OAuth2.0接口】获取企业号内成员userid，再调用【企业号userid转openid接口】进行转换
        var out_trade_no = orderDoc.out_trade_no;
        var spbill_create_ip =  '127.0.0.1';//APP和网页支付提交用户端ip，Native支付填调用微信支付API的机器IP。
        var total_fee = orderDoc.total_fee;//订单总金额，单位为分，详见支付金额（INT）
        var trade_type = payobj.trade_type;

        var sign = '';
        // {
        //   //for test:
        //   var jsonobj = {
        //     appid:'wxd930ea5d5a258f4f',
        //     mch_id:'10000100',
        //     device_info:'1000',
        //     body:'test',
        //     nonce_str:'ibuaiVcKdpRxkhJA'
        //   };
        //   var params = obj2param(jsonobj,"normal");
        //   console.log("jsontoparams:" + params);
        //   console.log(`stringA="appid=wxd930ea5d5a258f4f&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA"`);
        //   var stringSignTemp = params + '&key=192006250b4c09247ec02edce69f6a2d';//+globalpayparam.keystring;
        //   console.log("stringSignTemp:" + stringSignTemp);
        //   jsonobj.sign = CryptoJS.MD5(stringSignTemp).toString().toUpperCase();
        //   var builder = new xml2js.Builder({rootName:'xml'});
        //   var xml = builder.buildObject(jsonobj);
        //   console.log("xml:--->\n" + xml );
        //   console.log(`期望:<xml>
        //       <appid>wxd930ea5d5a258f4f</appid>
        //       <mch_id>10000100</mch_id>
        //       <device_info>1000<device_info>
        //       <body>test</body>
        //       <nonce_str>ibuaiVcKdpRxkhJA</nonce_str>
        //       <sign>9A0A8659F005D6984697E2CA0A9CF3B7</sign>
        //       </xml>`);
        // }
        var jsonobj = {
          appid:appid,
          attach:attach,
          body:body,
          mch_id:mch_id,
          nonce_str:nonce_str,
          notify_url:notify_url,
          out_trade_no:out_trade_no,
          spbill_create_ip:spbill_create_ip,
          total_fee:total_fee,
          trade_type:trade_type,
          //sign:sign,
        };

        let param = jsonobj;
        let stringSignTemp = Object.keys(param).filter((key)=>{
          return param[key] !== undefined && param[key] !== '' && ['pfx', 'partner_key', 'sign', 'key'].indexOf(key)<0;
          }).sort().map((key)=>{
          return key + '=' + param[key];
         }).join("&") + "&key=" + payobj.keystring;
        console.log("stringSignTemp:" + stringSignTemp);

        jsonobj.sign = CryptoJS.MD5(stringSignTemp).toString().toUpperCase();
        var builder = new xml2js.Builder({rootName:'xml'});
        var xml = builder.buildObject(jsonobj);
        console.log("xml:--->\n" + xml );
        var baseUrl = payobj.unifiedorderurl;//'https://api.mch.weixin.qq.com/pay/unifiedorder';


        request.post({
          url:baseUrl,
          body : xml,
          headers: {'Content-Type': 'text/xml'}
        },(error, response, body)=> {
            console.log("error:" + JSON.stringify(error));
            console.log("body:" + body);
            console.log("response:" + JSON.stringify(response));
            if(!error && body.length > 0){
              xml2js.parseString(body,(err,obj)=>{
                console.log("obj:" + JSON.stringify(obj));
                if(obj.xml.return_code == 'SUCCESS' ){
                  if(obj.xml.result_code == 'SUCCESS' ){
                    // {
                    // appid: 公众账号ID
                    // noncestr: 随机字符串
                    // package: 扩展字段
                    // partnerid: 商户号
                    // prepayid: 预支付交易会话ID
                    // timestamp: 时间戳
                    // sign: 签名
                    // }
                      var resultjson = {
                        appid:payobj.appid,
                        noncestr:nonce_str,//obj.xml.nonce_str[0],
                        package:payobj.package,
                        partnerid:payobj.mch_id,//'1286763701',
                        prepayid:obj.xml.prepay_id[0],
                        timestamp:moment().format('YYYYMMDDHH'),//yyyyMMddHHmmss
                      //  sign:jsonobj.sign,
                      //  code_url:obj.xml.code_url,
                    };

                     let param = resultjson;
                     let stringSignTemp = Object.keys(param).filter((key)=>{
                          return param[key] !== undefined && param[key] !== '' && ['pfx', 'partner_key', 'sign', 'key'].indexOf(key)<0;
                          }).sort().map((key)=>{
                          return key + '=' + param[key];
                        }).join("&") + "&key=" + payobj.keystring;
                      resultjson.sign = CryptoJS.MD5(stringSignTemp).toString().toUpperCase();
                      console.log("resultjson:" + JSON.stringify(resultjson));
                      resultcallback(null,resultjson);
                      //return resultjson;
                  }
                  else{
                    resultcallback("微信支付失败", obj.xml.return_msg);
                  }
                }
                else{
                  resultcallback("微信通讯失败", obj.return_msg);
                }
              });

            }
            else{
              let err = error?error:'failed';
              resultcallback(err, '支付失败');
            }
          });
        }
        else{
          resultcallback('获取支付信息失败', '不支持该支付方式');
        }

};

exports.getpayresultstring = getpayresultstring;
