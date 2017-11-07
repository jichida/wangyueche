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
import { getmypincheroute_request, getmypincheroute_result } from '../actions';
import {callthen} from '../sagas/sagacallback';
import '../newcss/index.css';


const { Cells, Cell, CellBody, CellFooter } = WeUI;
let usecacherouter = false;

export class Page extends Component {

    pagePush=(name)=>{
        usecacherouter = true;
        this.props.history.push(name);
    };

    componentDidMount(){
        usecacherouter = false;
    }

    updateContent = (routerinfo)=> {
        console.log(`routerinfo==>${JSON.stringify(routerinfo)}`);
        // {"_id":"5953837600935b0352e1a472","isenabled":true,"pinchetype":"人气团拼","startcity":"南京",
        // "endcity":"天长","startdate":"2017-08-09T16:00:00.000Z",
        // "seatnumber":50,"__v":0,"carpoolprice":{"鼓楼":{"总站":50,"分站":51},
        // "客运站":{"总站":60,"分站":61}},"starttime":"11:55","groupnumber":35,
        // "carpoolstationtime":{"鼓楼":"18:00","客运站":"18:20","总站":"21:00","分站":"21:10"},
        // "pinchedriveruserid":"597fedc8fb045406435074f8",
        // "userlist":[],"status":"未成团","endstations":["总站","分站"],
        // "startstations":["鼓楼","客运站"],"created_at":"2017-06-05T09:22:01.684Z"}
        let {startdate,starttime,startcity,endcity,groupnumber,userlist,seatnumber} = routerinfo;
        try{
          startdate = moment(startdate).format("YYYY-MM-DD");
        }
        catch(e){

        }
        let starttimestring = `${startdate} ${starttime}`;
        return  (
            <div
                className="licontent"
                onClick={()=>{this.pagePush(`routerdetail/${routerinfo._id}`)}}
                >

                <div className="time">{starttimestring}</div>
                <div className="city">
                    {startcity}——{endcity}
                    <p className="text-warning margin-top-0">
                        <span>{groupnumber}人成团</span>
                        <span>载客{seatnumber}人</span>
                        <span>{userlist.length}人已参与</span>
                    </p>
                </div>

            </div>
        );
    }

    render() {
        return (
            <div className="indexPage AppPage">
                <NavBar back={true} title="我的订单" />
                <div className="list">
                        <InfinitePage
                            usecache={usecacherouter}
                            listtypeid='routerinfo'
                            pagenumber={30}
                            updateContent={this.updateContent}
                            queryfun={(payload)=>{
                                return callthen(getmypincheroute_request,getmypincheroute_result,payload);
                            }}
                            listheight={window.innerHeight-300}
                            query={{}}
                            sort={{}}
                        />
                </div>
            </div>
        )
    }
}

Page = connect()(Page);
export default Page;