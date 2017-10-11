/**
 * Created by wangxiaoqing on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import {carmap_setmapinited} from '../actions';

import WeuiTool from './tools/weuitool';
import Login from './login/login.js';
import Caroverlayqd from './maps/caroverlayqd';
import Caroverlaystart from './maps/caroverlaystarttrip';
import Orderdetail from './orderdetail/orderdetail';
//我的订单（行程）
import Myorders from './myorders/orderlist';
//我的车辆
import Mycars from './mycars/carlist';
//新增车辆
import Createcar from './mycars/createcar/createcarwizard';
// import Feedetail from './orderdetail/feedetail';
//注册
import Register from './register/index.js';
//选择注册类型
import Register1 from './register/registerfillwizard';
//首页
import Index from './home/index';
import About from './home/about';
//出车
import Outcar from './maps/outcar';
//抢单
//个人中心-基本信息
import Editprofile from './editprofile/editprofile';
//个人中心-我的钱包
import Userwallet from './mywallet/wallet';
//个人中心－提现
import Withdraw from './mywallet/withdraw';
import Withdrawauth from './mywallet/withdrawauth';
//审核页面
import Approval from './register/approval';
import MessageCenter from './messagecenter/messagecenter.js';
import MessageDetail from './messagecenter/messagedetail.js';
//支付界面
import Findpwd from './login/findpwd';

import {
    Route,Redirect,
    Switch
} from 'react-router-dom';
import '../../public/newcss/common.css';
import {requireAuthentication,requireApproval} from './requireauthentication';
class AppRoot extends React.Component {
  componentWillMount() {
        const script = document.createElement("script");
        script.src = "http://webapi.amap.com/maps?v=1.3&key=788e08def03f95c670944fe2c78fa76f&callback=init&plugin=AMap.Geocoder,AMap.Driving";
        script.async = true;
        window.init = ()=>{
          console.log(`地图下载成功啦！`);
          window.initamaploaded = true;
          this.props.dispatch(carmap_setmapinited(true));
        }
        document.body.appendChild(script);
    }
    componentWillUnmount() {
      this.props.dispatch(carmap_setmapinited(false));
      window.initamaploaded = false;
    }
    render() {
        return (
            <div className="AppContainer"  style={{minHeight:window.innerHeight+"px"}}>
                <WeuiTool />
                <Switch>
                    <Route exact path="/" component={()=>(<Redirect to="/index"/>)}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/findpwd" component={Findpwd}/>
                    <Route path="/about/:keyname" component={About}/>
                    <Route path="/selrequest/:requestid" component={Caroverlayqd}/>
                    <Route path='/starttrip' component={Caroverlaystart} />
                    <Route path="/orderdetail/:triporderid" component={requireAuthentication(Orderdetail)}/>
                    <Route path="/myorders" component={requireAuthentication(Myorders)}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/register1" component={Register1}/>
                    <Route path="/index" component={Index}/>
                    <Route path="/messagecenter" component={MessageCenter}/>
                    <Route path="/mymessagedetail/:msgid" component={MessageDetail} />
                    <Route path="/outcar" component={requireApproval(Outcar)}/>
                    <Route path="/approval" component={requireAuthentication(Approval)}/>
                    <Route path="/mywallet" component={requireAuthentication(Userwallet)}/>
                    <Route path="/withdraw" component={requireAuthentication(Withdraw)}/>
                    <Route path="/withdrawauth/:withdrawid" component={requireAuthentication(Withdrawauth)}/>
                    <Route path="/editprofile" component={requireAuthentication(Editprofile)}/>
                    <Route path="/mycars" component={requireAuthentication(Mycars)}/>
                    <Route path="/createcar" component={requireAuthentication(Createcar)}/>
                    <Route path="/messagecenter" component={MessageCenter}/>
                </Switch>
            </div>
        );
    }
}
export default connect()(AppRoot);
