/**
 * Created by wangxiaoqing on 2017/3/22.
 */
import React from 'react';
import { connect } from 'react-redux';

import OrderToPayDetailPinche from './pinche';
import OrderToPayDetailTourbus from './tourbus';
import {orderconfirm_setpayway,insertorder_request} from '../../actions';
import NavBar from "../tools/nav.js";
import "../../../public/newcss/orderconfirm.css";

export class Page extends React.Component {

    onClickOK(){
        let order = {};
        //生成一个订单，跳转到订单详情页
        if(this.props.match.params.clickfrom === 'pinche'){
            order = {
                triptype:'拼车',
                ordertitle:'拼车订单',
                orderdetail:this.props.startcity+'('+this.props.beginstation+')至'+this.props.endcity+'('+this.props.endstation+')',
                starttime:this.props.starttime,//出发时间
                startdate:this.props.startdate,//出发日期
                startstation:this.props.beginstation,//关联拼车信息
                endstation:this.props.endstation,//关联拼车信息
                startcity:this.props.startcity,//关联拼车信息
                endcity:this.props.endcity,//关联拼车信息
                orderprice:this.props.orderprice,
                buscarpoolid:this.props._id,
                seatnumber:this.props.orderseatnumber || 1,
                frontmoney:0
            };
        }
        else if(this.props.match.params.clickfrom === 'tourbus'){
            order = {
                triptype:'旅游大巴',
                rentusername:this.props.rentusername,
                startdate:this.props.startdate,//出发日期
                enddate:this.props.enddate,//出发日期
                orderdetail:this.props.orderdetail,
                orderprice:this.props.orderprice,
                frontmoney:this.props.frontmoney
            };
        }
        else{
            console.log(`${this.props.match.params.clickfrom}`);
            return;
        }
        console.log(`insertorder order:` + JSON.stringify(order));
        this.props.dispatch(insertorder_request(order));
    }

    onClickPayway(name){
      this.props.dispatch(orderconfirm_setpayway(name));
    }
    render() {
        const dataLeft = {
            title: '确认出行',
        };

        let OrderToPayDetail = null;
        if(this.props.match.params.clickfrom === 'pinche'){
            OrderToPayDetail = <OrderToPayDetailPinche {...this.props} />;
        }
        else if(this.props.match.params.clickfrom === 'tourbus'){
            OrderToPayDetail = <OrderToPayDetailTourbus {...this.props} />;
        }
        return (
            <div className="orderconfirmPage AppPage">
                <NavBar
                    back={dataLeft.title}
                    title="确认出行"
                    />
                <div className="list">
                    {OrderToPayDetail}
                </div>
                <div className="submitbtn">
                    <div>总价: <span className="color_error">{this.props.orderprice}</span>元</div>
                    <div
                        onClick={this.onClickOK.bind(this)}
                        className="btn Primary"
                        >立刻预定</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({orderconfirm},props) => {
    const {pinche,tourbus,payway} = orderconfirm;
    let cheprops = null;
    if(props.match.params.clickfrom === 'pinche'){
        cheprops = pinche;
    }
    else if(props.match.params.clickfrom === 'tourbus'){
        cheprops = tourbus;
    }
    return {...cheprops,payway};
}
export default connect(
    mapStateToProps,
)(Page);
