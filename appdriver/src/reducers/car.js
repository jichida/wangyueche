import { createReducer } from 'redux-act';
import {
  cargetall_result,
  cargetallbrands_result,
} from '../actions';


const initial = {
  car: {
    carlist:[],
  },
};

const car = createReducer({
  [cargetall_result]:(state,payload)=>{
    const {list:carlist} = payload;
    return {...state,carlist};
  },
  [cargetallbrands_result]:(state,payload)=>{
    return {...state,...payload};
  },
}, initial.car);

export default car;
