
import {
  requestpost,
} from '../util/util.js';


export const payorder = (paysign,orderinfo,callbackfn)=>{
  let postdata = {
      "out_trade_no":orderinfo._id
  };

  if(orderinfo.paytype !== 'leftbalance'){
    requestpost('/pay/alipaytest',postdata,(err,result)=>{
        console.log("testpost err:" + JSON.stringify(err));
        console.log("testpost result:" + JSON.stringify(result));
        callbackfn({});
    });
  }
  else if(orderinfo.paytype === 'leftbalance'){
     callbackfn(paysign);
   }

}
