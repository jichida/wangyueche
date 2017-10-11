/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
  getrechargerecords_result
} from '../actions';

const initial = {
    recharge: {
        rechargelist:[]
    },
};

const recharge = createReducer({
  [getrechargerecords_result]: (state, payload) => {
      let rechargelist = [...payload.result.docs];
      return {
          ...state,
          rechargelist
      };
    }
}, initial.recharge);

export default recharge;
