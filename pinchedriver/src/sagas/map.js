import { select,put,call,take,takeEvery,takeLatest,cancel,fork } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  carmap_setzoomlevel,
  carmap_setmapcenter,
  carmap_setmapinited,
  carmapshow_createmap,
  carmapshow_destorymap,
  carmap_setenableddrawmapflag
} from '../actions';

import {getcurrentpos} from './getcurrentpos';
import { push } from 'react-router-redux';
import L from 'leaflet';
import _ from 'lodash';
const ISENABLEEDRAW_MARKERSTART = 1;
const ISENABLEDDRAW_MARKEREND = 2;
const ISENABLEDDRAW_MARKERDIRVER = 4;
const ISENABLEDDRAW_ROUTELEFT = 32;
const ISENABLEDDRAW_ROUTEPASTPTS = 64;
const ISENABLEDDRAW_POPWITHCUR  = 256;

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
  const {operate,carmap,driveroute} = state;
  let curlocation = operate.curlocation;
  let routeleftpts = driveroute.latlngs;
  return {...carmap,curlocation,routeleftpts,driveroute};
}

const drawmap = (nextprop)=>{
  const {enableddrawmapflag,markerstartlatlng,markerendlatlng,
  driverlocation,routeleftpts,routepastpts}  = nextprop;
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
            if (!!marker) {
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
                marker.setMap(window.amap);
                marker.show();
            }
            return marker;
        }

        //标记点：起始，目的地，我的当前位置，司机位置
        markerstart = showmarker(ISENABLEEDRAW_MARKERSTART,markerstart,markerstartlatlng,'images/start.png');
        markerend = showmarker(ISENABLEDDRAW_MARKEREND,markerend,markerendlatlng,'images/end.png');
        markerdriver = showmarker(ISENABLEDDRAW_MARKERDIRVER,markerdriver,L.latLng(driverlocation.lat,driverlocation.lng),'images/mycar.png');

        //画线
        const showpolyline =(enableddrawflag,polyline,polylineprops)=> {
            if(!!polyline){
                polyline.hide();
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
          let totaldistancetxt = _.get(nextprop,'driveroute.totaldistancetxt','');
          let totaldurationtxt = _.get(nextprop,'driveroute.totaldurationtxt','');
          let price = _.get(nextprop,'curmappageorder.realtimepricedetail.price',0);
          info.push(`<p>距离<span class='color_warning'>${totaldistancetxt}</span>,用时:<span class='color_warning'>${totaldurationtxt}</span> </p>`);
          info.push(`<p>费用<span class='color_warning'>${price}元</span></p>`);
          if(!infoWindow){
            infoWindow = new window.AMap.InfoWindow({
                content: info.join("")  //使用默认信息窗体框样式，显示信息内容
            });
          }
          else{
            infoWindow.setContent(info.join("") );
          }
          infoWindow.show();
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
      markerstart=null;
      markerend=null;
      markerdriver=null;
      polylineleft=null;
      polylinepast=null;
      infoWindow=null;
    });

    yield takeLatest(`${carmap_setenableddrawmapflag}`, function*(action_enableddrawmapflag) {
      let mapcarprops = yield select(getmapstate_formapcar);
      yield call(drawmap,mapcarprops);
    });
}
