import { select,put,takeEvery,call,take,takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  acceptrequest,
  acceptrequest_request,

  updaterequeststatus,
  updaterequeststatus_request,
  carmap_resetmap,
  carmap_resetmap_url,
  changestartposition,
  carmap_changemarkerstartlatlng,
  carmap_getaddr,
  carmap_setmapcenter,

  carmap_setendaddress,
  carmap_settriptype,
  getprice_request,

  carmap_setenableddrawmapflag,
  driveroute_request,
  driveroute_result,

  serverpush_driverlocation,
  nav_drawroute,
  carmap_setmapinited,
  serverpush_triprequestandorder,
  updaterequeststatus_result,
  starttriprequestorder_result,
  canceltriprequestorder_result,
  carmap_setcurlocation,
  getnearestdrivers_result,
  carmap_setstartaddress,
  serverpush_restoreorder
} from '../actions';

import { replace,goBack } from 'react-router-redux';

import {getcurrentpos,getcurrentpos_sz} from '../util/geo';


const getmapstate_forreqprice = (state) => {
  const {iswaitingforcallpage,triptype,totaldistance,totalduration} = state.carmap;
  return {
    iswaitingforcallpage,
    registertype:triptype,
    totaldistance,
    totalduration
  };
};
const getmapstate_fornav_start2end = (state) => {
  const {triptype,markerstartlatlng,markerendlatlng} = state.carmap;
  return {
    registertype:triptype,
    drawroute:true,
    startlnglat:markerstartlatlng,
    endlnglat:markerendlatlng
  };
}

const getmapstate_fornav_cur2end = (state) => {
  const {lastsend_navtime,driverlocation,markerendlatlng} = state.carmap;
  return {
    lastsend_navtime,
    drawroute:true,
    startlnglat:driverlocation,
    endlnglat:markerendlatlng
  };
}
//===========以下发送地图相关请求===========
//思路：
/*
初始化时,显示附近司机车辆
叫车时,
*/
import L from 'leaflet';
const locz = [0,0];
const loczero = L.latLng(locz[1], locz[0]);
const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERSELF = 4;
const ISENABLEDDRAW_MARKERDIRVER = 8;
const ISENABLEDRAW_NEARBYDRIVERS = 16;
const ISENABLEDDRAW_ROUTELEFT = 32;
// const ISENABLEDDRAW_ROUTEPASTPTS = 64;
const ISENABLEDDRAW_POPWITHSTART = 128;
const ISENABLEDDRAW_POPWITHCUR  = 256;

const getmapstate_formapdraw = (state) => {
  let {mapstage,curlocation,markerstartlatlng,markerendlatlng,curmappagerequest} = state.carmap;
  let enableddrawmapflag = 0;
  if(!!curlocation){
    if(!curlocation.equals(loczero)){
      enableddrawmapflag |= ISENABLEDDRAW_MARKERSELF;
    }
  }

  if(!!markerstartlatlng){
    if(!markerstartlatlng.equals(loczero)){
      enableddrawmapflag |= ISENABLEEDRAW_MARKERSTART;
    }
  }

  if(!!markerendlatlng){
    if(!markerendlatlng.equals(loczero)){
      enableddrawmapflag |= ISENABLEDDRAW_MARKEREND;
    }
  }

  if(mapstage === 'pageinit'){
    const {iswaitingforcallpage} = state.carmap;
    if(iswaitingforcallpage){//停留在叫车页面
      enableddrawmapflag |= ISENABLEDDRAW_ROUTELEFT;
    }
    //显示在这里上车
    if(!!markerstartlatlng){
      if(!markerstartlatlng.equals(loczero)){
        enableddrawmapflag |= ISENABLEDDRAW_POPWITHSTART;
      }
    }
  }
  else if(mapstage === 'pageorder'){
    if(!!curmappagerequest.requeststatus){
      if(curmappagerequest.requeststatus === '请求中'){
        enableddrawmapflag |= ISENABLEDRAW_NEARBYDRIVERS;
        //显示在这里上车
        if(!!markerstartlatlng){
          if(!markerstartlatlng.equals(loczero)){
            enableddrawmapflag |= ISENABLEDDRAW_POPWITHSTART;
          }
        }
      }
      else{//已接单／待上车／行程中／行程完成
        enableddrawmapflag |= ISENABLEDDRAW_MARKERDIRVER;//显示司机
        if(curmappagerequest.requeststatus === '行程中'){
          //显示路线&价格
          enableddrawmapflag &= ~ISENABLEDDRAW_MARKERSELF;//行程中不显示自己位置了
          enableddrawmapflag |= ISENABLEDDRAW_POPWITHCUR;
          //enableddrawmapflag |= ISENABLEDDRAW_ROUTELEFT;
        }
        // else if(curmappagerequest.requeststatus === '已接单' ||
        // curmappagerequest.requeststatus === '待上车'){
        //   //显示在这里上车
        //   if(!!markerstartlatlng){
        //     if(!markerstartlatlng.equals(loczero)){
        //       enableddrawmapflag |= ISENABLEDDRAW_POPWITHSTART;
        //     }
        //   }
        // }
      }
    }

  }
  enableddrawmapflag &= ~ISENABLEDDRAW_POPWITHSTART;
  return {
    enableddrawmapflag,
    mapstage,
    markerstartlatlng,
    markerendlatlng,
    curmappagerequest
  };
};

const map_setcenter =(curlocation)=> {
  return new Promise(resolve => {
    if(!!window.amap){
      let center = [curlocation.lng,curlocation.lat];
      window.amap.setCenter(center);
    }
    resolve();
  });
};
export function* createupdatestatusflow(){
  yield takeEvery(`${acceptrequest}`, function*(action) {
    const {payload} = action;
    payload.driverlocation = yield call(getcurrentpos_sz);
    yield put(acceptrequest_request(payload));
  });

  yield takeEvery(`${updaterequeststatus}`, function*(action) {
    const {payload} = action;
    payload.driverlocation = yield call(getcurrentpos_sz);
    yield put(updaterequeststatus_request(payload));
  });

  yield takeEvery(`${carmap_resetmap_url}`, function*(action) {
      const {payload} = action;
      if(!!payload.url){
        yield put(replace(payload.url));
      }
      let curlocation = yield call(getcurrentpos);
      yield put(carmap_changemarkerstartlatlng(curlocation));
      yield put(carmap_setcurlocation(curlocation));
      yield put(changestartposition({
          location:`${curlocation.lng},${curlocation.lat}`
      }));//重新发送一次附近请求
      yield put(carmap_getaddr(curlocation));
      yield put(carmap_setmapcenter(curlocation));
      yield call(map_setcenter,curlocation);
      yield put(carmap_resetmap());
  });

  //===========以下两种情况要发送价格请求===========
  yield takeEvery(`${carmap_setendaddress}`, function*(action) {
      //发送一个导航请求
      let {registertype,...navpayload} = yield select(getmapstate_fornav_start2end);
      yield put(driveroute_request(navpayload));
      let {payload:navresult} = yield take(`${driveroute_result}`);
      //yield put(driveroute_result(navresult));
      const {drawroute} = navresult;
      if(drawroute){
        const {totaldistance,totalduration}= navresult;
        yield put(getprice_request({registertype,totaldistance,totalduration}));
      }
      yield put(goBack());
  });

  yield takeEvery(`${carmap_settriptype}`, function*(action) {
      //目的地地址选中后
      let {iswaitingforcallpage,...payload} = yield select(getmapstate_forreqprice);
      if(iswaitingforcallpage){
        yield put(getprice_request(payload));
      }
  });
  //===========******以下改变地图状态******===========
  yield takeLatest(
    [
      `${serverpush_driverlocation}`,
      `${nav_drawroute}`,
      `${carmap_setstartaddress}`,
      `${carmap_setmapinited}`,
      `${carmap_setendaddress}`,
      `${serverpush_triprequestandorder}`,
      `${updaterequeststatus_result}`,
      `${starttriprequestorder_result}`,
      `${canceltriprequestorder_result}`,
      `${carmap_resetmap}`,
      `${carmap_setcurlocation}`,
      `${getnearestdrivers_result}`,
      `${serverpush_restoreorder}`
    ]
    , function*(action) {
      yield call(delay,200);
      //目的地地址选中后
      let {
        enableddrawmapflag,
        mapstage,
        markerstartlatlng,
        markerendlatlng,
        curmappagerequest
      } = yield select(getmapstate_formapdraw);
      yield put(carmap_setenableddrawmapflag(enableddrawmapflag));

      if(mapstage === 'pageorder' && !!curmappagerequest.requeststatus){
        if(curmappagerequest.requeststatus === '行程中'){
          //driverlocation
          let sendnav = (action.type === serverpush_restoreorder.getType())
          || (action.type === serverpush_driverlocation.getType());
          if(sendnav){//发送导航
            let {lastsend_navtime,...navpayload} = yield select(getmapstate_fornav_cur2end);
            // let nowtime = new Date();
            // if(nowtime.getTime() - lastsend_navtime.getTime() > 1000*5){
              yield put(driveroute_request(navpayload));//发送导航改变位置
            // }
          }
        }
      }

  });

}
