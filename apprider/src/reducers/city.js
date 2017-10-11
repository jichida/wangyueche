import { createReducer } from 'redux-act';
import {
  setcurcity,
  setcurselcity
} from '../actions';

let defaultcurselcity = {
    "cityname": "天长",
    "zipcode": "0550",
    "pinyin": "Tianchang"
};

let dcscl = localStorage.getItem('defaultcurselcity');
if(!!dcscl){
  try{
    dcscl = JSON.parse(dcscl);
    defaultcurselcity = dcscl;
  }
  catch(e){
  }
}


const initial = {
  city: {
    curcity: defaultcurselcity,
    curselcity:defaultcurselcity,
  },
};

const city = createReducer({
  [setcurcity]:(state, payload) => {
    return { ...state,curcity:{...payload}};
  },
  [setcurselcity]:(state, payload) => {
    localStorage.setItem('defaultcurselcity',JSON.stringify(payload));
    return { ...state,curselcity:{...payload}};
  },
}, initial.city);

export default city;
