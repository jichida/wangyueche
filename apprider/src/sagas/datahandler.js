import {
    getbuscarpool_request,
    getemerygencycontact_request,
    getemerygencycontact_result,

    gettourbus_request,

    getabouthtml_request,

    loginsendauth_request,
    loginwithauth_request,
    loginwithtoken_request,

    getoftenuseaddress_request,
    setoftenuseaddress_request,
    searchtext_request,

    logout_request,
    logout_result,
    getnearestdrivers_request,
    starttriprequestorder_request,
    canceltriprequestorder_request,
    pushrequesttodrivers_request,
    insertorder_request,
    getmytriporders_request,
    getprice_request,
    getpaysign_request,
    fillprofile_request,

    updateorder_comment_request,

    getsystemconfig_result,
    updateorder_comment_result,
    serverpush_restoreorder,
    serverpush_driverlocation,
    serverpush_orderprice,

    getprice_result,

    getabouthtml_result,
    login_result,
    fillprofile_result,
    common_err,
    getbuscarpool_result,
    gettourbus_result,

    getoftenuseaddress_result,
    setoftenuseaddress_result,
    searchtext_result,
    getnearestdrivers_result,
    serverpush_triprequest,

    oauthbinduser_request,
    md_oauthbinduser,

    insertorder_result,
    getpaysign_result,
    md_serverpush_triporder,
    md_loginsendauth_result,
    md_serverpush_triprequestandorder,
    md_starttriprequestorder_result,
    md_canceltriprequestorder_result,


    rechargepay_request,
    rechargepay_result,

    payorder_request,
    payorder_result,

    serverpush_userbalance,
    queryuserbalance_request,
    queryuserbalance_result,

    getrechargerecords_request,

    insertemerygencycontact_request,
    insertemerygencycontact_result,
    deleteemerygencycontact_request,
    deleteemerygencycontact_result,

    getnotifymessage_request,

    mycoupongetall_request,

    md_getrechargerecords,
    md_getnotifymessage,
    md_getmytriporders,
    md_mycoupongetall,

    getnotifymessageone_request,
    getnotifymessageone_result,

    getorderdetail_request,
    getorderdetail_result,

    serverpush_userloginsuccess_notify,
    queryorder,

    pushrequesttodrivers_result,
    loginwithoauth_request,
    loginwithoauth_result,
} from '../actions';


//接收的对应关系
exports.recvmessagetoresultpair = {
  'oauthbinduser_result':md_oauthbinduser,
  'loginwithoauth_result':loginwithoauth_result,
  'pushrequesttodrivers_result':pushrequesttodrivers_result,
  'serverpush_userloginsuccess_notify':serverpush_userloginsuccess_notify,
  'getorderdetail_result':getorderdetail_result,
  'getnotifymessageone_result':getnotifymessageone_result,

  'mycoupongetall_result':md_mycoupongetall,
  'getnotifymessage_result':md_getnotifymessage,
  'getrechargerecords_result':md_getrechargerecords,
  'getmytriporders_result':md_getmytriporders,

  'getemerygencycontact_result':getemerygencycontact_result,
  'insertemerygencycontact_result':insertemerygencycontact_result,
  'deleteemerygencycontact_result':deleteemerygencycontact_result,
  'serverpush_userbalance':serverpush_userbalance,
  'queryuserbalance_result':queryuserbalance_result,
  'payorder_result':payorder_result,
  'rechargepay_result':rechargepay_result,
  'getsystemconfig_result':getsystemconfig_result,
  'updateorder_comment_result':updateorder_comment_result,
  'serverpush_restoreorder':serverpush_restoreorder,
  'serverpush_driverlocation':serverpush_driverlocation,
  'serverpush_orderprice':serverpush_orderprice,

  'getprice_result':getprice_result,
  'logout_result':logout_result,
  'getabouthtml_result':getabouthtml_result,
  'login_result':login_result,
  'fillprofile_result':fillprofile_result,
  'common_err':common_err,
  'getbuscarpool_result':getbuscarpool_result,
  'gettourbus_result':gettourbus_result,
  'getoftenuseaddress_result':getoftenuseaddress_result,
  'setoftenuseaddress_result':setoftenuseaddress_result,
  'searchtext_result':searchtext_result,
  'getnearestdrivers_result':getnearestdrivers_result,
  'serverpush_triprequest':serverpush_triprequest,
  'serverpush_triporder':md_serverpush_triporder,
  'loginsendauth_result':md_loginsendauth_result,
  'serverpush_triprequestandorder':md_serverpush_triprequestandorder,
  'starttriprequestorder_result':md_starttriprequestorder_result,

  'insertorder_result':insertorder_result,
  'canceltriprequestorder_result':md_canceltriprequestorder_result,
  'getpaysign_result':getpaysign_result
};

//非验证发送接口
exports.sendmessagefnsz = {
  'oauthbinduser':`${oauthbinduser_request}`,
  'getnotifymessageone':`${getnotifymessageone_request}`,
  'getnotifymessage':`${getnotifymessage_request}`,
  'getabouthtml':`${getabouthtml_request}`,
  'loginsendauth':`${loginsendauth_request}`,
  'loginwithauth':`${loginwithauth_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'loginwithoauth':`${loginwithoauth_request}`,
  'getbuscarpool':`${getbuscarpool_request}`,

  'getnearestdrivers':`${getnearestdrivers_request}`,
  'gettourbus':`${gettourbus_request}`,
  'getprice':`${getprice_request}`,
};

//验证发送接口
exports.sendmessageauthfnsz = {
  'queryorder':`${queryorder}`,
  'getorderdetail':`${getorderdetail_request}`,
  'mycoupongetall':`${mycoupongetall_request}`,
  'insertemerygencycontact':`${insertemerygencycontact_request}`,
  'deleteemerygencycontact':`${deleteemerygencycontact_request}`,
  'getrechargerecords':`${getrechargerecords_request}`,
  'queryuserbalance':`${queryuserbalance_request}`,
  'payorder':`${payorder_request}`,
  'rechargepay':`${rechargepay_request}`,
  'getemerygencycontact':`${getemerygencycontact_request}`,
  'getoftenuseaddress':`${getoftenuseaddress_request}`,
  'setoftenuseaddress':`${setoftenuseaddress_request}`,
  'starttriprequestorder':`${starttriprequestorder_request}`,
  'canceltriprequestorder':`${canceltriprequestorder_request}`,
  'pushrequesttodrivers':`${pushrequesttodrivers_request}`,
  'getmytriporders':`${getmytriporders_request}`,
  'insertorder':`${insertorder_request}`,
  'getpaysign':`${getpaysign_request}`,
  'fillprofile':`${fillprofile_request}`,
  'updateorder_comment':`${updateorder_comment_request}`,
  'logout':`${logout_request}`,
}
