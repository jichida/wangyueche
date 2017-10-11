/*
    个人中心-订单详情-头部-//出租车－快车－代驾
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';
import {jsCallPhone} from '../../env/callphone.js';

export default class Page extends Component{
    render(){
        const {orderinfo} = this.props;
        const {
          avatarURL
        } = orderinfo.riderinfo;
        return (
            <div className="kuaicheinfo">
                <div className="driver">
                    <img src={avatarURL} className="avatar" alt=""/>
                    <div className="address">
                        <div className="startaddress">{orderinfo.srcaddress.addressname}</div>
                        <div className="endaddress">{orderinfo.dstaddress.addressname}</div>
                    </div>
                    <a
                        onClick={(e)=>{jsCallPhone(`${orderinfo.riderinfo.RiderPhone}`);}}
                        className="call">
                        <img src="newimg/19.png"  alt=""/>
                    </a>
                </div>

            </div>
        )
    }
}
