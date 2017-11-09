import { createReducer } from 'redux-act';
import {
    carmap_setmapinited,
    carmap_setmapcenter,
} from '../actions';
import _ from 'lodash';

import L from 'leaflet';

const locz = [0,0];


const initial = {
    carmap: {
        isMapInited:false,
        zoomlevel:16,//缩放等级
        mapcenterlocation:L.latLng(locz[1], locz[0]),//当前位置
    },
};

const carmap = createReducer({
    [carmap_setmapinited]:(state,isMapInited)=>{
      return {...state,isMapInited}
    },
    [carmap_setmapcenter]:(state,payload)=>{
      let mapcenterlocation = L.latLng(payload.lat, payload.lng)
      return {...state,mapcenterlocation}
    },
}, initial.carmap);

export default carmap;
