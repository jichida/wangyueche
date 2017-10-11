import { createReducer } from 'redux-act';
import {
  getmypincheroute_result,
} from '../actions';
import _ from 'lodash';

const initial = {
  route: {
    pincheroutes:{},
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
}, initial.route);

export default route;
