import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Resource ,Delete} from 'admin-on-rest';
import themeReducer from './themeReducer';
import authClient from './authClient';

import logo from './logo.svg';
import './App.css';
import sagas from './sagas';
import Login from './Login';
import Layout from './Layout';
import Menu from './Menu';
//import { Dashboard } from './dashboard';
import CustomRoutes from './routes';
import translations from './i18n';
import restClient from './restClient';

import {PricelistList,PricelistCreate,PricelistEdit,PricelistShow} from './components/carprices/index.js';
import {AboutlistList,AboutlistEdit,AboutlistCreate} from './components/abouts/index.js';
import {BuscarpoolList,BuscarpoolCreate,BuscarpoolEdit,BuscarpoolShow} from './components/pinche/index';
import {TourbusinfolistList,TourbusinfolistCreate,TourbusinfolistEdit,TourbusinfolistShow} from './components/tourbusinfos/index.js';
import {SystemconfigList,SystemconfigShow,SystemconfigEdit,SystemconfigCreate} from './components/systemconfig/index.js';

import {MycouponlistList,MycouponlistCreate,MycouponlistEdit,MycouponlistShow} from './components/mycoupons/index.js';
import {OrderlistList,OrderlistEdit} from './components/orders/index.js';
import {TriprequestlistList,TriprequestlistShow} from './components/triprequest/index.js';
import {UserriderlistList,UserriderlistEdit} from './components/userriders/index.js';
import {UserdriverlistList,UserdriverlistEdit} from './components/userdrivers/index.js';

//import fakeRestServer from './restServer';
import {BaseInfoCompanyList,BaseInfoCompanyShow,BaseInfoCompanyEdit,BaseInfoCompanyCreate} from './components/platform/baseinfocompany.js';
import {BaseInfoCompanyStatList,BaseInfoCompanyStatShow,BaseInfoCompanyStatCreate,BaseInfoCompanyStatEdit} from './components/platform/baseinfocompanystat.js';
import {BaseInfoCompanyServiceList,BaseInfoCompanyServiceShow,BaseInfoCompanyServiceEdit} from './components/platform/baseinfocompanyservice.js';
import {BaseInfoCompanyPermitList,BaseInfoCompanyPermitShow,BaseInfoCompanyPermitCreate,BaseInfoCompanyPermitEdit} from './components/platform/baseinfocompanypermit.js';
import {BaseInfoCompanyPayList,BaseInfoCompanyPayCreate,BaseInfoCompanyPayEdit,BaseInfoCompanyPayShow}  from './components/platform/baseinfocompanypay.js';
import {BaseInfoCompanyFareList,BaseInfoCompanyFareCreate,BaseInfoCompanyFareEdit}  from './components/platform/baseinfocompanyfare.js';
import {BaseInfoVehicleList,BaseInfoVehicleCreate,BaseInfoVehicleEdit} from './components/platform/baseinfovehicle.js';
import {BaseInfoVehiclelnsuranceList,BaseInfoVehiclelnsuranceCreate,BaseInfoVehiclelnsuranceEdit,BaseInfoVehiclelnsuranceShow} from './components/platform/baseinfovehiclelnsurance.js';
import {BaseInfoVehicleTotalMileList,BaseInfoVehicleTotalMileShow} from './components/platform/baseinfovehicletotalmile.js';
import {BaseInfoDriverList,BaseInfoDriverCreate,BaseInfoDriverEdit}  from './components/platform/baseinfodriver.js';
import {BaseInfoDriverEducateList,BaseInfoDriverEducateCreate,BaseInfoDriverEducateEdit,BaseInfoDriverEducateShow} from './components/platform/baseinfodrivereducate.js';
import {BaseInfoDriverAppList,BaseInfoDriverAppShow} from './components/platform/baseinfodriverapp.js';
import {BaseInfoDriverStatList,BaseInfoDriverStatShow} from './components/platform/baseinfodriverstat.js';
import {BaseInfoPassengerList,BaseInfoPassengerShow} from './components/platform/baseinfopassenger.js';

import {OrderCreateList,OrderCreateShow}  from './components/platform/ordercreate.js';
import {OrderMatchList,OrderMatchShow}  from './components/platform/ordermatch.js';
import {OrderCancelList,OrderCancelShow}  from './components/platform/ordercancel.js';

import  {OperateArriveList,OperateArriveShow} from './components/platform/operatearrive.js';
import  {OperateDepartList,OperateDepartShow} from './components/platform/operatedepart.js';
import  {OperateLoginList,OperateLoginShow} from './components/platform/operatelogin.js';
import  {OperateLogoutList,OperateLogoutShow} from './components/platform/operatelogout.js';
import  {OperatePayList,OperatePayShow} from './components/platform/operatepay.js';

import  {PositionVehicleList,PositionVehicleShow} from './components/platform/positionvehicle.js';
import  {PositionDriverList,PositionDriverShow} from './components/platform/positiondriver.js';

import  {RatedDriverList,RatedDriverShow} from './components/platform/rateddriver.js';
import  {RatedDriverPunishList,RatedDriverPunishShow} from './components/platform/rateddriverpunish.js';
import  {RatedPassengerList,RatedPassengerShow} from './components/platform/ratedpassenger.js';
import  {RatedPassengerComplaintList,RatedPassengerComplaintShow} from './components/platform/ratedpassengercomplaint.js';
import  {FaretypelistList,FaretypelistCreate,FaretypelistEdit,FaretypelistShow} from './components/faretype/index.js';

import {NotifyMessagelistList,NotifyMessagelistCreate,NotifyMessagelistEdit,NotifyMessagelistShow} from './components/notifymessage/index.js';

import {CarbrandlistList,CarbrandlistEdit,CarbrandlistCreate} from './components/carbrand';
import {CarcolorlistList,CarcolorlistEdit,CarcolorlistCreate} from './components/carcolor';
import {CarmodellistList,CarmodellistEdit,CarmodellistCreate} from './components/carmodel';
import {MycarList,MycarEdit} from './components/mycar';
import {WithdrawcashlistList,WithdrawcashlistEdit} from './components/withdrawcashapply/index.js';

import {UserdriverpincheCreate,UserdriverpincheEdit,UserdriverpincheList} from './components/userdriverpinche/index.js';
import {UserriderloginlogList,UserdriverpincheloginlogList,UserdriverloginlogList} from './components/loginlog/index.js';

class App extends Component {

    render() {
        return (
            <Admin
                title="中南出行管理后台"
                restClient={restClient}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                customRoutes={CustomRoutes}
                authClient={authClient}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                locale="cn"
                messages={translations}
            >
            <Resource name="systemconfig" list={SystemconfigList} show={SystemconfigShow} edit={SystemconfigEdit} create={SystemconfigCreate} />

            <Resource name="carbrand" list={CarbrandlistList}  edit={CarbrandlistEdit} create={CarbrandlistCreate} remove={Delete} />
            <Resource name="carcolor" list={CarcolorlistList}  edit={CarcolorlistEdit} create={CarcolorlistCreate} remove={Delete} />
            <Resource name="carmodel" list={CarmodellistList}  edit={CarmodellistEdit} create={CarmodellistCreate} remove={Delete} />
            <Resource name="mycar" list={MycarList}  edit={MycarEdit} />

            <Resource name="baseinfocompany" list={BaseInfoCompanyList} show={BaseInfoCompanyShow} edit={BaseInfoCompanyEdit} create={BaseInfoCompanyCreate}/>
            <Resource name="baseinfocompanyservice" list={BaseInfoCompanyServiceList} show={BaseInfoCompanyServiceShow} edit={BaseInfoCompanyServiceEdit} />
            <Resource name="baseinfocompanystat" list={BaseInfoCompanyStatList} show={BaseInfoCompanyStatShow} create={BaseInfoCompanyStatCreate} edit={BaseInfoCompanyStatEdit} />
            <Resource name="baseinfocompanypermit" list={BaseInfoCompanyPermitList} show={BaseInfoCompanyPermitShow} create={BaseInfoCompanyPermitCreate} edit={BaseInfoCompanyPermitEdit} />
            <Resource name="baseinfocompanypay" list={BaseInfoCompanyPayList} create={BaseInfoCompanyPayCreate}  show={BaseInfoCompanyPayShow}  edit={BaseInfoCompanyPayEdit} />
            <Resource name="baseinfocompanyfare" list={BaseInfoCompanyFareList}  create={BaseInfoCompanyFareCreate}  edit={BaseInfoCompanyFareEdit} />
            <Resource name="baseinfovehicle" list={BaseInfoVehicleList} create={BaseInfoVehicleCreate}  edit={BaseInfoVehicleEdit}/>
            <Resource name="baseinfovehiclelnsurance" list={BaseInfoVehiclelnsuranceList} create={BaseInfoVehiclelnsuranceCreate}  edit={BaseInfoVehiclelnsuranceEdit}  show={BaseInfoVehiclelnsuranceShow} />
            <Resource name="baseinfovehicletotalmile" list={BaseInfoVehicleTotalMileList}  show={BaseInfoVehicleTotalMileShow} />
            <Resource name="baseinfodriver" list={BaseInfoDriverList} create={BaseInfoDriverCreate}  edit={BaseInfoDriverEdit}  />
            <Resource name="baseinfodrivereducate" list={BaseInfoDriverEducateList} create={BaseInfoDriverEducateCreate}  show={BaseInfoDriverEducateShow}  edit={BaseInfoDriverEducateEdit} />
            <Resource name="baseinfodriverapp" list={BaseInfoDriverAppList} show={BaseInfoDriverAppShow} />
            <Resource name="baseinfodriverstat" list={BaseInfoDriverStatList}  show={BaseInfoDriverStatShow} />
            <Resource name="baseinfopassenger" list={BaseInfoPassengerList} show={BaseInfoPassengerShow} />
            <Resource name="ordercreate" list={OrderCreateList} show={OrderCreateShow} />
            <Resource name="ordermatch" list={OrderMatchList} show={OrderMatchShow} />
            <Resource name="ordercancel" list={OrderCancelList} show={OrderCancelShow} />

            <Resource name="operatearrive" list={OperateArriveList} show={OperateArriveShow} />
            <Resource name="operatedepart" list={OperateDepartList} show={OperateDepartShow} />
            <Resource name="operatelogin" list={OperateLoginList} show={OperateLoginShow} />
            <Resource name="operatelogout" list={OperateLogoutList} show={OperateLogoutShow} />
            <Resource name="operatepay" list={OperatePayList} show={OperatePayShow} />

            <Resource name="positionvehicle" list={PositionVehicleList} show={PositionVehicleShow} />
            <Resource name="positiondriver" list={PositionDriverList} show={PositionDriverShow} />

            <Resource name="rateddriver" list={RatedDriverList} show={RatedDriverShow} />
            <Resource name="rateddriverpunish" list={RatedDriverPunishList} show={RatedDriverPunishShow} />
            <Resource name="ratedpassenger" list={RatedPassengerList} show={RatedPassengerShow} />
            <Resource name="ratedpassengercomplaint" list={RatedPassengerComplaintList} show={RatedPassengerComplaintShow} />

            <Resource name="faretype" list={FaretypelistList} create={FaretypelistCreate} edit={FaretypelistEdit} show={FaretypelistShow} />
            <Resource name="notifymessage" list={NotifyMessagelistList} create={NotifyMessagelistCreate} edit={NotifyMessagelistEdit} show={NotifyMessagelistShow} remove={Delete} />

            <Resource name="price" list={PricelistList} create={PricelistCreate} edit={PricelistEdit} show={PricelistShow} remove={Delete} />
            <Resource name="about" list={AboutlistList}  edit={AboutlistEdit} create={AboutlistCreate} remove={Delete} />
            <Resource name="buscarpool" list={BuscarpoolList} create={BuscarpoolCreate} edit={BuscarpoolEdit} show={BuscarpoolShow} remove={Delete} />
            <Resource name="tourbusinfo" list={TourbusinfolistList} create={TourbusinfolistCreate} edit={TourbusinfolistEdit} show={TourbusinfolistShow} remove={Delete} />
            <Resource name="mycoupon" list={MycouponlistList} create={MycouponlistCreate} edit={MycouponlistEdit} show={MycouponlistShow} remove={Delete} />
            <Resource name="order" list={OrderlistList} edit={OrderlistEdit} />
            <Resource name="triprequest" list={TriprequestlistList} show={TriprequestlistShow} />
            <Resource name="userdriver" list={UserdriverlistList} edit={UserdriverlistEdit} />
            <Resource name="userrider" list={UserriderlistList} edit={UserriderlistEdit} />

            <Resource name="withdrawcash" list={WithdrawcashlistList} edit={WithdrawcashlistEdit}/>

            <Resource name="userdriverpinche" list={UserdriverpincheList}  edit={UserdriverpincheEdit} create={UserdriverpincheCreate} remove={Delete} />

            <Resource name="userriderloginlog" list={UserriderloginlogList}  />
            <Resource name="userdriverloginlog" list={UserdriverloginlogList}  />
            <Resource name="userdriverpincheloginlog" list={UserdriverpincheloginlogList}  />
            </Admin>
        );
    }
}

export default App;
