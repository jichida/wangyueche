/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import config from '../config.js';
import { fork, take, call, put, cancel } from 'redux-saga/effects';

import store from '../env/store.js';

import {wsrecvhandler} from './wsrecvhandler.js';
import {getcurrentpos} from './getcurrentpos';
import data from './datahandler.js';
import {
    login_result,
    logout_result,
    logout_request,
    notify_socket_connected,
    common_err
} from '../actions';

let issocketconnected = false;
let sendmsgwhenreconnect =(socket)=>{
    let token = localStorage.getItem('zhongnan_driver_token');
    if (token !== null) {
        //take token to login...
        socket.emit('appdriver',{cmd:'loginwithtoken',data:{token:token}});
    }

    store.dispatch(notify_socket_connected(true));
    socket.emit('appdriver',{cmd:'getsystemconfig',data:{}});
}

let sendmsgwhenlogined  = (socket)=>{
    //发送app版本信息
    socket.emit('appdriver',{cmd:'senddriverappinfo',data:{appversion:config.appversion}});
}

function connect() {
    const socket = io(config.serverurl);
    return new Promise(resolve => {
        socket.on('connect', () => {
            issocketconnected = true;
            resolve(socket);
        });
    });
}

function subscribe(socket) {
    return eventChannel(emit => {
        wsrecvhandler(socket,emit);
        socket.on('connect',()=>{
            issocketconnected = true;
            sendmsgwhenreconnect(socket);
        });
        socket.on('disconnect',()=>{
            issocketconnected = false;
            store.dispatch(notify_socket_connected(false));
        });
        socket.on('error',()=>{
            //emit(disconnect());
        });
        return () => {};
    });
}

function* read(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        console.log(`read action:${action}`);
        yield put(action);
    }
}

function* write(socket,fun,cmd) {
    while (true) {
        let { payload } = yield take(fun);
        console.log(`${cmd}:` + JSON.stringify(payload));
        if(issocketconnected){
          socket.emit('appdriver',{cmd:cmd,data:payload});
        }
        else{
          //yield put(common_err({type:cmd,errmsg:`服务器连接断开!无法发送命令${cmd}`}))
        }
    }
}

function* handleIOWithAuth(socket) {
    let tasksz =[];
    while (true) {
        console.log("等待登录中...!");
        yield take(`${login_result}`);
        sendmsgwhenlogined(socket);

        console.log("登录成功!");
        let fnsz = data.sendmessageauthfnsz;

        for (var cmd in fnsz) {
            let task =  yield fork(write, socket,fnsz[cmd],cmd);
            tasksz.push(task);
        }

        //注销比较特殊
        console.log("登出APP发送当前位置(注销)");
        yield take(`${logout_result}`);
        for (let i=0;i<tasksz.length;i++) {
            yield cancel(tasksz[i]);
        }
    }
}

function* handleIO(socket) {
    let fnsz =  data.sendmessagefnsz;
    for (var cmd in fnsz) {
        yield fork(write, socket,fnsz[cmd],cmd);
    }
}


export function* flowmain() {
    const socket = yield call(connect);
    //连接上以后直接发送-----》
    sendmsgwhenreconnect(socket);

    yield fork(read, socket);
    yield fork(handleIOWithAuth, socket);
    yield fork(handleIO, socket);

}
