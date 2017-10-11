/*
    个人中心-订单详情-头部-//出租车－快车－代驾
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';
import moment from 'moment';
import {jsCallPhone} from '../../env/callphone.js';

export default class Page extends Component{
    render(){
        const {orderinfo,servicephonenumber} = this.props;
        const {
          triptype,
          rentusername,
          rentuserphone,
          startdate,
          enddate,
          orderdetail
        } = orderinfo;
        return (
            <div className="kuaicheinfo">
                <div className="driver">
                    <img src="newimg/17.png" className="avatar" alt=""/>
                    <div className="info">
                        <div>
                            <span>{rentusername}({rentuserphone})</span>
                            <span className="star"></span>
                        </div>
                        <div>
                            <span>{triptype}</span>
                        </div>
                    </div>
                    <div className="call"
                    onClick={(e)=>{jsCallPhone(`${servicephonenumber}`);}}>
                        <img src="newimg/20.png"  alt=""/>
                    </div>
                </div>
                <div className="busslist">
                    <div><img src="newimg/18.png"  alt=""/>用车时间:  {moment(startdate).format('YYYY-MM-DD')}</div>
                    <div><img src="newimg/18.png"  alt=""/>还车时间:  {moment(enddate).format('YYYY-MM-DD')}</div>
                    <div><img src="newimg/21.png"  alt=""/>{orderdetail}</div>
                </div>
            </div>
        )
    }
}
