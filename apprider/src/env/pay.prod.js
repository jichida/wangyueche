
import * as xview from './xview/Common.js';

 export const payorder = (paysign,orderinfo,callbackfn)=>{
   try{
     if(orderinfo.paytype === 'weixin'){
       xview.wxpayUrl(paysign,(result)=>{
         callbackfn(result);
      });
     }
     else if(orderinfo.paytype === 'alipay'){
        xview.alipayUrl(paysign,(result)=>{
          callbackfn(result);
       });
     }
     else if(orderinfo.paytype === 'leftbalance'){
       callbackfn(paysign);
     }
   }
   catch(e){
     alert(`paytype:${orderinfo.paytype}
       paysign:${JSON.stringify(paysign)}
       payorder错误.${JSON.stringify(e)}`);
     callbackfn(paysign);
   }

 }
