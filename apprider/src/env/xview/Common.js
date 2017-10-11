 import {config} from './Config';
 /**
  *  微信，qq，微博及连连整合方法 (一般不用直接调用，不过也提供一个函数)
  @method xviewPhoneWithAppDataWithCallbackMethodWithType
  @param data {json} 需要的json数据
  @param fun {string} 回调函数名
  @param typeString {string} 类型
          1-微信登陆 2-微博登陆 3-QQ登陆
          4-支付宝支付 5-微信支付 6-连连支付
          7-分享给微信好友 8-微信朋友圈
          9-分享给QQ好友  10-分享到QQ空间  11-分享到微博
  @since 2.0
  */
 const xviewPhoneWithAppDataWithCallbackMethodWithType = (data,fun,typeString) => {
   window.xviewCallBack_xphone=function(result){
     fun(result);
   };
   window.xview.xviewPhoneWithAppDataWithCallbackMethodWithType(JSON.stringify(data),"xviewCallBack_xphone",typeString);
 }
 /**
   * 微信登录
   @method loginToWeixin
   @param fun {object} 调起支付后的回调方法
   @since 2.0
  */
  export const loginToWeixin = (fun) => {
    var data={"xview":"WeChat Login","wxappid":config.wxappid,"wxappsecret":config.wxappsecret};
    xviewPhoneWithAppDataWithCallbackMethodWithType(data,fun,"1");
  }
  /**
   *  qq登录
   @method loginToTencentQQ
   @param fun {object} 调起支付后的回调方法
   @since 2.0
   */
  export const loginToTencentQQ = (fun) => {
    //调用xview中的方法
    var data={"xview":"QQ Login","qqappid":config.qqappid,"qqappsecret":""};
    xviewPhoneWithAppDataWithCallbackMethodWithType(data,fun,"3");
  }
  /**
   * 微博登录
   @method loginToWeibo
   @param fun {object} 调起支付后的回调方法
   @since 2.0
   */
  export const loginToWeibo = (fun) => {
    //调用xview中的方法
    var data={"xview":"Microblog Login","wbappkey":config.wbappkey,"wbappsecret":config.wbappsecret,"wbRedirectUrl":config.wbRedirectUrl,"wbAuthoUrl":config.wbAuthoUrl};
    xviewPhoneWithAppDataWithCallbackMethodWithType(data,fun,"2");
  }
   //----------------分享的方法-------------------
  /**
   *  分享给微信朋友
   @method shareToWeixinFriendUrl
   @param data {json} 第三方分享需要的json数据
   @example {"title":"分享标题", "descrption":"分享简介", "picture":"图片地址", "url":"跳转链接地址"}
   @since 2.0
   */
  export const shareToWeixinFriendUrl = (data,fun) => {
    //data=JSON.stringify(data);
    data.wxappid=config.wxappid;
    data.wxappsecret=config.wxappsecret;
    xviewPhoneWithAppDataWithCallbackMethodWithType(data,fun,"7");
  }
  /**
   *  分享到微信朋友圈
   @method shareToWeixinCircleUrl
   @param data {json} 第三方分享需要的json数据
   @example {"title":"分享标题", "descrption":"分享简介", "picture":"图片地址", "url":"跳转链接地址"}
   @since 2.0
   */
  export const shareToWeixinCircleUrl = (data,fun) => {
    data.wxappid=config.wxappid;
    data.wxappsecret=config.wxappsecret;
    xviewPhoneWithAppDataWithCallbackMethodWithType(data,fun,"8");
  }
  /**
   *  分享到腾讯qq好友
   @method shareToTencentQQUrl
   @param data {json} 第三方分享需要的json数据
   @example {"title":"分享标题", "descrption":"分享简介", "picture":"图片地址", "url":"跳转链接地址"}
   @since 2.0
   */
  export const shareToTencentQQUrl = (data,fun) => {
    data.qqappid=config.qqappid;
    data.qqappsecret="";
    xviewPhoneWithAppDataWithCallbackMethodWithType(data,fun,"9");
  }
  /**
   *  分享到腾讯qq空间
   @method shareToTencentQQUrl
   @param data {json} 第三方分享需要的json数据
   @example {"title":"分享标题", "descrption":"分享简介", "picture":"图片地址", "url":"跳转链接地址"}
   @since 2.0
   */
  export const shareToTencentQQZoneUrl = (data,fun) => {
    data.qqappid=config.qqappid;
    data.qqappsecret="";
    xviewPhoneWithAppDataWithCallbackMethodWithType(data,fun,"10");
  }
  /**
   *  分享到微博
   @method shareToWeiboUrl
   @param data {json} 第三方分享需要的json数据
   @example {"title":"分享标题", "descrption":"分享简介", "picture":"图片地址", "url":"跳转链接地址"}
   @since 2.0
   */
  export const shareToWeiboUrl = (data,fun) => {
    data.wbappkey=config.wbappkey;
    data.wbappsecret=config.wbappsecret;
    data.wbRedirectUrl=config.wbRedirectUrl;
    data.wbAuthoUrl=config.wbAuthoUrl;
    xviewPhoneWithAppDataWithCallbackMethodWithType(data,fun,"11");
  }
  //----------------支付的方法-------------------
  /**
   *  支付宝支付
   @method alipayUrl
   @param data {json} 调起支付宝支付需要的json数据
   @param url {string} 支付宝支付完成后的回调页面地址
   @since 2.0
   */
  export const alipayUrl = (data,fun) => {
    var postData={code:data};
    xviewPhoneWithAppDataWithCallbackMethodWithType(postData,fun,"4");
  }
  /**
   *  微信支付
   @method wxpayUrl
   @param data {json} 调起微信支付需要的json数据
   @param url {string} 微信支付完成后的回调页面地址
   @since 2.0
   */
  export const wxpayUrl = (data,fun) => {
    data.wxappid=config.wxappid;
    data.wxappsecret=config.wxappsecret;
    xviewPhoneWithAppDataWithCallbackMethodWithType(data,fun,"5");
  }
  /**
   * 原生弹框
   @method showiPhoneAlertWithAppDataTypeWithCallbackMethod
   @param data {function} 展示的数据
   {"title":"", "message":"", "button","["取消", "确定", "...", "..."]"}
   @param type {function} 类型
    alert->alert，
    input->input,
    actionsheet->ActionSheet，
    time->时间选择器，
    date->日期选择器
    disappear->自动消失的提示框设了3秒
    wait->转圈的，现在设了5秒
   @param fun {function} 回调方法
   @since 2.0
   */
  export const showiPhoneAlertWithAppDataTypeWithCallbackMethod=(dataString,typeString,fun) => {
    window.xviewCallBack_showiphone=function(result){
      fun(result);
    };
    window.xview.showiPhoneAlertWithAppDataTypeWithCallbackMethod(dataString,typeString,"xviewCallBack_showiphone");
  }

  /**
   * 退出App
   @method exitApp
   @since 2.0
   */
  export const exitApp = () => {
  	 window.xview.exitApp();
  }
  /**
   * 跳转浏览器（打开app）
   @method openiPhoneApp
   @param url {function} 需要打开的网址或者app的App URL scheme
   @since 2.0
   */
  export const openiPhoneApp = (url) => {
  	if(url.indexOf("http://"!=0)){
  		url="http://"+url;
  	}
    window.xview.openiPhoneApp(url);
  }
  /**
   * 获取通讯录信息
   @method getPhoneBook
   @since 2.0
   */
  export const getPhoneBook = (fun) => {
  	window.xviewCallBackgetPhoneBook=function(result){
      fun(result);
    };
  	 window.xview.getPhoneBook("xviewCallBackgetPhoneBook")
  }
  /**
   * 拨打电话
   @method callPhoneNumber
   @since 2.0
   */
  export const LocalPhoneTelPhoneUOperationNameStartTimeUrlCallBack = (
  	phone,
  	phone2,
  	u,
  	operation,
  	name,
  	startTime,
  	url,
  	fun) => {
  	//console.log(phone+"-"+phone2+"-"+u+"-"+operation+"-"+name+"-"+startTime+"-"+url);
  	window.xviewCallBack=function(result){
      fun(result);
    };
	window.xview.LocalPhoneTelPhoneUOperationNameStartTimeUrlCallBack(
		phone,
		phone2,
		u,
	  	operation,
	  	name,
	  	startTime,
	  	url,
	"xviewCallBack");
  }
  /**
   * 调起短信
   @method sendSmsWithPhoneNumber
   @since 2.0
   */
  export const sendSmsWithPhoneNumber = (phone,fun) => {
  	window.xviewCallBack_sendSmsWithPhoneNumber=function(result){
      fun(result);
    };
  	window.xview.sendSmsWithPhoneNumber(phone,"xviewCallBack_sendSmsWithPhoneNumber");
  }
 /**
   * 获取经纬度
   @method getLocation
   @since 2.0
   */
  export const geographyLocationCallbackMethod = (fun) => {
    window.callBack_geographyLocation=function(result){
      fun(result);
    };
    window.xview.geographyLocationCallbackMethod("callBack_geographyLocation");
  }

  /**
    * 设置推送用户名
    @method jiGuangTuiSong
    @since 2.0
    */
   export const jiGuangTuiSong = (name) => {
     window.xview.jiGuangTuiSong(name);
   }
   /**
     * 取消单推
     @method cancelJPushAlisa
     @since 2.0
     */
    export const cancelJPushAlisa = () => {
      window.xview.cancelJPushAlisa();
    }
    /**
     *  拨打手机号码
     @method jsCallPhone
     @param phone {string} 手机号码
     @since 2.0
     */
     export const jsCallPhone = (phone) => {
       window.xview.jsCallPhone(phone);
     }
