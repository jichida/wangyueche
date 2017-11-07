/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React  from 'react';
import { Provider } from 'react-redux';
import store,{history}  from './store';
import {
    Route,
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import AppRoot from '../components/approot.js';

let Root = (props)=>
    (
        <Provider store={store}>
            <div>
                <ConnectedRouter history={history}>
                    <Route path="/" component={AppRoot}/>
                </ConnectedRouter>
            </div>
        </Provider>
    );


export default Root;
