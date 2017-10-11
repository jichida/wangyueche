import {config} from './Config';
const model="run"; //test测试模式   run运行
/**
 * 判断内核
   @method JudgmentKernel
   @since 1.0
 */
export const JudgmentKernel = () =>{
	if(JudgmentNullOrEmpty(localStorage.kernel)==''){
		let ua = window.navigator.userAgent.toLowerCase();
		if (/iphone|ipad|ipod/.test(ua)) {
			localStorage.kernel='ios';
		} else if (/android/.test(ua)) {
			localStorage.kernel='android';
		}
	}
	return localStorage.kernel;
}
/**
 * 判断是否是undefined，null或者''
   @method JudgmentNullOrEmpty
   @param str {object} 字符串或对象
   @since 1.0
 */
export const JudgmentNullOrEmpty = (str) => {
	if(typeof str!='undefined' && str!=null && str!='' && str!='undefined'){
		return str;
	}else{
		return '';
	}
}
/**
 * 建外部js
   @method CreateScript
   @param src {string} js的链接地址
   @param param {json} 其他参数
   @param fun {func} 回调方法
   @since 1.0
 */
export const CreateScript = (src,param,callback) => {
	let script,dom = document.getElementsByTagName("script");
	for(let i = 0;i < dom.length;i++){
		for(let attr in dom[i].attributes){
			if(attr.value==src){
				script=dom[i];
				break;
			}
		}
		if(typeof script!='undefined')
			break;
	}
	if(typeof script=='undefined'){
		script=document.createElement("script");
		script.src=src;
		document.body.appendChild(script);
	}
	if (script.complete) {
      callback();
    } else {
      script.onload = callback;
    }
}
