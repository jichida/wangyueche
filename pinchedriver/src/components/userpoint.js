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
import Map from "./tools/map";
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
        return (
            <div className="routermapPage AppPage">
                <NavBar back={true} title="用户地点位置" />
                这是地图页面
                <Map />
            </div>
        )
    }
}

Page = connect()(Page);
export default Page;
