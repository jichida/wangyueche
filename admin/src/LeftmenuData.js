import React  from 'react';
import PropTypes from 'prop-types';
import { translate } from 'admin-on-rest';


import PlatformbaseinfoIcon from 'material-ui/svg-icons/action/perm-data-setting';//平台基本信息
import BaseinfocompanyIcon from 'material-ui/svg-icons/action/settings-input-antenna';//平台基本信息
import BaseinfocompanystatIcon from 'material-ui/svg-icons/av/equalizer';//平台统计信息
import BaseinfocompanypayIcon from 'material-ui/svg-icons/action/payment';//平台支付机构信息
import BaseinfocompanyserviceIcon from 'material-ui/svg-icons/action/account-balance';//平台服务机构信息
import BaseinfocompanypermitIcon from 'material-ui/svg-icons/action/verified-user';//平台经营许可信息
import BaseinfocompanyfareIcon from 'material-ui/svg-icons/maps/local-atm';//运价信息
import BaseinfovehicleIcon from 'material-ui/svg-icons/maps/directions-car';//车辆信息
import BaseinfovehiclelnsuranceIcon from 'material-ui/svg-icons/hardware/security';//保险信息
import BaseinfovehicletotalmileIcon from 'material-ui/svg-icons/action/donut-large';//车辆里程信息
import BaseinfodriverIcon  from 'material-ui/svg-icons/action/assignment-ind';//司机基本信息
import BaseinfodrivereducateIcon  from 'material-ui/svg-icons/maps/directions-car';//司机教育信息
import BaseinfodriverappIcon  from 'material-ui/svg-icons/navigation/apps';//app信息
import BaseinfodriverstatIcon  from 'material-ui/svg-icons/editor/pie-chart';//司机统计信息
import BaseinfopassengerIcon  from 'material-ui/svg-icons/action/accessibility';//乘客基本信息

import PlatformorderIcon from 'material-ui/svg-icons/action/shopping-cart';//订单信息
import OrdercreateIcon from 'material-ui/svg-icons/action/note-add';//订单新建
import OrdermatchIcon from 'material-ui/svg-icons/action/done';//订单匹配
import OrdercancelIcon from 'material-ui/svg-icons/navigation/cancel';//订单取消

import PlatformoperateIcon from 'material-ui/svg-icons/action/motorcycle';//经营信息
import OperateloginIcon from 'material-ui/svg-icons/action/check-circle';//经营上线
import OperatelogoutIcon from 'material-ui/svg-icons/action/exit-to-app';//经营下线
import OperatedepartIcon from 'material-ui/svg-icons/action/flight-takeoff';//经营出发
import OperatearriveIcon from 'material-ui/svg-icons/action/flight-land';//经营到达
import OperatepayIcon from 'material-ui/svg-icons/action/credit-card';//经营支付

import PlatformpositionIcon from 'material-ui/svg-icons/communication/location-on';//位置
import PositiondriverIcon from 'material-ui/svg-icons/maps/person-pin';
import PositionvehicleIcon from 'material-ui/svg-icons/maps/edit-location';

import PlatformratedIcon from 'material-ui/svg-icons/action/face';//服务质量
import RatedpassengerIcon from 'material-ui/svg-icons/action/favorite';//乘客评价
import RatedpassengercomplaintIcon from 'material-ui/svg-icons/action/perm-phone-msg';//投诉
import RateddriverpunishIcon from 'material-ui/svg-icons/action/thumb-down';//惩罚信息
import RateddriverIcon from 'material-ui/svg-icons/action/favorite-border';//司机评价

import SysinfoIcon from 'material-ui/svg-icons/action/build';//系统设置
import SystemconfigIcon from 'material-ui/svg-icons/action/settings-brightness';//系统设置
import NotifymessageIcon from 'material-ui/svg-icons/communication/chat';//系统消息
import FaretypeIcon from 'material-ui/svg-icons/editor/monetization-on';//运价类型
import PriceIcon from 'material-ui/svg-icons/editor/attach-money';//价格信息
import AboutIcon from 'material-ui/svg-icons/action/info';//关于信息
import BuscarpoolIcon from 'material-ui/svg-icons/social/people-outline';//拼车信息
import TourbusinfoIcon from 'material-ui/svg-icons/maps/directions-bus';//旅游大巴信息
import CouponIcon from 'material-ui/svg-icons/action/card-giftcard';//优惠券信息
import OrderIcon from 'material-ui/svg-icons/action/euro-symbol';//订单信息
import TriprequestIcon from 'material-ui/svg-icons/action/pan-tool';//请求信息

import UsermgrIcon from 'material-ui/svg-icons/social/people-outline';//用户管理
import UserdriverIcon from 'material-ui/svg-icons/action/account-box';//司机信息
import UserriderIcon from 'material-ui/svg-icons/action/account-circle';//乘客信息
import UserIcon from 'material-ui/svg-icons/action/account-circle';//用户提现

export default [
   {name:'notifymessage',icon: <NotifymessageIcon />},
   {name:'buscarpool',icon: <BuscarpoolIcon />,},
   {name:'order',icon: <OrderIcon />,},
   {name:'triprequest',icon: <TriprequestIcon />,},
   {name:'userdriver',icon: <UserdriverIcon />,},
   {name:'mycar',icon: <UserriderIcon />,},

  {
    name:'usermgr',icon: <UsermgrIcon />,
    children: [
      { name:'userrider', icon: <UserriderIcon />,},
      { name: 'mycoupon', icon: <UserIcon /> },
      { name: 'withdrawcash', icon: <UserIcon /> },
      { name: 'userriderloginlog', icon: <UserIcon /> },
      { name: 'userdriverloginlog', icon: <UserIcon /> },
      { name: 'userdriverpincheloginlog', icon: <UserIcon /> },
      { name: 'userdriverpinche', icon: <UserIcon /> },
    ]
  },
  {
    name:'settingbaseinfo',icon: <PlatformbaseinfoIcon />,
    children: [
        { name:'tourbusinfo', icon: <TourbusinfoIcon />,},
        { name: 'systemconfig', icon: <SystemconfigIcon /> },
        { name: 'faretype', icon: <FaretypeIcon /> },
        { name: 'about', icon: <AboutIcon /> },
      ]
  },
  {
    'name':'platformbaseinfo',
    'icon': <PlatformbaseinfoIcon />,
    'children': [
      {
        'name':'baseinfocompany',
        'icon': <BaseinfocompanyIcon />,
      },
      {
        'name':'baseinfocompanystat',
        'icon': <BaseinfocompanystatIcon />,
      },
      {
        'name':'baseinfocompanypay',
        'icon': <BaseinfocompanypayIcon />,
      },
      {
        'name':'baseinfocompanyservice',
        'icon': <BaseinfocompanyserviceIcon />,
      },
      {
        'name':'baseinfocompanypermit',
        'icon': <BaseinfocompanypermitIcon />,
      },
      {
        'name':'baseinfocompanyfare',
        'icon': <BaseinfocompanyfareIcon />,
      },
      {
        'name':'baseinfovehicle',
        'icon': <BaseinfovehicleIcon />,
      },
      {
        'name':'baseinfovehiclelnsurance',
        'icon': <BaseinfovehiclelnsuranceIcon />,
      },
      {
        'name':'baseinfovehicletotalmile',
        'icon': <BaseinfovehicletotalmileIcon />,
      },
      {
        'name':'baseinfodriver',
        'icon': <BaseinfodriverIcon />,
      },
      {
        'name':'baseinfodrivereducate',
        'icon': <BaseinfodrivereducateIcon />,
      },
      {
        'name':'baseinfodriverapp',
        'icon': <BaseinfodriverappIcon />,
      },
      {
        'name':'baseinfodriverstat',
        'icon': <BaseinfodriverstatIcon />,
      },
      {
        'name':'baseinfopassenger',
        'icon': <BaseinfopassengerIcon />,
      },
    ]
  },
  {
    'name':'platformrun',
    'icon': <PlatformorderIcon />,
    'children': [
      {
        'name':'ordercreate',
        'icon': <OrdercreateIcon />,
      },
      {
        'name':'ordermatch',
        'icon': <OrdermatchIcon />,
      },
      {
        'name':'ordercancel',
        'icon': <OrdercancelIcon />,
      },
      {
        'name':'operatelogin',
        'icon': <OperateloginIcon />,
      },
      {
        'name':'operatelogout',
        'icon': <OperatelogoutIcon />,
      },
      {
        'name':'operatedepart',
        'icon': <OperatedepartIcon />,
      },
      {
        'name':'operatearrive',
        'icon': <OperatearriveIcon />,
      },
      {
        'name':'operatepay',
        'icon': <OperatepayIcon />,
      },
      {
        'name':'positiondriver',
        'icon': <PositiondriverIcon />,
      },
      {
        'name':'positionvehicle',
        'icon': <PositionvehicleIcon />,
      },
      {
        'name':'ratedpassenger',
        'icon': <RatedpassengerIcon />,
      },
      {
        'name':'ratedpassengercomplaint',
        'icon': <RatedpassengercomplaintIcon />,
      },
      ,
      {
        'name':'rateddriverpunish',
        'icon': <RateddriverpunishIcon />,
      },
      ,
      {
        'name':'rateddriver',
        'icon': <RateddriverIcon />,
      },
    ]
  },



];
