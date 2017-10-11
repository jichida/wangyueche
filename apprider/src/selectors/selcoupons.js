import { createSelector } from 'reselect';
import _ from 'lodash';

const getcoupons = (state,props)=>{
    const {mycoupon:{couponlist}} = state;
    return couponlist;
}

const getorderinfo = (state,props)=>{
    const {myorders} = state;
    let triporderid = props.match.params.sel;
    if(triporderid === 'nosel'){
        return {_id:'nosel'};
    }
    let orderinfo = myorders.triporders[triporderid];
    return orderinfo;
}

const getmycoupons = createSelector(
    [getcoupons,getorderinfo],
    (couponlist,orderinfo)=>{
        let mycoupons = [];
        _.map(couponlist,(coupon)=>{
            if(orderinfo._id !== 'nosel'){
                coupon.enabled = (coupon.triptype === orderinfo.triptype);
                coupon.showenabled = coupon.enabled;
                if(!coupon.enabled){
                  coupon.uselessreason = `当前是${orderinfo.triptype}订单,仅限${coupon.triptype}使用`;
                }
                else{
                  //已过期，已使用就不要判断了，不要发给客户端
                }
            }
            else{
              coupon.enabled = false;
              coupon.showenabled = true;
            }
            mycoupons.push(coupon);
        });
        return {couponlist:mycoupons,sel:true};
    }
);
export default getmycoupons;
