import { select,put,takeEvery,takeLatest,call,take } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  carmap_getaddr,
  carmap_dragging,
  carmap_dragend,

  carmap_setdragging,
  carmap_changemarkerstartlatlng,
  changestartposition,
  carmap_setstartaddress,
  carmap_setmapcenter
} from '../actions';

import L from 'leaflet';

const getmapstate_fordrag = (state) => {
  const {enabledragging} = state.carmap;
  return {
    enabledragging
  };
}

const async_getaddr =(centerlatlng)=> {
  return new Promise(resolve => {
      let center = new window.AMap.LngLat(centerlatlng.lng,centerlatlng.lat);
      window.geocoder.getAddress(center, (status, result)=> {
          console.log("status:" + status);
          console.log("result:" + JSON.stringify(result));
          if (status === 'complete' && result.info === 'OK') {
            let addressname = result.regeocode.formattedAddress;
            let location = centerlatlng;
            resolve({addressname,location});
            //yield put(carmap_setstartaddress({addressname,location}));
          }
     });
  });
};


export function* creategetaddrflow(){
  yield takeLatest(`${carmap_dragging}`, function*(action) {
    const {payload} = action;
    const {enabledragging} = yield select(getmapstate_fordrag);
    if(enabledragging){
      const {markerstart} = payload;
      let centerlocamp = window.amap.getCenter();
      markerstart.setPosition(centerlocamp);
    }
    //yield call(delay,300);
  });

  yield takeEvery(`${carmap_getaddr}`, function*(action) {
    const {payload} = action;
    const {addressname,location} = yield call(async_getaddr,payload);
    yield put(carmap_setstartaddress({addressname,location}));
    console.log(`改变地理位置${addressname}`);
  });

  yield takeEvery(`${carmap_dragend}`, function*(action) {
    yield put(carmap_setdragging(false));
    let centerlocamp = window.amap.getCenter();
    let centerlatlng = L.latLng(centerlocamp.lat, centerlocamp.lng);//lat,lng
    const {enabledragging} = yield select(getmapstate_fordrag);
    if(enabledragging){
        let markerstartlatlng = centerlatlng;
        yield put(carmap_changemarkerstartlatlng(centerlatlng));
        let srclocationstring = markerstartlatlng.lng+"," +markerstartlatlng.lat;
        console.log(`拖动坐车位置时，触发3(界面直接处理)${srclocationstring}`);
        yield put(changestartposition({
            location:srclocationstring
        }));
        yield put(carmap_getaddr(centerlatlng));
      //  const {addressname,location} = yield call(async_getaddr,centerlatlng);
      //  yield put(carmap_setstartaddress({addressname,location}));
    }
    yield put(carmap_setmapcenter(centerlatlng));
  });

  // yield takeEvery(`${carmap_setstartaddress}`,function*(action)){
  //   const {payload} = action;
  //   let markerstartlatlng = L.latLng(payload.location.lat,payload.location.lng);
  //   yield put(carmap_changemarkerstartlatlng(centerlatlng));
  //   let srclocationstring = markerstartlatlng.lng+"," +markerstartlatlng.lat;
  //   console.log(`拖动坐车位置时，触发3(界面直接处理)${srclocationstring}`);
  //   yield put(changestartposition({
  //       location:srclocationstring
  //   }));
  //   yield put(carmap_getaddr(centerlatlng));
  // }

};
