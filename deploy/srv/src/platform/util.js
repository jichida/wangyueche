/**
 * Created by wangxiaoqing on 2017/3/21.
 */
var moment = require('moment');
let gettimeformat =(datemine)=>{
    if (typeof datemine === 'string') {
        datemine = new Date(Date.parse(datemine));
    }
    return datemine;
    // let dateminestring = moment(datemine).format("YYYYMMDDhhmmss");
    // let ltime = parseInt(dateminestring, 10);
    // return ltime;
}

const CHINA_MOBILE_TYPE = 2; /*中国移动号码段*/
const CHINA_UNICOM_TYPE = 1; /*中国联通号码段*/
const CHINA_TELECOM_TYPE = 3;/*中国电信号码段*/
const CHINA_OTHER = 4;
let mobile_list = [];
for(let i = 0; i< 200; i++){
  mobile_list[i] = CHINA_OTHER;
}
/*中国移动号码段*/
mobile_list[134] = CHINA_MOBILE_TYPE;
mobile_list[135] = CHINA_MOBILE_TYPE;
mobile_list[136] = CHINA_MOBILE_TYPE;
mobile_list[137] = CHINA_MOBILE_TYPE;
mobile_list[138] = CHINA_MOBILE_TYPE;
mobile_list[139] = CHINA_MOBILE_TYPE;
mobile_list[147] = CHINA_MOBILE_TYPE;
mobile_list[150] = CHINA_MOBILE_TYPE;
mobile_list[151] = CHINA_MOBILE_TYPE;
mobile_list[152] = CHINA_MOBILE_TYPE;
mobile_list[157] = CHINA_MOBILE_TYPE;
mobile_list[158] = CHINA_MOBILE_TYPE;
mobile_list[159] = CHINA_MOBILE_TYPE;
mobile_list[178] = CHINA_MOBILE_TYPE;
mobile_list[182] = CHINA_MOBILE_TYPE;
mobile_list[183] = CHINA_MOBILE_TYPE;
mobile_list[184] = CHINA_MOBILE_TYPE;
mobile_list[187] = CHINA_MOBILE_TYPE;
mobile_list[188] = CHINA_MOBILE_TYPE;

/*中国联通号码段*/
mobile_list[130] = CHINA_UNICOM_TYPE;
mobile_list[131] = CHINA_UNICOM_TYPE;
mobile_list[132] = CHINA_UNICOM_TYPE;
mobile_list[145] = CHINA_UNICOM_TYPE;
mobile_list[155] = CHINA_UNICOM_TYPE;
mobile_list[156] = CHINA_UNICOM_TYPE;
mobile_list[171] = CHINA_UNICOM_TYPE;
mobile_list[176] = CHINA_UNICOM_TYPE;
mobile_list[185] = CHINA_UNICOM_TYPE;
mobile_list[186] = CHINA_UNICOM_TYPE;

/*中国电信号码段*/
mobile_list[133] = CHINA_TELECOM_TYPE;
mobile_list[153] = CHINA_TELECOM_TYPE;
mobile_list[177] = CHINA_TELECOM_TYPE;
mobile_list[180] = CHINA_TELECOM_TYPE;
mobile_list[181] = CHINA_TELECOM_TYPE;
mobile_list[189] = CHINA_TELECOM_TYPE;
mobile_list[149] = CHINA_TELECOM_TYPE;
//手机运营商	1.中国联通 2 .中国移动 3 .中国电信 4 :其他
let getmobilenettype = (phonenumber)=>{
  let result = CHINA_OTHER;
  if(phonenumber.length > 3){
    let headers = phonenumber.slice(0,3);
    let headeri = parseInt(headers);
    if(headeri < 200 && headeri > 0){
      result = mobile_list[headeri];
    }
  }
  return result;
}


exports.gettimeformat = gettimeformat;
exports.getmobilenettype = getmobilenettype;
