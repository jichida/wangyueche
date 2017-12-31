import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';
import {createsagacallbackflow} from '../actions/sagacallback';
import {getcurpositionflow} from './senddriverposition';
import {createrestoreorderflow} from './restoreorder';
import {wsrecvsagaflow} from './wsrecvsaga';
import {jpushflow} from './jpushflow';
import {createstartoperateloginoutflow} from './startoperateloginout';
import {createnavdrawrouteflow} from './navdrawroute';
import {createupdatestatusflow} from './updatestatus';
import {createloadingflow} from './loading';
import {createmapshowflow} from './map';

export default function* rootSaga() {
  yield fork(createmapshowflow);
  // yield fork(createloadingflow);
  yield fork(jpushflow);
  yield fork(wsrecvsagaflow);
  yield fork(createrestoreorderflow);
  yield fork(createnavdrawrouteflow);
  yield fork(createstartoperateloginoutflow);
  yield fork(flowmain);
  yield fork(getcurpositionflow);
  yield fork(createsagacallbackflow);
  yield fork(createupdatestatusflow);
}
