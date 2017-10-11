/**
 * Created by jiaowenhui on 2017/7/21.
 */
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import { connect } from 'react-redux';
import moment from "moment";
import NavBar from './tools/nav.js';
import InfinitePage from './controls/listview';
import {callthen} from '../sagas/sagacallback';
import _ from 'lodash';

import '../newcss/index.css';

const { Cells, Cell, CellBody, CellFooter,CellHeader, CellsTitle } = WeUI;
let usecacherouter = false;

export class Page extends Component {

    pagePush=(name)=>{
        usecacherouter = true;
        this.props.history.push(name);
    };

    componentDidMount(){
        usecacherouter = false;
    }

    render() {
       let {
         startdate,
         starttime,
         startcity,
         endcity,
         groupnumber,
         userlist,
         seatnumber
       } = this.props.pincheroute;
       try{
         startdate = moment(startdate).format("YYYY-MM-DD");
       }
       catch(e){

       }
       let starttimestring = `${startdate} ${starttime}`;

        return (
            <div className="pinchePage AppPage">
                <NavBar back={true} title="路线详情" rightnav={[
                    {icon : '../img/map.png',
                    text : '路线地图',
                    type : 'push',
                    url : '/routermap'}
                ]}/>
                <div className="pinche">
                    <div className="time">{starttimestring}</div>
                    <div className="city">
                        <span className="start">{startcity}</span>
                        <span className="line"></span>
                        <span className="end">{endcity}</span>
                    </div>

                    <div className="time2">
                        <span>{groupnumber}人成团</span>
                        <span>{userlist.length}人参与</span>
                    </div>
                </div>

                <CellsTitle>乘客列表</CellsTitle>
                  <Cells>
                {
                  _.map(userlist,(userinfo)=>{
                    return (<Cell href="tel:19000000000" access>
                        <CellBody>
                            张飞
                        </CellBody>
                        <CellFooter>
                            19000000000
                        </CellFooter>
                    </Cell>);
                  })
                }
                </Cells>
            </div>
        )
    }
}

const mapStateToProps =  ({route}, props) =>{
    let id = props.match.params.id;
    let pincheroute = route.pincheroutes[id];
    return {pincheroute};
};

Page = connect(mapStateToProps)(Page);
export default Page;
