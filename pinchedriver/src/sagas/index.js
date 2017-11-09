import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';
import {createsagacallbackflow} from './sagacallback';
import {getcurpositionflow} from './senddriverposition';
import {wsrecvsagaflow} from './wsrecvsaga';
import {jpushflow} from './jpushflow';
import {createnavdrawrouteflow} from './navdrawroute';
import {createloadingflow} from './loading';
import {createmapshowflow} from './map';

export default function* rootSaga() {
  try{
    yield fork(getcurpositionflow);
    yield fork(createmapshowflow);
    yield fork(createloadingflow);
    yield fork(jpushflow);
    yield fork(wsrecvsagaflow);
    yield fork(createnavdrawrouteflow);
    yield fork(flowmain);
    yield fork(createsagacallbackflow);
  }
  catch(e){
    console.log(e);
  }

}
