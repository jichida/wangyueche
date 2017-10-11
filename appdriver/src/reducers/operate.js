import { createReducer } from 'redux-act';
import {
    setbizstatus,
    setcurlocation,
    serverpush_nearbyrequests,
    serverpush_nearbyrequests_removeone,
    serverpush_nearbyrequests_addone,
    carmap_resetmap
} from '../actions';
import {normalizr_requestlist} from './normalizr';
import _ from 'lodash';

const locz = [0,0];
const initial = {
  operate: {
    driverstatus:'未接单',//‘已接单’
    bizstatusstring:'停运',//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
    bizstatus:4,//营运状态	1:载客、2.接单、3 :空驶、4.停运==>停运->空驶->接单->载客->空驶
    curlocation:{lat:locz[1],lng:locz[0]},//当前位置，一直在变化
    nearbyrequests:{
        list:[],
        requests:{
        }
    }
  },
};

const bizstatusstringmap = {
  '载客':1,
  '接单':2,
  '空驶':3,
  '停运':4
};

const operate = createReducer({
  [carmap_resetmap]:(state,initobj)=> {
    let nearbyrequests = {
      list:[],
      requests:{}
    };
    return { ...state,nearbyrequests};
  },
  [setbizstatus]:(state, payload) => {
    let bizstatusstring = payload;
    let bizstatus = bizstatusstringmap[bizstatusstring];
    return { ...state,bizstatus,bizstatusstring};
  },
  [setcurlocation]:(state, payload) => {
    let curlocation = payload;
    return { ...state,curlocation};
  },
  [serverpush_nearbyrequests]:(state, payload) => {
    console.log('serverpush_nearbyrequests...');
    const {list} = payload;
    let nearbyrequestsresult = normalizr_requestlist({list});
    let nearbyrequests = {
      list:nearbyrequestsresult.result.list||[],
      requests:nearbyrequestsresult.entities.requests||{}
    };
    return { ...state,nearbyrequests};
  },
  [serverpush_nearbyrequests_addone]:(state, payload) => {
    let nearbyrequestslist = [payload._id,...state.nearbyrequests.list];
    let requestsentities = state.nearbyrequests.requests;
    requestsentities[payload._id] = payload;
    return { ...state,nearbyrequests:{
        list:[...nearbyrequestslist],
        requests:{
          ...requestsentities
        }
    }
    };
  },
  [serverpush_nearbyrequests_removeone]:(state, payload) => {
    let nearbyrequestslist = [];
    _.map(state.nearbyrequests.list,(requestid)=>{
      if(requestid !== payload._id){
        nearbyrequestslist.push(requestid);
      }
    });
    let requestsentities = state.nearbyrequests.requests;
    delete requestsentities[payload._id];
    return { ...state,nearbyrequests:{
          list:[...nearbyrequestslist],
          requests:{
              ...requestsentities
          }
      }
    };
  },

}, initial.operate);

export default operate;
