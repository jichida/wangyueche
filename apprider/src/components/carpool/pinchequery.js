import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../../public/newcss/carpool.css';
import {
    orderconfirm_setpinche,
    getbuscarpool_request
} from '../../actions';
import _ from "lodash";
import NavBar from '../tools/nav.js';
import DatePicker from 'react-mobile-datepicker';

import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';

const { LoadMore } = WeUI;


// startdate:"2017-06-27"

class PincheQuery extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            time:new Date(),
            isOpen: false,
            prestyle: "pre"
        }
    }
    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => {
        this.setState({ time, isOpen: false });
        let querydata = this.props.query;
        querydata.startdate = moment(time).format('YYYY-MM-DD');
        this.props.dispatch(getbuscarpool_request(querydata));
        this.setPrestyle(querydata.startdate);
    }

    onClickPage(name,routeobj){
        this.props.dispatch(orderconfirm_setpinche(routeobj));
        this.props.history.push(name);
    }
    componentWillMount () {

        let querydata = this.props.query;
        this.setState({
            time:new Date(querydata.startdate),
            isOpen: false,
            prestyle: "pre"
        });
        this.props.dispatch(getbuscarpool_request(querydata));
    }

    preDay=()=>{
        //moment().add(7, 'days');
        if(this.state.time===moment((new Date())).format('YYYY-MM-DD')){

        }else{
            let querydata = this.props.query;
            querydata.startdate = moment(querydata.startdate).add('days',-1).format('YYYY-MM-DD');
            //console.log(querydata.startdate)
            this.setState({ time : new Date(querydata.startdate)  });
            this.props.dispatch(getbuscarpool_request(querydata));
            this.setPrestyle(querydata.startdate);
        }
    }

    nextDay=()=>{
        //moment().add(7, 'days');
        //"2017-06-27"
        let querydata = this.props.query;
        querydata.startdate = moment(querydata.startdate).add('days',1).format('YYYY-MM-DD');
        //console.log(querydata.startdate);
        this.setState({ time : new Date(querydata.startdate)  });
        this.props.dispatch(getbuscarpool_request(querydata));
        // if(querydata.startdate===moment((new Date())).format('YYYY-MM-DD')){//当前是今天
        //     this.setState({ prestyle: "pre endpre" });
        // }
    }


    setPrestyle=(d)=>{
        if(d===moment((new Date())).format('YYYY-MM-DD')){//当前是今天
            this.setState({ prestyle: "pre endpre" });
        }else{
            this.setState({ prestyle: "pre" });
        }
    }

    render() {
        return (
            <div className="carpoolPage AppPage">
                <NavBar back={true} title="查询路线" />

                <div className="setDay">
                    <span className={this.state.prestyle} onClick={this.preDay}>前一天</span>
                    <span
                        className="day"
                        onClick={this.handleClick}>
                        {moment(this.state.time).format("YYYY-MM-DD")}
                        <DatePicker
                            value={this.state.time}
                            isOpen={this.state.isOpen}
                            onSelect={this.handleSelect}
                            onCancel={this.handleCancel}
                            theme="ios"
                            />
                    </span>
                    <span className="next" onClick={this.nextDay}>后一天</span>
                </div>
                <div className="listcontent">
                    {this.props.resultroute.length>0?(
                        <div>
                            {
                                _.map(this.props.resultroute, (routeobj, index)=>{
                                    console.log(routeobj);
                                    const {
                                        pinchetype,
                                        starttime,
                                        startcity,
                                        endcity,
                                        groupnumber,
                                        seatnumbertotal,
                                        seatnumber,
                                    } = routeobj;
                                    return (
                                        <div
                                            className="li"
                                            key={index}
                                            >
                                                <div className="licontent">
                                                    <div className="time">{starttime}</div>
                                                    <div className="city">
                                                        {startcity}——{endcity}
                                                        <p
                                                            className="text-warning margin-top-0"
                                                            >
                                                            <span>{groupnumber}成团</span>
                                                            <span>载客{seatnumber}</span>
                                                            <span>{seatnumbertotal}人已参与</span>
                                                        </p>
                                                    </div>
                                                    <div className="bbtn">
                                                    {seatnumber > seatnumbertotal?
                                                        <span
                                                            onClick={this.onClickPage.bind(this,'/orderconfirm/pinche',routeobj)}
                                                            className="btn Primary">
                                                            参团
                                                        </span>:
                                                        <span> 已满 </span>
                                                      }
                                                    </div>
                                                </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ):(
                        <div>
                        <LoadMore showLine>暂无数据</LoadMore>
                        </div>
                    )}

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({pinche}) => {
    return {...pinche};
}
export default connect(
    mapStateToProps,
)(PincheQuery);
