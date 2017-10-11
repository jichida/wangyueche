import { createReducer } from 'redux-act';
import {
    carmap_setenableddrawmapflag,
    carmap_setmapcenter,
    carmap_changemarkerstartlatlng,
    carmap_setdragging,
    carmap_setzoomlevel,
    carmap_setstartaddress,
    carmap_setendaddress,
    carmap_resetmap,
    carmap_setcurlocation,
    carmap_settriptype,
    getnearestdrivers_result,
    getprice_result,
    driveroute_result,
    starttriprequestorder_result,
    canceltriprequestorder_result,
    updaterequeststatus_result,
    ui_setindexmapvisiable,
    serverpush_triprequest,
    serverpush_triporder,
    serverpush_triprequestandorder,
    carmap_setmapinited,
    nav_drawroute,
    serverpush_driverlocation,
    serverpush_orderprice,
    serverpush_restoreorder,
    serverpush_restoreorder_effect,
    driveroute_request
} from '../actions';
import _ from 'lodash';

import L from 'leaflet';

const locz = [0,0];


const initial = {
    carmap: {
        isMapInited:false,
        isindexmapvisiable:false,//是否停留在首页地图(发送附近车辆请求条件)
        triptype:'出租车',//当前打车类型
        dragging:false,//是否正在拖动（拖动中避免某些特性可提升性能）
        enabledragging:true,//是否允许拖动
        mapstage:'pageinit',//指明打车阶段
        autozoomenabled:true,//是否自动缩放成合适视图
        zoomlevel:16,//缩放等级
        curlocation:L.latLng(locz[1], locz[0]),//当前位置
        markerstartlatlng:L.latLng(locz[1], locz[0]),//起始位置
        markerendlatlng:L.latLng(locz[1], locz[0]),//目的位置
        driverlocation:L.latLng(locz[1], locz[0]),//司机位置
        lastsend_navtime:new Date(),
        mapcenterlocation:L.latLng(locz[1], locz[0]),//地图中心位置
        driverlist:[],//所有司机位置
        driveruserlist:[],//所有司机位置
        routeleftpts:[],//剩余路线
        routepastpts:[],//已经走过的路线
        enableddrawmapflag:0,//画图标志
        srcaddress:{
            addressname:'',
            location:L.latLng(locz[1], locz[0]),//起始位置
        },
        dstaddress:
        {
            addressname:'',
            location:L.latLng(locz[1], locz[0]),//起始位置
        },
        iswaitingforcallpage: false, //是否停留在叫车页面

        totaldistance: 0,//当前预估距离,单位：米【评估价格用】
        totalduration: 0,//当前预估时间，单位：秒【评估价格用】
        resulthtmlstring:"<span>正在获取价格</span>",//【停留在叫车页面时的显示】
        resultpricerequest:{//获取到价格详情的结果
            fareid:'',
            totalprice:0,
            pricestringdetail:'',
            pricestringdebug:'',
            totalkm:0,
            calcUnitPricePerMile:0,
            totalduringminute:0,
            calcUnitPricePerMinute:0
        },
        curmappageorder:{//当前订单信息

        },
        curmappagerequest:{//当前请求信息

        },
        totaldistancetxt:'',
        totaldurationtxt:'',
    },
};

const carmap = createReducer({
    [driveroute_request]:(state,payload)=>{
      let lastsend_navtime = new Date();
      return {...state,lastsend_navtime};
    },
    [carmap_setenableddrawmapflag]:(state,payload)=>{
      let enableddrawmapflag = payload;
      return {...state,enableddrawmapflag};
    },
    [serverpush_restoreorder]:(state,payload)=>{
      //恢复一个订单
      let enabledragging = false;//不允许拖动
      let curmappagerequest = payload.triprequest;
      let curmappageorder = payload.triporder;
      let mapstage = 'pageorder';
      //还原起始点，终点
      let driverlocation = state.driverlocation;
      if(curmappageorder.driverlocation.length > 0){//数组
        driverlocation = L.latLng(curmappageorder.driverlocation[1],curmappageorder.driverlocation[0]);
      }
      let markerstartlatlng = L.latLng(curmappageorder.srcaddress.location.lat, curmappageorder.srcaddress.location.lng);
      let markerendlatlng = L.latLng(curmappageorder.dstaddress.location.lat, curmappageorder.dstaddress.location.lng);
      return {...state,enabledragging,curmappagerequest,curmappageorder,mapstage,
        driverlocation,markerstartlatlng,markerendlatlng};
    },
    [serverpush_restoreorder_effect]:(state,payload)=>{
      //恢复一个订单
      let enabledragging = false;//不允许拖动
      let curmappagerequest = payload.triprequest;
      let curmappageorder = payload.triporder;
      let mapstage = 'pageorder';
      //还原起始点，终点
      let driverlocation = state.driverlocation;
      if(curmappageorder.driverlocation.length > 0){//数组
        driverlocation = L.latLng(curmappageorder.driverlocation[1],curmappageorder.driverlocation[0]);
      }
      let markerstartlatlng = L.latLng(curmappageorder.srcaddress.location.lat, curmappageorder.srcaddress.location.lng);
      let markerendlatlng = L.latLng(curmappageorder.dstaddress.location.lat, curmappageorder.dstaddress.location.lng);
      return {...state,enabledragging,curmappagerequest,curmappageorder,mapstage,
        driverlocation,markerstartlatlng,markerendlatlng};
    },
    [serverpush_driverlocation]:(state,payload)=>{
      let driverlocation = L.latLng(payload.driverlocation[1], payload.driverlocation[0]);
      //显示司机位置
      return {...state,driverlocation};
    },
    [serverpush_orderprice]:(state,payload)=>{
      let {realtimepricedetail,triporderid} = payload;
      if(triporderid === state.curmappageorder._id){
        return {...state,curmappageorder:{
          ...state.curmappageorder,
          orderprice:realtimepricedetail.price,
          realtimepricedetail
        }};
      }
      return {...state};
    },
    [nav_drawroute]:(state,payload)=>{
      let totaldistancetxt = payload.totaldistancetxt;
      let totaldurationtxt = payload.totaldurationtxt;
      let routeleftpts = payload.latlngs;
      return {...state,totaldistancetxt,totaldurationtxt,routeleftpts};
    },
    [carmap_setmapinited]:(state,isMapInited)=>{
      return {...state,isMapInited}
    },
    [carmap_setstartaddress]:(state,data)=>{//未叫车前改变出发地
        let markerstartlatlng =  L.latLng(data.location.lat,data.location.lng);
        let mapcenterlocation = markerstartlatlng;
        return {...state,
            srcaddress:{
                addressname:data.addressname,
                location:data.location
            },
            markerstartlatlng,
            mapcenterlocation
        };
    },
    [carmap_setendaddress]:(state,data)=>{//改变目的地
        return {...state,
                dstaddress:
                {
                    addressname:data.addressname,
                    location:data.location
                },
                markerendlatlng:L.latLng(data.location.lat, data.location.lng),
                iswaitingforcallpage:true,
                enabledragging:false,
                driverlist:[]
            };
    },
    [driveroute_result]:(state,result)=>{
        //获取到路线后
        const {latlngs,...rest} = result;
        let routeleftpts = state.routeleftpts;
        if(rest.drawroute){
            routeleftpts = [];
          //if(state.iswaitingforcallpage){//在叫车页面,画导航线
              _.map(latlngs,(curloc)=>{
                  routeleftpts.push(L.latLng(curloc.lat, curloc.lng));
              });
          //}
        }
        return { ...state,...rest,routeleftpts};
    },
    [getprice_result]:(state,result)=>{
        const {resulthtmlstring,...rest} = result;
        return { ...state,resulthtmlstring,resultpricerequest:{
            ...rest
        }};
    },
    [ui_setindexmapvisiable]:(state,isindexmapvisiable)=>{
     return { ...state,isindexmapvisiable };
    },
    [serverpush_triprequest]:(state,payload)=> {
        let curmappagerequest = {...payload.triprequest};
        return { ...state,curmappagerequest };
    },
    [serverpush_triporder]:(state,payload)=> {
        let curmappageorder = {...payload.triporder};
        //let carlatlng = L.latLng([curloc.driverlocation[1], curloc.driverlocation[0]]);
        return { ...state, curmappageorder };
    },
    [serverpush_triprequestandorder]:(state,payload)=> {
        let curmappageorder = {...payload.triporder};
        let curmappagerequest = {...payload.triprequest};
        return { ...state, curmappageorder,curmappagerequest };
    },
    [updaterequeststatus_result]:(state,result)=> {
        let curmappagerequest = {...result.triprequest};
        return {...state,curmappagerequest};
    },
    [starttriprequestorder_result]:(state,result)=> {
        let curmappageorder = {...result.triporder};
        let curmappagerequest = {...result.triprequest};
        let iswaitingforcall = false;
        return {...state,iswaitingforcall,curmappageorder,mapstage:'pageorder',curmappagerequest};
    },
    [canceltriprequestorder_result]:(state,result)=> {
        //叫车中取消叫车后,目的地不显示,路线不显示,store恢复初始化
        let {isMapInited,mapcenterlocation,triptype,curlocation,markerstartlatlng,srcaddress} = state;
        let autozoomenabled = true;
        mapcenterlocation = markerstartlatlng;
        return {...initial.carmap,isMapInited,mapcenterlocation,triptype,curlocation,markerstartlatlng,
            srcaddress,autozoomenabled};
    },
    [carmap_resetmap]:(state,initobj)=> {
        //被行程完成 和 取消叫车后调用,路线不显示,store恢复初始化
        let {isMapInited,mapcenterlocation,triptype,curlocation,markerstartlatlng,srcaddress,zoomlevel} = state;
        mapcenterlocation = markerstartlatlng;
        return {...initial.carmap,isMapInited,mapcenterlocation,triptype,curlocation,markerstartlatlng,
            srcaddress,zoomlevel};
    },
    [carmap_setmapcenter]:(state,payload)=>{
      let mapcenterlocation = L.latLng(payload.lat, payload.lng)
      return {...state,mapcenterlocation}
    },
    [carmap_setcurlocation]:(state,curlocation)=>{
        //获取到当前位置,显示在地图上
        curlocation = L.latLng(curlocation.lat, curlocation.lng);
        return {...state,curlocation};
    },
    [carmap_settriptype]:(state,triptype)=>{
        return {...state,triptype};
    },
    [carmap_changemarkerstartlatlng]: (state, markerstartlatlng) => {
        //改变起始地,初始化或拖动后调用
        markerstartlatlng = L.latLng(markerstartlatlng.lat, markerstartlatlng.lng);
        return { ...state, markerstartlatlng };
    },
    [carmap_setdragging]:(state,dragging)=>{
        //判断是否正在拖动
        return { ...state, dragging};
    },
    [carmap_setzoomlevel]:(state,zoomlevel)=>{
        //改变地图缩放等级
        let autozoomenabled = false;
        return { ...state, zoomlevel,autozoomenabled };
    },
    [getnearestdrivers_result]:(state,result)=>{
        //获取起始地址并且返回附近司机列表
        let driverlist = [];
        let driveruserlist = [];
        _.map(result.neardrivers,(cardriver)=>{
            let carlatlng = L.latLng([cardriver.driverlocation[1], cardriver.driverlocation[0]]);
            driverlist.push(carlatlng);
            driveruserlist.push(cardriver.driverid);
        });
        //把附近司机显示在地图上
      return { ...state,
            driverlist:[...driverlist],
            driveruserlist:[...driveruserlist]
         };
    },

}, initial.carmap);

export default carmap;
