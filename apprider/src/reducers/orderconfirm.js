/**
 * Created by wangxiaoqing on 2017/3/22.
 */
// gettourbus
import { createReducer } from 'redux-act';
import {
    orderconfirm_settourbus,
    orderconfirm_setpinche,
    orderconfirm_setpincheseatnumber,
    orderconfirm_setpayway,
    orderconfirm_selpinchestation
} from '../actions';


const initial = {
    orderconfirm: {
        pinche:{
            beginstation:'',
            endstation:'',
            orderprice:0,
            orderseatnumber:1,
        },
        tourbus:{
            rentusername:'',
            busnumberobj:{},
            startdate:'',
            enddate:'',
            orderdetail:'',
            orderprice:0
        },

        payway:'alipay'
    },
};

const orderconfirm = createReducer({
    [orderconfirm_setpayway]: (state, payload) => {
        let payway = payload;
        return {
            ...state,
            payway
        };
    },
    [orderconfirm_settourbus]: (state, payload) => {
        let tourbus = payload;
        return {
            ...state,
            tourbus
        };
    },
    [orderconfirm_setpincheseatnumber]:(state,payload)=>{
      let orderseatnumber = payload || 1;
      let pinche = state.pinche;
      let beginstation = pinche.beginstation;
      let endstation = pinche.endstation;
      let orderprice = 0;
      if(pinche.hasOwnProperty('carpoolprice')){
          if(pinche.carpoolprice.hasOwnProperty(beginstation)){
              if(pinche.carpoolprice[beginstation].hasOwnProperty(endstation)){
                  orderprice = pinche.carpoolprice[beginstation][endstation];
                  orderprice *= orderseatnumber;
              }
          }
      }
      return {
          ...state,
          pinche:{
              ...pinche,
              orderprice,
              orderseatnumber
          }
      };
    },
    [orderconfirm_setpinche]: (state, payload) => {//init
        let pinche = payload;
        let beginstation = pinche.startstations[0];
        let endstation = pinche.endstations[0];
        let orderprice = 0;
        let orderseatnumber = pinche.orderseatnumber || 1;
        if(pinche.hasOwnProperty('carpoolprice')){
            if(pinche.carpoolprice.hasOwnProperty(beginstation)){
                if(pinche.carpoolprice[beginstation].hasOwnProperty(endstation)){
                    orderprice = pinche.carpoolprice[beginstation][endstation];
                    orderprice *= orderseatnumber;
                }
            }
        }
        return {
            ...state,
            pinche:{
                ...pinche,
                orderseatnumber,
                orderprice,
                beginstation,
                endstation
            }
        };
    },
    [orderconfirm_selpinchestation]: (state, payload) => {
        let pinche = state.pinche;
        let orderprice = pinche.orderprice;
        let selstationobj = payload;
        let beginstation = selstationobj.hasOwnProperty('beginstation')?selstationobj['beginstation']:state.pinche.beginstation;
        let endstation = selstationobj.hasOwnProperty('endstation')?selstationobj['endstation']:state.pinche.endstation;

        if(pinche.hasOwnProperty('carpoolprice')){
            if(pinche.carpoolprice.hasOwnProperty(beginstation)){
                if(pinche.carpoolprice[beginstation].hasOwnProperty(endstation)){
                    orderprice = pinche.carpoolprice[beginstation][endstation];
                    orderprice *= pinche.orderseatnumber;
                }
            }
        }
        return {
            ...state,
            pinche:{
                ...pinche,
                beginstation,
                endstation,
                orderprice,
                ...payload
            }
        };
    },
}, initial.orderconfirm);

export default orderconfirm;
