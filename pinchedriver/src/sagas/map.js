import { select,put,call,take,takeEvery,takeLatest,cancel,fork } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  carmap_setzoomlevel,
  carmap_setmapcenter,
  carmap_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,

} from '../actions';

import {getcurrentpos} from './getcurrentpos';
import { push } from 'react-router-redux';
import L from 'leaflet';
import _ from 'lodash';


let markerstart,markerend,markerdriver,polylineleft,polylinepast,infoWindow;
const loczero = L.latLng(0,0);

let createmap =({mapcenterlocation,zoomlevel})=> {
  console.log(`开始创建地图啦。。。。${mapcenterlocation.lng},amap:${!!window.amap}`);
  return new Promise((resolve,reject) => {
    if(!mapcenterlocation.equals(loczero) && !window.amap ){
      let center = new window.AMap.LngLat(mapcenterlocation.lng,mapcenterlocation.lat);
      window.amap = new window.AMap.Map("gaodemap", {
            center: center,
            zoom:zoomlevel,
            lang:"zh-cn",
            dragEnable:true,
            zoomEnable:true,
            touchZoom:true,
        });
        resolve(window.amap);
      }
      else{
        if(!!window.amap){
          resolve(window.amap);
          return;
        }
        reject(`地图参数${mapcenterlocation.lng},${mapcenterlocation.lat},amap:${!!window.amap}`);
      }
  });
}

const listenmapevent = (eventname)=>{
  return new Promise(resolve => {
    window.amap.on(eventname, (e)=> {
        resolve(eventname);
    });
  });
}

const getmapstate_formapcar = (state) => {
  const {carmap} = state;
  return {...carmap};
}

export function* createmapshowflow(){
    //创建地图
    yield takeEvery(`${carmapshow_createmap}`, function*(action_createmap) {
      try{
        //take
        let mapcarprops = yield select(getmapstate_formapcar);
        if(!mapcarprops.isMapInited){//仅在第一次加载页面初始化时进入
          //等待地图初始化
          yield take(`${carmap_setmapinited}`);
        }
        let {mapcenterlocation,zoomlevel} = mapcarprops;
        if(mapcenterlocation.equals(loczero)){//仅在第一次加载页面初始化时进入
          const centerpos = yield call(getcurrentpos);
          mapcenterlocation = L.latLng(centerpos.lat, centerpos.lng);
        }
        yield call(createmap,{mapcenterlocation,zoomlevel});//创建地图
        let task_dragend =  yield fork(function*(eventname){
          while(true){
            yield call(listenmapevent,eventname);
            let curlocation = window.amap.getCenter();
            let centerlatlng = L.latLng(curlocation.lat, curlocation.lng);
            yield put(carmap_setmapcenter(centerlatlng));
          }
        },'dragend');

        let task_zoomend =  yield fork(function*(eventname){
          while(true){
            yield call(listenmapevent,eventname);
            let curlocation = window.amap.getCenter();
            let centerlatlng = L.latLng(curlocation.lat, curlocation.lng);
            yield put(carmap_setzoomlevel(window.amap.getZoom()));
          }
        },'zoomend');

        yield take(`${carmapshow_destorymap}`);
        yield cancel(task_dragend);
        yield cancel(task_zoomend);
      }
      catch(e){
        console.log(`创建地图失败`);
        alert(`创建地图失败${JSON.stringify(e)}`);
      }

    });

    //销毁地图
    yield takeEvery(`${carmapshow_destorymap}`, function*(action_destorymap) {
      window.amap = null;
    });

}
