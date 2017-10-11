import config from '../config.js';
import {select, take, call, put,race } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import L from 'leaflet';
import {getcurrentpos} from '../util/geo.js';
import {
    carmap_setcurlocation,
    changestartposition,
    notify_socket_connected,
    carmap_changemarkerstartlatlng,
    getnearestdrivers_request,
    carmap_setmapcenter
} from '../actions';

const getstate_app = (state)=>{
  let socketconnected = state.app.socketconnected;
  return {socketconnected};
}
//获取地理位置信息，封装为promise
//获取地理位置坐标，初始化地图
//如果和服务端连接，要获取地理位置名字
export function* createinitflow(){//仅执行一次
  let errorreson = '';
  try{
    const curlocation = yield call(getcurrentpos);//第一次执行,应保证有值
    errorreson = curlocation.lng + ',' + curlocation.lat;
    yield put(carmap_setcurlocation(curlocation));//设置当前位置

    let srclocationstring = curlocation.lng + ',' + curlocation.lat;
    let markerstartlatlng = L.latLng(curlocation.lat, curlocation.lng);//lat,lng
    yield put(carmap_setmapcenter(markerstartlatlng));//地图中心点
    yield put(carmap_changemarkerstartlatlng(markerstartlatlng));//起始点

    let app = yield select(getstate_app);
    if(!app.socketconnected){
        console.log(`等待连接。。。`);
        yield take(`${notify_socket_connected}`);
        yield call(delay, 2*1000);//延时2秒
    }
    console.log(`地理位置从0->有值，需要初始化地图（触发一次，同时触发3）`);
    yield put(changestartposition({
         location:srclocationstring
    }));
  }
  catch(e){
    alert(`初始化失败${JSON.stringify(e)}
    errorreson:${errorreson}`);
  }

}

//想打车时,附近的车辆需要定时刷新
const getmapprops = (state) => {
  let mapprops = {...state.carmap};
  let sendnearestdrivers = false;
  if(mapprops.mapstage === 'pageinit' && mapprops.isindexmapvisiable
      && !mapprops.iswaitingforcallpage && !mapprops.dragging){
    if(mapprops.hasOwnProperty('srcaddress')){
      sendnearestdrivers = true;
    }
  }
  return {sendnearestdrivers,srcaddress:mapprops.srcaddress,triptype:mapprops.triptype};
};

//获取附近车辆
export function* getnearestdriversflow(){
  while (true) {
        const { response, timeout } = yield race({
           response: take(`${changestartposition}`),
           timeout: call(delay, config.intervalrequestnearbydriver)
        });
        const mapprops = yield select(getmapprops);
        if(!!timeout){
            // 1.第一阶段
            // 2.停留在主页面.
            // 3.未停留在价格页面.
            // 4.不在拖动中
            // 5.获取到位置
          if(mapprops.sendnearestdrivers){
              let srclocationstring = mapprops.srcaddress.location.lng+ "," + mapprops.srcaddress.location.lat;
              yield put(getnearestdrivers_request({
                    location:srclocationstring,
                    registertype:mapprops.triptype
                }));
          }
        }
        else{
          console.log(`地理位置从0->有值，需要初始化地图（触发一次，同时触发3）,获取位置`);
          yield put(getnearestdrivers_request(
            {...response.payload,registertype:mapprops.triptype}
          ));
        }
  }
}
