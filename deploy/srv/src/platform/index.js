/**
 * Created by wangxiaoqing on 2017/3/21.
 */
let winston = require('../log/log.js');
let PubSub = require('pubsub-js');
const config = require('../config.js');

const Platform_baseInfoDriverApp= require('./Platform_baseInfoDriverApp/index');
const Platform_baseInfoPassenger= require('./Platform_baseInfoPassenger/index');
const Platform_operateArrive= require('./Platform_operateArrive/index');
const Platform_operateDepart= require('./Platform_operateDepart/index');
const Platform_operateLogin= require('./Platform_operateLogin/index');
const Platform_operateLogout= require('./Platform_operateLogout/index');
const Platform_operatePay= require('./Platform_operatePay/index');
const Platform_orderCreate = require('./Platform_orderCreate/index');
const Platform_orderCancel = require('./Platform_orderCancel/index');
const Platform_orderMatch = require('./Platform_orderMatch/index');
const Platform_positionDriver = require('./Platform_positionDriver/index');
const Platform_positionVehicle = require('./Platform_positionVehicle/index');
const Platform_ratedDriver = require('./Platform_ratedDriver/index');
const Platform_ratedDriverPunish = require('./Platform_ratedDriverPunish/index');
const Platform_ratedPassenger = require('./Platform_ratedPassenger/index');
const Platform_ratedPassengerComplaint = require('./Platform_ratedPassengerComplaint/index');


const platformhandlers = {
    'Platform_baseInfoDriverApp':{
        'Insert':Platform_baseInfoDriverApp.insertBaseInfoDriverApp,
        'Update':Platform_baseInfoDriverApp.updateBaseInfoDriverApp
    },
    'Platform_baseInfoPassenger':{
        'Insert':Platform_baseInfoPassenger.insertBaseInfoPassenger,
        'Update':Platform_baseInfoPassenger.updateBaseInfoPassenger
    },
    'Platform_operateArrive':{
        'Insert':Platform_operateArrive.insertOperateArrive
    },
    'Platform_operateDepart':{
        'Insert':Platform_operateDepart.insertOperateDepart
    },
    'Platform_operateLogin':{
        'Insert':Platform_operateLogin.insertOperateLogin
    },
    'Platform_operateLogout':{
        'Insert':Platform_operateLogout.insertOperateLogout
    },
    'Platform_operatePay':{
        'Insert':Platform_operatePay.insertOperatePay
    },
    'Platform_orderCancel':{
        'Insert':Platform_orderCancel.insertOrderCancel
    },
    'Platform_orderCreate':{
        'Insert':Platform_orderCreate.insertOrderCreate
    },
    'Platform_orderMatch':{
        'Insert':Platform_orderMatch.insertOrderMatch
    },
    'Platform_positionDriver':{
        'Insert':Platform_positionDriver.insertPositionDriver
    },
    'Platform_positionVehicle':{
        'Insert':Platform_positionVehicle.insertPositionVehicle
    },
    'Platform_ratedDriver':{
        'Insert':Platform_ratedDriver.insertRatedDriver
    },
    'Platform_ratedDriverPunish':{
        'Insert':Platform_ratedDriverPunish.insertRatedDriverPunish
    },
    'Platform_ratedPassenger':{
        'Insert':Platform_ratedPassenger.insertRatedPassenger
    },
    'Platform_ratedPassengerComplaint':{
        'Insert':Platform_ratedPassengerComplaint.insertRatedPassengerComplaint
    },
};

let startplatformmonitor = ()=>{
    PubSub.subscribe('Platformmsgs',  ( msg, data )=> {
        // winston.getlog().info('(平台相关）订阅消息:' + msg);
        // winston.getlog().info('(平台相关）订阅数据:' + JSON.stringify(data));
        const {action,type,payload} = data;
        if(platformhandlers.hasOwnProperty(data.type)){
            if(platformhandlers[data.type].hasOwnProperty(data.action)){
                platformhandlers[data.type][data.action](data.payload);
                return;
            }
        }
        // winston.getlog().info('(平台相关）未找到处理函数:' + data);
    });
}

exports.startplatformmonitor  = startplatformmonitor;
