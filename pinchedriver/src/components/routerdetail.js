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
import {getonepincheroutepassengers_request} from '../actions';
import _ from 'lodash';

import '../newcss/index.css';

const { Cells, Cell, CellBody, CellFooter,CellHeader, CellsTitle, ActionSheet } = WeUI;
let usecacherouter = false;
let userphone = '';
let username = '';

export class Page extends Component {

     constructor(props) {
        super(props);
        this.state={
            ios_show: false,
            menus: [{
                label: "联系TA",
                onClick: ()=>{this.connectuser()}
            }, {
                label: "查看TA的位置",
                onClick: ()=>{this.pagePush("/showuserpoint")}
            }],
            actions: [
                {
                    label: '取消',
                    onClick: this.hide.bind(this)
                }
            ]
        }
    }

    hide(){
        this.setState({
            ios_show: false,
        });
    }

    connectuser =(p)=>{
        window.location.href = `tel:${p}`;
    }

    pagePush=(name)=>{
        usecacherouter = true;
        this.props.history.push(name);
    };

    componentDidMount(){
        usecacherouter = false;
        this.props.dispatch(getonepincheroutepassengers_request({_id:this.props.match.params.id}));
    }

    showsheet =(name, phone)=>{
        this.setState({
            ios_show: true,
            menus: [{
                label: `联系${name}`,
                onClick: ()=>{this.connectuser(phone)}
            },{
                label: `查看${name}的位置`,
                onClick: ()=>{this.pagePush("/showuserpoint")}
            }],
            actions: [
                {
                    label: '取消',
                    onClick: this.hide.bind(this)
                }
            ]
        });
        username = name;
        userphone = phone;
    }

    render() {
       let {
         startdate,
         starttime,
         startcity,
         endcity,
         groupnumber,
         seatnumber
       } = this.props.pincheroute;
       const {passengers:userlist} = this.props;
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
                            return (<Cell onClick={()=>{this.showsheet(userinfo.username,userinfo.username)}} access key={userinfo.userid}>
                                <CellBody>
                                    {userinfo.username}
                                </CellBody>
                                <CellFooter>
                                    座位数:{userinfo.seatnumbertotal}
                                </CellFooter>
                            </Cell>);
                        })
                    }
                </Cells>

                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={this.state.ios_show}
                    type="ios"
                    onRequestClose={e=>this.setState({ios_show: false})}
                />
            </div>
        )
    }
}

const mapStateToProps =  ({route}, props) =>{
    let id = props.match.params.id;
    let pincheroute = route.pincheroutes[id];
    let passengers = route.passengers;
    return {pincheroute,passengers};
};

Page = connect(mapStateToProps)(Page);
export default Page;
