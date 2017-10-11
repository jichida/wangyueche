/*
    个人中心-订单详情-头部
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../public/newcss/userorderinfo.css';
//快车、代驾、出租车
import Kuaiche from './orderdetailhead_kuaiche';
import Pinche from './orderdetailhead_pinche';
import Lvyoudaba from './orderdetailhead_lvyoudaba';
import moment from "moment";

class Page extends Component {
    render() {
        const { orderinfo,servicephonenumber} = this.props;
        return (
            <div className="orderinfohead">
            	{
            		orderinfo.triptype==="代驾"||
            		orderinfo.triptype==="快车"||
            		orderinfo.triptype==="出租车"?
            		(
            			<Kuaiche
            				orderinfo={orderinfo}
            			/>
            		):""
            	}
            	{
            		orderinfo.triptype==="旅游大巴"?
            		(
            			<Lvyoudaba
            				orderinfo={orderinfo}
                    servicephonenumber={servicephonenumber}
            			/>
            		):""
            	}
            	{
            		orderinfo.triptype==="拼车"?
            		(
            			<Pinche
            				orderinfo={orderinfo}
                    servicephonenumber={servicephonenumber}
            			/>
            		):""
            	}
                <span className="ordertime">下单时间: {moment(new Date(orderinfo.created_at)).format("YYYY/MM/DD H:mm:ss")}</span>
            </div>
        )
    }
}

const mapStateToProps =  ({app:{servicephonenumber}}) =>{
    return {servicephonenumber};
};

export default connect(
    mapStateToProps,
)(Page);
