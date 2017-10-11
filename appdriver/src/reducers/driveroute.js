import { createReducer } from 'redux-act';
import {
  driveroute_result
} from '../actions';

const initial = {
    driveroute: {
      drawroute:false,
      totaldistancetxt:'',
      totaldurationtxt:'',
      instruction:'',
      latlngs:[]
    },
};

const driveroute = createReducer({
    [driveroute_result]:(state,payload)=>{
      let {drawroute,totaldistancetxt,totaldurationtxt,instruction,latlngs} = state;
      drawroute = payload.drawroute || drawroute;
      totaldistancetxt = payload.totaldistancetxt || totaldistancetxt;
      totaldurationtxt = payload.totaldurationtxt || totaldurationtxt;
      instruction = payload.instruction || instruction;
      latlngs = payload.latlngs || latlngs;
      return {...state,drawroute,totaldistancetxt,totaldurationtxt,instruction,latlngs};
    },
}, initial.driveroute);

export default driveroute;
