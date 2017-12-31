import { select,put,call,take,takeEvery,takeLatest,throttle,cancel,fork } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  changestartposition,
  carmap_setstartaddress,

  carmap_setdragging,
  carmap_changemarkerstartlatlng,
  carmap_setzoomlevel,
  carmap_setmapcenter,

  carmap_dragend,
  carmap_getaddr,
  carmap_dragging,
  carmap_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,
  carmap_setenableddrawmapflag,

  md_map_dragging,
  md_map_dragend
} from '../actions';
import {getcurrentpos} from '../util/geo.js';

import { push } from 'react-router-redux';
import L from 'leaflet';
import _ from 'lodash';

const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERSELF = 4;
const ISENABLEDDRAW_MARKERDIRVER = 8;
// const ISENABLEDRAW_NEARBYDRIVERS = 16;
const ISENABLEDDRAW_ROUTELEFT = 32;
const ISENABLEDDRAW_ROUTEPASTPTS = 64;
const ISENABLEDDRAW_POPWITHSTART = 128;
const ISENABLEDDRAW_POPWITHCUR  = 256;

let markerdriverlist = [];
let markerstart,markerend,markerself,markerdriver,polylineleft,polylinepast,infoWindow;
window.initamaploaded = false;

const loczero = L.latLng(0,0);
window.amap = null;
let createmap =({mapcenterlocation,zoomlevel})=> {
  console.log(`开始创建地图啦。。。。${mapcenterlocation.lng},amap:${!!window.amap}`);
  return new Promise((resolve,reject) => {
    if(!mapcenterlocation.equals(loczero) && !window.amap){
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

const drawmap = (nextprop)=>{
  const {enableddrawmapflag,markerstartlatlng,markerendlatlng,curlocation,
  driverlocation,driverlist,routeleftpts,routepastpts,enabledragging} = nextprop;
  return new Promise(resolve => {
      if(!!window.amap){
          const isenableddrawmapflag = (flag)=>{
              return (enableddrawmapflag & flag)>0;
          }
          const getamppos = (curloc)=>{
              return [curloc.lng,curloc.lat];
          };
          const getAMappos = (markerstartlatlng)=>{
              return new window.AMap.LngLat(markerstartlatlng.lng,markerstartlatlng.lat);
          }
          //开始位置
          const showmarker =(enableddrawflag,marker,markerloc,image)=>{
              if (marker) {
                  marker.hide();
                  marker.setMap(null);
                  //marker = null;
              }
              if(isenableddrawmapflag(enableddrawflag)) {//显示
                  if (!marker) {
                      let startIcon = new window.AMap.Icon({
                          image: image,
                          imageSize: new window.AMap.Size(25, 31)
                      });
                      let markstartprops = {
                          position: getamppos(markerloc),
                          icon: startIcon,
                      };
                      marker = new window.AMap.Marker(markstartprops);
                  }
                  else {
                      marker.setPosition(getamppos(markerloc));
                  }
                  marker.show();
                  marker.setMap(window.amap);
              }
              return marker;
          }

          //标记点：起始，目的地，我的当前位置，司机位置
          markerstart = showmarker(ISENABLEEDRAW_MARKERSTART,markerstart,markerstartlatlng,'images/start.png');
          markerend = showmarker(ISENABLEDDRAW_MARKEREND,markerend,markerendlatlng,'images/end.png');
          markerself = showmarker(ISENABLEDDRAW_MARKERSELF,markerself, L.latLng(curlocation.lat, curlocation.lng),'images/me.png');
          markerdriver = showmarker(ISENABLEDDRAW_MARKERDIRVER,markerdriver,L.latLng(driverlocation.lat,driverlocation.lng),'images/mycar.png');
          //附近车辆／先清空
          _.map(markerdriverlist,(marker)=>{
            marker.setMap(null);
          });

          markerdriverlist = [];
          if(isenableddrawmapflag(enableddrawmapflag)) {//显示
              if (driverlist.length > 0) {
                  let carIcon = new window.AMap.Icon({
                      image: 'images/mycar.png',
                      imageSize: new window.AMap.Size(40, 40)
                  });

                  _.map(driverlist,(curloc)=>{
                    let drivercarprops = {
                        position:[curloc.lng,curloc.lat],
                        icon:carIcon
                    };
                    let marker = new window.AMap.Marker(drivercarprops);
                    marker.setMap(window.amap);
                    markerdriverlist.push(marker);
                  });
              }
          }
          //画线
          const showpolyline =(enableddrawflag,polyline,polylineprops)=> {
              if(polyline){
                  polyline.setMap(null);
              }
              if(isenableddrawmapflag(enableddrawflag)) {//显示
                  //重新画了！
                  polyline = new window.AMap.Polyline(polylineprops);
                  polyline.setMap(window.amap);
              }
              return polyline;
          }
          //驾车路线（导航的路线）
          let leftpts = [];
          _.map(routeleftpts,(pt)=>{
            leftpts.push(getAMappos(pt));
          });
          let routeleftprops ={
              path: leftpts,//设置多边形边界路径
              strokeColor: "#FF0000", //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 4,    //线宽
              fillColor: "#1791fc", //填充色
              fillOpacity: 0.35//填充透明度
          };
          polylineleft = showpolyline(ISENABLEDDRAW_ROUTELEFT,polylineleft,routeleftprops);
          //驾车路线（走过的路线）
          let pastpts = [];
          _.map(routepastpts,(pt)=>{
            pastpts.push(getAMappos(pt));
          });

          let routelpastprops ={
              path: pastpts,//设置多边形边界路径
              strokeColor: "#FF33FF", //线颜色
              strokeOpacity: 0.2, //线透明度
              strokeWeight: 3,    //线宽
              fillColor: "#1791fc", //填充色
              fillOpacity: 0.35//填充透明度
          };
          polylinepast = showpolyline(ISENABLEDDRAW_ROUTEPASTPTS,polylinepast,routelpastprops);

          if(!!infoWindow){
            infoWindow.close();
            infoWindow.setMap(null);
            //infoWindow = null;
          }
          if(isenableddrawmapflag(ISENABLEDDRAW_POPWITHCUR)){
            let info = [];

            let totaldistancetxt = _.get(nextprop,'totaldistancetxt','');
            let totaldurationtxt = _.get(nextprop,'totaldurationtxt','');
            let price = _.get(nextprop,'curmappageorder.realtimepricedetail.price',0);
            info.push(`<p>距离<span class='color_warning'>${totaldistancetxt}</span>,用时:<span class='color_warning'>${totaldurationtxt}</span> </p>`);
            info.push(`<p>费用<span class='color_warning'>${price}元</span></p>`);

            infoWindow = new window.AMap.InfoWindow({
                content: info.join("")  //使用默认信息窗体框样式，显示信息内容
            });
            infoWindow.open(window.amap, [driverlocation.lng,driverlocation.lat]);
          }
      }//map
      resolve();
  });
}

export function* createmapshowflow(){
    //创建地图
    yield takeEvery(`${carmapshow_createmap}`, function*(action_createmap) {
      try{
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
        yield put(carmap_getaddr(mapcenterlocation));

        let task_dragging =  yield fork(function*(eventname){
          while(true){
            yield call(listenmapevent,eventname);
            yield put(md_map_dragging());
          }
        },'dragging');

        let task_dragend =  yield fork(function*(eventname){
          while(true){
            yield call(listenmapevent,eventname);
            yield put(md_map_dragend());

          }
        },'dragend');

        let task_zoomend =  yield fork(function*(eventname){
          while(true){
            yield call(listenmapevent,eventname);
            yield put(carmap_setzoomlevel(window.amap.getZoom()));
          }
        },'zoomend');

        yield take(`${carmapshow_destorymap}`);
        yield cancel(task_dragging);
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
       markerstart= null;
       markerend = null;
       markerself= null;
       markerdriver=null;
       polylineleft=null;
       polylinepast=null;
       infoWindow = null;
    });

    yield takeEvery(`${carmap_setenableddrawmapflag}`, function*(action_enableddrawmapflag) {
      let mapcarprops = yield select(getmapstate_formapcar);
      yield call(drawmap,mapcarprops);
    });

    //防抖动设计（throttle为指定时间内只触发一次（第一次），takeLatest为以最后一次为准）
    yield throttle(10,`${md_map_dragging}`, function*(){
      //yield call(delay, 50);
      yield put(carmap_dragging({markerstart}));
    });

    yield takeLatest(`${md_map_dragend}`, function*(){
      yield call(delay, 500);
      yield put(carmap_dragging({markerstart}));
      yield put(carmap_dragend());
    });

}
