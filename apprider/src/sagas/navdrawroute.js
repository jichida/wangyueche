import {takeLatest, call, put,race } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  driveroute_request,
  driveroute_result,
} from '../actions';
import {
  getstringoftime,
  getstringofdistance
} from '../util/geo.js';
import _ from 'lodash';

let getnavdrawroute =({drawroute,startlnglat,endlnglat})=> {
  console.log('获取一个实时导航:' + drawroute);
  return new Promise(resolve => {
    if(!!drawroute && !!startlnglat && !!endlnglat ){
      console.log('获取一个实时导航:' + JSON.stringify(startlnglat));
      console.log('获取一个实时导航:' + JSON.stringify(endlnglat));
      let driving = new window.AMap.Driving({extensions:'base'});
      // 根据起终点经纬度规划驾车导航路线
      driving.search(new window.AMap.LngLat(startlnglat.lng, startlnglat.lat),
       new window.AMap.LngLat(endlnglat.lng, endlnglat.lat),
      (status,result)=>{
            if(status === 'complete'){
              _.map(result.routes,(route)=>{
                let totaldistance = route.distance;
                let totalduration = route.time;
                let totaldistancetxt = getstringofdistance(route.distance);
                let totaldurationtxt = getstringoftime(route.time);
                let latlngs = [];
                let instruction = '';
                _.map(route.steps,(drivestep)=>{
                  if(instruction.length === 0){
                    instruction = drivestep.instruction;
                  }
                  _.map(drivestep.path,(pt)=>{
                      latlngs.push({
                        lat:pt.lat,
                        lng:pt.lng
                      });
                  });
                });
                resolve({
                    drawroute,
                    totaldistance,
                    totalduration,
                    totaldistancetxt,
                    totaldurationtxt,
                    latlngs,
                    instruction
                  });
                return;
              });//for(let route of result.routes){
            }//if(status === 'complete'){
          resolve({drawroute:false});
      });//driving.search
    }//if
    else{
      resolve({
        drawroute:false
        });
    }
  });//return new Promise(resolve => {
}//getnavdrawroute

export function* createnavdrawrouteflow(){
  yield takeLatest(`${driveroute_request}`, function*(action) {
    yield call(delay, 500);
    let {payload} = action;
    console.log("createnavdrawrouteflow===>" + JSON.stringify(payload));

    const { result, timeout } = yield race({
       result: call(getnavdrawroute,payload),
       timeout: call(delay, 5000)
    });

    if(!!result){
      yield put(driveroute_result(result));
    }
    else{
      yield put(driveroute_result({
        drawroute:false
        }));
    }
  });
}
