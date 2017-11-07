
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getmypincheroute_request, getmypincheroute_result, ui_showleftmenu,logout_result } from '../actions';
import _ from "lodash";
import NavBar from './tools/nav.js';
import DatePicker from 'react-mobile-datepicker';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import InfinitePage from './controls/listview';
import {callthen} from '../sagas/sagacallback';
import '../newcss/index.css';
import { withRouter } from 'react-router-dom';

let usecacherouter = false;

class Leftmenu extends React.Component {

    pagePush=(name)=>{
        this.props.history.push(name);
    }


    render() {
        
        const { showleftmenu } = this.props;
        const leftstyle = showleftmenu? "leftmenu showleft AppPage":"leftmenu AppPage"

        return (
            <div className={leftstyle}>
                <div>
                <div className="avatar">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMcAAADICAYAAABcU/UTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDA4MUE3NzA5Qjc3MTFFN0E5QkY5OUIxM0FDNUUxRUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDA4MUE3NkY5Qjc3MTFFN0E5QkY5OUIxM0FDNUUxRUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3RTkwMTE1Nzk2ODExMUU3QjlDNTgyNDYxNjkwMUM4QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3RTkwMTE1ODk2ODExMUU3QjlDNTgyNDYxNjkwMUM4QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsCd8IAAAAxTSURBVHja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"/>
                    <span>王小庆</span>
                </div>
                <div className="menulist">
                    <div onClick={this.pagePush.bind(this, "/about/ridergroup")}>集团通讯录</div>
                    <div onClick={this.pagePush.bind(this, "/about/aboutus")}>关于我们</div>
                    <br/>
                    <div onClick={()=>{this.props.dispatch(logout_result());this.pagePush.bind(this, "/login")}} style={{borderTop: "1px solid #EEE"}}>退出登录</div>

                </div>
                </div>
                <i onClick={()=>{this.props.dispatch(ui_showleftmenu(false));}}/>
            </div>
        );
    }
}
Leftmenu = withRouter(Leftmenu);
const data =  ({app:{showleftmenu}}) =>{
    return {showleftmenu};
};
Leftmenu = connect(data)(Leftmenu);

class PincheQuery extends React.Component {

    pagePush=(name)=>{
        usecacherouter = true;
        this.props.history.push(name);
    }

    componentDidMount(){
        usecacherouter = false;
        this.props.dispatch(ui_showleftmenu(false));
    }

    updateContent = (routerinfo)=> {
        let {startdate,starttime,startcity,endcity,groupnumber,userlist,seatnumber} = routerinfo;
        try{
            startdate = moment(startdate).format("MM-DD");
        }
        catch(e){

        }
        let starttimestring = `${startdate} ${starttime}`;
        return  (
            <div
                className="li"
                onClick={()=>{this.pagePush(`routerdetail/${routerinfo._id}`)}}
                >
                    <div className="licontent">
                        <div className="time">{starttimestring}</div>
                        <div className="city">
                            {startcity}——{endcity}
                            <p
                                className="text-warning margin-top-0"
                                >
                                <span>{groupnumber}成团</span>
                                <span>载客{seatnumber}</span>
                                <span>{userlist.length}人已参与</span>
                            </p>
                        </div>
                    </div>
            </div>
        );
    }

    showleftmenufn = ()=>{
        this.props.dispatch(ui_showleftmenu(true));
    }

    render() {
        return (
            <div className="carpoolPage pincheindexPage AppPage">
                <Leftmenu />
                <NavBar 
                    back={false} 
                    title="查询路线" 
                    leftnav = {[
                        {
                            icon : 'data:image/png;base64,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',
                            text : '',
                            type : 'action',//push, action,
                            action : this.showleftmenufn.bind(this),
                            width : "26px",
                            height: "26px"
                        },
                    ]}
                    />
                <div className="contactlist" onClick={()=>{this.pagePush("/about/ridergroup")}}>查看集团通讯录</div>
                <div className="listcontent">
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
        );
    }
}

export default connect()(PincheQuery);

