import {takeEvery,put,call,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {getcurcity,setcurcity} from '../actions';
import {getcurrentpos} from '../util/geo.js';
import _ from 'lodash';

let getcurcityfn =(loc)=> {
  return new Promise(resolve => {
        if(!!window.AMap){
          var lnglatXY=[loc.lng, loc.lat];//地图上所标点的坐标
          window.AMap.service(['AMap.Geocoder'], ()=> {
              let  geocoder = new window.AMap.Geocoder();
              //关键字查询
              geocoder.getAddress(lnglatXY, (status, result)=> {
                  if (status === 'complete' && result.info === 'OK') {
                     console.log(`getcurcity===>${JSON.stringify(result)}`);
                     let city = {
                       "cityname":  _.get(result,'regeocode.addressComponent.city','天长'),
                       "zipcode":  _.get(result,'regeocode.addressComponent.citycode','239300'),
                     }
                     resolve(city);
                  }else{
                     //获取地址失败
                  }
              });
          });
        }
    });
}

//获取地理位置信息，封装为promise
export function* getcurcityflow(){//仅执行一次
  yield takeEvery(`${getcurcity}`, function*(action) {
    try{
      while(!window.AMap){
        call(delay, 500)
      }
      const { curlocation, timeout } = yield race({
         curlocation: call(getcurrentpos),
         timeout: call(delay, 5000)
      });
      if(!!curlocation){
        const { curcity, timeout2 } = yield race({
           curcity: call(getcurcityfn,curlocation),
           timeout2: call(delay, 5000)
        });

        if(!!curcity){
          yield put(setcurcity(curcity));
          console.log(`获取当前城市===>${JSON.stringify(curcity)}`);
        }
      }
    }
    catch(e){

    }
  });
}
