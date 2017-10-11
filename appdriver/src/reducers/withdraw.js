import { createReducer } from 'redux-act';
import {
  getrechargerecords_result
} from '../actions';


const initial = {
  withdraw: {
    rechargerecordlist:[],
  },
};

const withdraw = createReducer({
  [getrechargerecords_result]:(state,payload)=>{
    const {list:rechargerecordlist} = payload;
    return {...state,rechargerecordlist};
  },
}, initial.withdraw);

export default withdraw;
