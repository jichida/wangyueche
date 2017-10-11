import { createReducer } from 'redux-act';
import { mycoupongetall_result,logout_result } from '../actions';

const initial = {
  mycoupon: {
    couponlist:[]
  },
};

const mycoupon = createReducer({
  [logout_result]: (state, payload) => {
    return { ...initial.mycoupon};
  },
  [mycoupongetall_result]: (state,payload) => {
    let couponlist = payload.result.docs;
    return { ...state,couponlist};
  },
}, initial.mycoupon);

export default mycoupon;
