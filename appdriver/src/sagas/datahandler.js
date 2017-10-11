import {
    md_login_result,//这个result特殊，需要判断是否登录

    getbuscarpoolcitylist_request,
    getbuscarpool_request,
    getemerygencycontact_request,


    getabouthtml_request,
    getabouthtml_result,

    loginsendauth_request,
    loginwithauth_request,
    loginwithtoken_request,
    logout_request,
    getoftenuseaddress_request,
    setoftenuseaddress_request,
    searchtext_request,

    getcurrentlocationandnearestdrivers_request,
    updaterequeststatus_request,
    canceltriprequestorder_request,
    acceptrequest_request,
    getmytriporders_request,
    sendcurlocationtoserver,

    operatelogin,
    operatelogout,
    logout_result,
    updateorder_comment_request,

    carcreate_request,
    cardelete_request,
    cargetall_request,
    carupdate_request,
    cargetallbrands_request,
    cargetallmodelfrombrandid_request,
    cargetallcolors_request,

    carcreate_result,
    cardelete_result,
    cargetall_result,
    carupdate_result,
    cargetallbrands_result,
    cargetallmodelfrombrandid_result,
    cargetallcolors_result,
    updateorder_comment_result,
    serverpush_restoreorder,
    serverpush_driverlocation,
    serverpush_orderprice,

    serverpush_nearbyrequests,
    serverpush_nearbyrequests_removeone,
    serverpush_nearbyrequests_addone,
    getbuscarpool_result,
    getoftenuseaddress_result,
    getcurrentlocationandnearestdrivers_result,
    serverpush_triprequest,


    md_acceptrequest_result,
    md_loginsendauth_result,
    md_serverpush_triporder,
    md_serverpush_triprequestandorder,
    md_updaterequeststatus_result,
    md_canceltriprequestorder_result,

    register_request,
    md_register_result,
    common_err,

    fillrealnameprofile_request,
    md_fillrealnameprofile_result,

    carsetdefault_request,
    carsetdefault_result,

    getsystemconfig_result,
    withdrawcashapplyaddone_request,
    withdrawcashapplyaddone_result,
    withdrawcashapplyauth_request,
    withdrawcashapplyauth_result,

    getrechargerecords_request,
    getnotifymessage_request,
    md_getrechargerecords,
    md_getnotifymessage,
    md_getmytriporders,

    getnotifymessageone_request,
    getnotifymessageone_result,


    queryuserbalance_request,
    queryuserbalance_result,

    payorderwithcash_request,
    payorderwithcash_result,

    serverpush_userloginsuccess_notify,
    queryorder,

    login_request,
    findpwd_request,
    findpwd_result,

} from '../actions';


//接收的对应关系
exports.recvmessagetoresultpair = {
  'updateorder_comment_result':updateorder_comment_result,
  'serverpush_userloginsuccess_notify':serverpush_userloginsuccess_notify,
  'payorderwithcash_result':payorderwithcash_result,
  'queryuserbalance_result':queryuserbalance_result,
  'serverpush_userbalance':queryuserbalance_result,
  'getmytriporders_result':md_getmytriporders,
  'getrechargerecords_result':md_getrechargerecords,
  'getnotifymessage_result':md_getnotifymessage,
  'getnotifymessageone_result':getnotifymessageone_result,

  'withdrawcashapplyauth_result':withdrawcashapplyauth_result,
  'withdrawcashapplyaddone_result':withdrawcashapplyaddone_result,
  'getsystemconfig_result':getsystemconfig_result,
  'common_err':common_err,
  'carsetdefault_result':carsetdefault_result,
  'serverpush_userinfo':md_fillrealnameprofile_result,
  'fillrealnameprofile_result':md_fillrealnameprofile_result,
  'register_result':md_register_result,
  'login_result':md_login_result,
  'carcreate_result':carcreate_result,
  'cardelete_result':cardelete_result,
  'cargetall_result':cargetall_result,
  'carupdate_result':carupdate_result,
  'cargetallbrands_result':cargetallbrands_result,
  'cargetallmodelfrombrandid_result':cargetallmodelfrombrandid_result,
  'cargetallcolors_result':cargetallcolors_result,
  'updateorder_comment_result':updateorder_comment_result,
  'serverpush_restoreorder':serverpush_restoreorder,
  'serverpush_driverlocation':serverpush_driverlocation,
  'serverpush_orderprice':serverpush_orderprice,
  'findpwd_result':findpwd_result,
  'logout_result':logout_result,
  'serverpush_nearbyrequests':serverpush_nearbyrequests,
  'serverpush_nearbyrequests_removeone':serverpush_nearbyrequests_removeone,
  'serverpush_nearbyrequests_addone':serverpush_nearbyrequests_addone,
  'getbuscarpool_result':getbuscarpool_result,
  'getoftenuseaddress_result':getoftenuseaddress_result,
  'getcurrentlocationandnearestdrivers_result':getcurrentlocationandnearestdrivers_result,
  'serverpush_triprequest':serverpush_triprequest,

  'acceptrequest_result':md_acceptrequest_result,
  'loginsendauth_result':md_loginsendauth_result,
  'serverpush_triporder':md_serverpush_triporder,
  'serverpush_triprequestandorder':md_serverpush_triprequestandorder,
  'updaterequeststatus_result':md_updaterequeststatus_result,
  'canceltriprequestorder_result':md_canceltriprequestorder_result,
  'getabouthtml_result':getabouthtml_result,
};

//非验证发送接口
exports.sendmessagefnsz = {
  'logout':`${logout_request}`,
  'findpwd':`${findpwd_request}`,
  'login':`${login_request}`,
  'getnotifymessageone':`${getnotifymessageone_request}`,
  'getnotifymessage':`${getnotifymessage_request}`,
  'register':`${register_request}`,
  'getabouthtml':`${getabouthtml_request}`,
  'loginsendauth':`${loginsendauth_request}`,
  'loginwithauth':`${loginwithauth_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'getbuscarpoolcitylist':`${getbuscarpoolcitylist_request}`,
  'getbuscarpool':`${getbuscarpool_request}`,
  'getemerygencycontact':`${getemerygencycontact_request}`,
  'searchtext':`${searchtext_request}`,
  'getcurrentlocationandnearestdrivers':`${getcurrentlocationandnearestdrivers_request}`,
  'operatelogin':`${operatelogin}`,
  'operatelogout':`${operatelogout}`,

  'cargetallbrands':`${cargetallbrands_request}`,
  'cargetallmodelfrombrandid':`${cargetallmodelfrombrandid_request}`,
  'cargetallcolors':`${cargetallcolors_request}`,
};

//验证发送接口
exports.sendmessageauthfnsz = {
  'queryorder':`${queryorder}`,
  'payorderwithcash':`${payorderwithcash_request}`,
  'queryuserbalance':`${queryuserbalance_request}`,
  'getrechargerecords':`${getrechargerecords_request}`,
  'carsetdefault':`${carsetdefault_request}`,
  'fillrealnameprofile':`${fillrealnameprofile_request}`,
  'getbuscarpool':`${getbuscarpool_request}`,
  'getoftenuseaddress':`${getoftenuseaddress_request}`,
  'setoftenuseaddress':`${setoftenuseaddress_request}`,
  'acceptrequest':`${acceptrequest_request}`,
  'sendcurlocationtoserver':`${sendcurlocationtoserver}`,
  'updaterequeststatus':`${updaterequeststatus_request}`,
  'canceltriprequestorder':`${canceltriprequestorder_request}`,
  'getmytriporders':`${getmytriporders_request}`,
  'updateorder_comment':`${updateorder_comment_request}`,
  'withdrawcashapplyaddone':`${withdrawcashapplyaddone_request}`,
  'withdrawcashapplyauth':`${withdrawcashapplyauth_request}`,
  'carcreate':`${carcreate_request}`,
  'cardelete':`${cardelete_request}`,
  'cargetall':`${cargetall_request}`,
  'carupdate':`${carupdate_request}`,
}
