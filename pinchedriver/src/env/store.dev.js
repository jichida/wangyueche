/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers';
import DevTools from './devtools';
import createHistory from 'history/createHashHistory';
const history = createHistory();

const middleware = routerMiddleware(history);



let initialState = {

};
const sagaMiddleware = createSagaMiddleware();
let configureStore = (initialState)=> {

    const store = createStore(
        reducer, initialState,
        compose(
            applyMiddleware(thunk,sagaMiddleware,middleware),
            DevTools.instrument()
        )
    );

    return store;
}

const store = configureStore(initialState);

export {sagaMiddleware,history};
export default store;
