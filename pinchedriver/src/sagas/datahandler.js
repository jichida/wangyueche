import {
    common_err,

    login_request,
    login_result,//这个result特殊，需要判断是否登录

    logout_request,
    logout_result,

    getmypincheroute_request,
    getmypincheroute_result,

    getonepincheroutepassengers_request,
    getonepincheroutepassengers_result,

    getsystemconfig_result,

    getnotifymessage_request,
    getnotifymessage_result,

    getnotifymessageone_request,
    getnotifymessageone_result,

    getabouthtml_request,
    getabouthtml_result,
  } from '../actions';


//接收的对应关系
let recvmessagetoresultpair = {
  'getnotifymessage_result':getnotifymessage_result,
  'getnotifymessageone_result':getnotifymessageone_result,

  'getsystemconfig_result':getsystemconfig_result,

  'common_err':common_err,

  'login_result':login_result,
  'logout_result':logout_result,

  'getmypincheroute_result':getmypincheroute_result,
  'getonepincheroutepassengers_result':getonepincheroutepassengers_result,

  'getabouthtml_result':getabouthtml_result,
};

//非验证发送接口
let sendmessagefnsz = {
  'getabouthtml':`${getabouthtml_request}`,
  'logout':`${logout_request}`,
  'login':`${login_request}`,
  'getnotifymessage':`${getnotifymessage_request}`,
  'getnotifymessageone':`${getnotifymessageone_request}`,
};

//验证发送接口
let sendmessageauthfnsz = {
  'getmypincheroute':`${getmypincheroute_request}`,
  'getonepincheroutepassengers':`${getonepincheroutepassengers_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
