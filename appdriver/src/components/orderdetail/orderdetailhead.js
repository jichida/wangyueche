/*
    个人中心-订单详情-头部
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';
//快车、代驾、出租车
import Kuaiche from './orderdetailhead_kuaiche';

export default class Page extends Component {
    render() {
        const { orderinfo } = this.props;
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
            </div>
        )
    }
}


