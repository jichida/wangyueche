import { createReducer } from 'redux-act';
import {
  carmap_setenableddrawmapflag,
  carmap_setzoomlevel,
  selrequest,
  carmap_setmapcenter,
  acceptrequest_result,
  carmap_resetmap,
  setcurlocation,
  serverpush_triprequest,
  serverpush_triporder,
  serverpush_triprequestandorder,
  updaterequeststatus_result,
  carmap_setmapinited,
  serverpush_driverlocation,
  serverpush_orderprice,
  serverpush_restoreorder
} from '../actions';

import L from 'leaflet';
const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERDIRVER = 4;
const ISENABLEDDRAW_ROUTELEFT = 32;
// const ISENABLEDDRAW_ROUTEPASTPTS = 64;
// const ISENABLEDDRAW_POPWITHSTART = 128;
const ISENABLEDDRAW_POPWITHCUR  = 256;

const locz =[0,0];
const initial = {
    carmap: {
        isMapInited:false,
        zoomlevel:15,
        markerstartlatlng:L.latLng(locz[1], locz[0]),//起始位置
        markerendlatlng:L.latLng(locz[1], locz[0]),//目的位置
        driverlocation:L.latLng(locz[1], locz[0]),//司机位置
        mapcenterlocation:L.latLng(locz[1], locz[0]),//地图中心位置
        enableddrawmapflag:0,//画图标志
        routepastpts:[],
        curmappageorder:{
        },
        curmappagerequest:{
        }
    },
};

const carmap = createReducer({
    [carmap_setenableddrawmapflag]:(state,payload)=>{
      let enableddrawmapflag = payload;
      return {...state,enableddrawmapflag};
    },
    [serverpush_restoreorder]:(state,payload)=>{
      let curmappagerequest = payload.triprequest;
      let curmappageorder = payload.triporder;
      let markerstartlatlng = L.latLng(curmappagerequest.srcaddress.location.lat,curmappagerequest.srcaddress.location.lng);//lat,lng
      let markerendlatlng = L.latLng(curmappagerequest.dstaddress.location.lat, curmappagerequest.dstaddress.location.lng);//lat,lng
      let mapcenterlocation = markerstartlatlng;
      return {...state,curmappagerequest,curmappageorder,
      markerstartlatlng,markerendlatlng,mapcenterlocation};
    },
    [serverpush_orderprice]:(state,payload)=>{
      let {realtimepricedetail} = payload;
      return {...state,curmappageorder:{
        ...state.curmappageorder,
        orderprice:realtimepricedetail.price,
        realtimepricedetail
      }};
    },
    [carmap_setmapinited]:(state,isMapInited)=>{
      return {...state,isMapInited}
    },
    [carmap_setmapcenter]:(state,payload)=>{
      let mapcenterlocation = L.latLng(payload.lat,payload.lng);//lat,lng
      return {...state,mapcenterlocation}
    },
    [selrequest]:(state, curreqobj) => {
      let markerstartlatlng = L.latLng(curreqobj.srcaddress.location.lat,curreqobj.srcaddress.location.lng);//lat,lng
      let markerendlatlng = L.latLng(curreqobj.dstaddress.location.lat, curreqobj.dstaddress.location.lng);//lat,lng
      let mapcenterlocation = markerstartlatlng;
      return { ...state,markerstartlatlng,markerendlatlng,mapcenterlocation};
    },
    [setcurlocation]:(state, curlocation) => {
      let driverlocation = L.latLng([curlocation.lat, curlocation.lng]);
      return { ...state,driverlocation};
    },
    [carmap_resetmap]:(state,initobj)=> {
        const {driverlocation,mapcenterlocation,isMapInited} = state;
        return {...initial.carmap,isMapInited,driverlocation,mapcenterlocation};
    },
    [serverpush_triprequest]:(state,payload)=> {
        let curmappagerequest = {...payload.triprequest};
        return { ...state,curmappagerequest };
    },
    [serverpush_triporder]:(state,payload)=> {
        let curmappageorder = {...payload.triporder};
        return { ...state, curmappageorder };
    },
    [serverpush_triprequestandorder]:(state,payload)=> {
        let curmappageorder = {...payload.triporder};
        let curmappagerequest = {...payload.triprequest};
        return { ...state, curmappageorder,curmappagerequest };
    },
    [updaterequeststatus_result]:(state,payload)=> {
        let curmappagerequest = {...payload.triprequest};
        return { ...state,curmappagerequest };
    },
    [carmap_setzoomlevel]:(state,zoomlevel)=>{
        return { ...state, zoomlevel };
    },
    [acceptrequest_result]:(state,payload)=>{
      let curmappageorder = {...payload.triporder};
      let curmappagerequest = {...payload.triprequest};
      return { ...state, curmappageorder,curmappagerequest };
    },
}, initial.carmap);

export default carmap;
