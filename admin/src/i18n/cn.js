export default {
  pos:{
    configuration: '偏好',
    language:'语言',
    theme: {
        name: '皮肤',
        light: 'Clair',
        dark: 'Obscur',
    },
  },
  resources: {
    userriderloginlog:{
      name: '乘客登录日志 |||| 乘客登录日志',
    },
    userdriverloginlog:{
      name: '小车司机登录日志 |||| 小车司机登录日志',
    },
    userdriverpincheloginlog:{
      name: '拼车司机登录日志 |||| 拼车司机登录日志',
    },
    userdriverpinche:{
      name: '拼车司机管理 |||| 拼车司机管理',
    },
    mycoupon:{
      name: '乘客优惠券 |||| 乘客优惠券',
      fields:{
        creator:'所属乘客',
      }
    },
    mycouponsbatch:{
      name:'批量优惠券 |||| 批量优惠券',
      fields:{
        creators:'所属用户',
      }
    },
    withdrawcash:{
      name: '提现管理 |||| 提现管理',
    },
      carinfo: {
          name: '车辆管理 |||| 车辆管理',
      },
      mycar:{
        name: '驾驶员车辆列表 |||| 驾驶员车辆列表',
        tabs:{
          basicinfo:'车辆信息',
          tab0:'基本信息',
          tab1:'发动机',
          tab2:'证件信息',
          tab3:'卫星定位装置',
          tab4:'服务',
        },
        notification:{
          approved_success:'审批成功',
          approved_error:'审批失败',
          rejected_success:'拒绝成功',
          rejected_error:'拒绝失败',
          approvedstart_success:'开始审核成功',
          approvedstart_error:'开始审核失败',
        },
      },
      carbrand: {
          name: '车辆品牌 |||| 车辆品牌',
      },
      carmodel: {
          name: '车辆型号 |||| 车辆型号',
          fields:{
            carbrandid:'选择品牌'
          }
      },
      carcolor: {
          name: '车辆颜色 |||| 车辆型号',
      },
      settingbaseinfo:{
         name: '基础信息设置|||| 基础信息设置',
      },
      platformbaseinfo:{
         name: '平台基本信息维护|||| 平台基本信息维护',
      },
      platformorder:{
        name: '平台订单|||| 平台订单',
      },
      platformrun:{
        name: '平台运行信息|||| 平台运行信息',
      },
      platformoperate:{
       name: '经营信息|||| 经营信息',
      },
      platformposition:{
       name: '定位信息|||| 定位信息',
      },
      platformrated:{
        name: '服务质量|||| 服务质量',
      },
      sysinfo:{
       name: '系统功能|||| 系统功能',
      },
      usermgr:{
        name: '用户管理|||| 用户管理',
      },
    baseinfocompany:{
      name: '基本信息 |||| 基本信息',
      showpagename:'显示基本信息',
      editpagename:'编辑基本信息'
    },
    baseinfocompanystat:{
      name: '营运规模 |||| 营运规模',
    },
    baseinfocompanypay:{
      name: '支付信息 |||| 支付信息',
    },
    baseinfocompanyservice:{
      name: '服务机构 |||| 服务机构',
    },
    baseinfocompanypermit:{
      name: '经营许可 |||| 经营许可',
    },
    baseinfocompanyfare:{
      name: '运价信息 |||| 运价信息',
      tabs:{
        tab0:'基本信息',
        tab1:'高级信息'
      },
      fields:{
        FareType:'类型'
      }
    },
    baseinfovehicle:{
      name: '车辆基本信息 |||| 车辆基本信息',
      tabs:{
        tab0:'基本信息',
        tab1:'发动机',
        tab2:'证件信息',
        tab3:'卫星定位装置',
        tab4:'服务',
      }
    },
    baseinfovehicleinsurance:{
      name: '车辆保险信息 |||| 车辆保险信息',
    },
    baseinfovehicletotalmile:{
      name: '车辆里程信息 |||| 车辆里程信息',
    },
    baseinfodriver:{
      name: '驾驶员基本信息 |||| 驾驶员基本信息',
      tabs:{
        tab0:'基本信息',
        tab1:'证件信息',
        tab2:'资格证',
        tab3:'合同信息',
        tab4:'紧急联系人',
      }
    },
    baseinfodrivereducate:{
      name: '驾驶员培训信息 |||| 驾驶员培训信息',
    },
    baseinfodriverapp:{
      name: '驾驶员移动终端信息 |||| 驾驶员移动终端信息',
    },
    baseinfodriverstat:{
      name: '驾驶员统计信息 |||| 驾驶员统计信息',
    },
    baseinfopassenger:{
      name: '乘客基本信息 |||| 乘客基本信息',
    },

    ordercreate:{
      name: '订单发起 |||| 订单发起',
    },
    ordermatch:{
      name: '订单成功 |||| 订单成功',
    },
    ordercancel:{
      name: '订单撤销 |||| 订单撤销',
    },

    operatelogin:{
      name: '经营上线 |||| 经营上线',
    },
    operatelogout:{
      name: '经营下线 |||| 经营下线',
    },
    operatedepart:{
      name: '经营出发 |||| 经营出发',
    },
    operatearrive:{
      name: '经营到达 |||| 经营到达',
    },
    operatepay:{
      name: '经营支付 |||| 经营支付',
    },

    positiondriver:{
      name: '驾驶员定位 |||| 驾驶员定位',
    },
    positionvehicle:{
      name: '车辆定位 |||| 车辆定位',
    },

    ratedpassenger:{
      name: '乘客评价 |||| 乘客评价',
    },
    ratedpassengercomplaint:{
      name: '乘客投诉 |||| 乘客投诉',
    },
    rateddriverpunish:{
      name: '驾驶员处罚 |||| 驾驶员处罚',
    },
    rateddriver:{
      name: '驾驶员信誉 |||| 驾驶员信誉',
    },

    systemconfig:{
      name: '系统配置 |||| 系统配置',
      tabs:{
        rider:'乘客端设置',
        pinche:'拼车设置',
        sysconfig:'设置',
        driver:'司机端设置',
        }
    },
    faretype:{
      name: '运价类型说明 |||| 运价类型说明',
    },
    notifymessage:{
      name: '系统消息 |||| 系统消息',
    },
    price: {
        name: '价格 |||| 价格',
    },
    about: {
        name: '关于 |||| 关于',
    },
    buscarpool: {
        name: '拼车 |||| 拼车',
        fields:{
          pinchedriveruserid:'拼车司机',
          startstation:'出发站点',
          endstation:'目的站点',
          price:'价格',
          passenager:'乘客信息',
          stationname:'站点名称',
          starttime:'到站时间'
        },
        tabs: {
            basicinfo: '基本信息',
            citystation: '城市站点',
            passenager:'乘客信息'
        },
        notification:{
          copyrecord_success: '拷贝记录成功',
          copyrecord_error: '拷贝记录失败',
        },
    },
    tourbusinfo: {
        name: '旅游大巴 |||| 旅游大巴',
    },
    coupon: {
        name: '优惠券 |||| 优惠券',
    },
    order: {
        name: '订单 |||| 订单',
        tabs:{
          basic:'基本信息',
          info:'订单详情',
          daijia:'代驾信息',
          chuzuche:'出租车信息',
          kuaiche:'快车信息',
          lvyoudaba:'旅游大巴信息',
          pinche:'拼车信息'
        }
    },
    triprequest: {
        name: '行程 |||| 行程',
    },
    userdriver: {
        name: '司机 |||| 司机',
        fields:{
          Platform_baseInfoVehicle:{
            FareType:'运价类型'
          }
        },
        tabs:{
          basicinfo:'基本信息',
          picurls:'照片',
          platformdriverinfo:'平台驾驶员信息',
          platformhukou:'平台户口信息',
          platformtaxi:'平台出租车信息',
          platformcontract:'平台驾驶员合同',
          platformemergencycontact:'平台紧急联系人',
          vehicle:'车辆信息'
        },
        notification:{
          approved_success:'审批成功',
          approved_error:'审批失败',
          rejected_success:'拒绝成功',
          rejected_error:'拒绝失败',
          approvedstart_success:'开始审核成功',
          approvedstart_error:'开始审核失败',
        },
    },
    userrider: {
        name: '乘客 |||| 乘客',
    },
  }

};
