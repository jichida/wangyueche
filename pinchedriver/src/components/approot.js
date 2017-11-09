/**
 * Created by wangxiaoqing on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import {carmap_setmapinited} from '../actions';

import WeuiTool from './tools/weuitool';
import Login from './login/login.js';
import Index from './index';
import Routermap from './routermap';
import About from './setting/about';

import {
    Route,Redirect,
    Switch
} from 'react-router-dom';
import '../newcss/common.css';
import {requireAuthentication} from './requireauthentication';
import MessageCenter from './messagecenter/messagecenter.js';
import MessageDetail from './messagecenter/messagedetail.js';
import Routerdetail from "./routerdetail";
import Showuserpoint from "./userpoint";



class AppRoot extends React.Component {
  componentWillMount() {
        const script = document.createElement("script");
        script.src = "http://webapi.amap.com/maps?v=1.4.1&key=788e08def03f95c670944fe2c78fa76f&callback=init&&plugin=AMap.Geocoder,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.Geocoder,AMap.Driving";
        // script.src = "http://webapi.amap.com/maps?v=1.3&key=788e08def03f95c670944fe2c78fa76f&callback=init&plugin=AMap.Geocoder,AMap.Driving";
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
            <div className="AppContainer">
                <WeuiTool />
                <Switch>
                    <Route exact path="/" component={()=>(<Redirect to="/index"/>)}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/index" component={requireAuthentication(Index)}/>
                    <Route path="/routermap" component={requireAuthentication(Routermap)}/>
                    <Route path="/routerdetail/:id" component={requireAuthentication(Routerdetail)}/>
                    <Route path="/messagecenter" component={requireAuthentication(MessageCenter)}/>
                    <Route path="/mymessagedetail/:msgid" component={requireAuthentication(MessageDetail)} />
                    <Route path="/about/:keyname" component={About}/>
                    <Route path="/showuserpoint" component={Showuserpoint}/>
                </Switch>

            </div>
        );
    }
}
export default connect()(AppRoot);
