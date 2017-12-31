import { fork } from 'redux-saga/effects';
import {createsagacallbackflow} from '../actions/sagacallback';
import {getnearestdriversflow,createinitflow} from './getnearestdriversflow';
import {createrestoreorderflow} from './restoreorder';
import {flowmain} from './flowmain';
import {wsrecvsagaflow} from './wsrecvsaga';
import {payflow} from './payflow';
import {getcurcityflow} from './getcurcityflow';
import {jpushflow} from './jpushflow';
import {createupdatestatusflow} from './updatestatus';
import {createnavdrawrouteflow} from './navdrawroute';
import {creategetaddrflow} from './getaddr';
import {createloadingflow} from './loading';
import {createmapshowflow} from './map';

export default function* rootSaga() {
  try{
    yield fork(createinitflow);
    yield fork(createmapshowflow);
    // yield fork(createloadingflow);
    yield fork(createnavdrawrouteflow);
    yield fork(creategetaddrflow);
    yield fork(jpushflow);
    yield fork(getcurcityflow);
    yield fork(payflow);
    yield fork(wsrecvsagaflow);
    yield fork(createrestoreorderflow);//监视恢复订单
    yield fork(flowmain);
    yield fork(createsagacallbackflow);
    yield fork(getnearestdriversflow);

    yield fork(createupdatestatusflow);
  }
  catch(e){
    alert(`执行逻辑错误:${JSON.stringify(e)}`);
  }
}
