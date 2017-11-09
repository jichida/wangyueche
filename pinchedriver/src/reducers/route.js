import { createReducer } from 'redux-act';
import {
  getmypincheroute_result,
  getonepincheroutepassengers_result
} from '../actions';
import _ from 'lodash';

const initial = {
  route: {
    pincheroutes:{},
    passengers:[]
  },
};

const route = createReducer({
  [getmypincheroute_result]:(state,payload)=>{
    let {result:{docs}} = payload;
    let pincheroutes = state.pincheroutes;
    _.map(docs,(routedetail)=>{
      pincheroutes[routedetail._id] = routedetail;
    });
    return {...state,pincheroutes};
  },
  [getonepincheroutepassengers_result]:(state,payload)=>{
    let {result} = payload;
    let passengers = [];
    _.map(result,(passengerinfo)=>{
      passengers.push({
        userid:passengerinfo._id,
        seatnumbertotal:passengerinfo.seatnumbertotal,
        username:passengerinfo.username[0]
      });
    });
    return {...state,passengers};
  }
}, initial.route);

export default route;

// {"result":[{"_id":"5a03f5aa79778300017e86ed","seatnumbertotal":1,"username":["15961125167"],"userid":["5a03f5aa79778300017e86ed"]}]}
