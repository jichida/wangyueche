/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import config from '../config.js';
import { fork, take, call, put, cancel } from 'redux-saga/effects';

import store from '../env/store.js';
import {wsrecvhandler} from './wsrecvhandler.js';
import data from './datahandler.js';
import {
    login_result,
    logout_result,
    notify_socket_connected,
    common_err,
} from '../actions';

let issocketconnected = false;
let sendmsgwhenreconnect =(socket)=>{
    //连接上以后直接发送-----》
    let token = localStorage.getItem('zhongnan_rider_token');
    if (token !== null) {
        socket.emit('apprider',{cmd:'loginwithtoken',data:{token:token}});
    }
    socket.emit('apprider',{cmd:'gettourbus',data:{}});
    socket.emit('apprider',{cmd:'getsystemconfig',data:{}});

    store.dispatch(notify_socket_connected(true));
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
        console.log(`获取到:${JSON.stringify(action)}`);
        yield put(action);
    }
}

function* write(socket,fun,cmd) {
    while (true) {
        let { payload } = yield take(fun);
        console.log(`写命令--》${cmd}:` + JSON.stringify(payload));
        if(issocketconnected){
          socket.emit('apprider',{cmd:cmd,data:payload});
        }
        else{
          //yield put(common_err({type:cmd,errmsg:`服务器连接断开!无法发送命令${cmd}`}))
        }
    }
}

function* handleIOWithAuth(socket) {
    while (true) {
        console.log("未登录!");
        yield take(`${login_result}`);
        console.log("登录成功!");
        let fnsz = data.sendmessageauthfnsz;

        let tasksz =[];
        for (let cmd in fnsz) {
            let task =  yield fork(write, socket,fnsz[cmd],cmd);
            tasksz.push(task);
        }
       yield take(`${logout_result}`);

        for (let i=0;i< tasksz.length; i++) {
            yield cancel(tasksz[i]);
        }
    }
}

function* handleIO(socket) {
    let fnsz = data.sendmessagefnsz;
    let tasksz =[];
    for (let cmd in fnsz) {
        let task =  yield fork(write, socket,fnsz[cmd],cmd);
        tasksz.push(task);
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
