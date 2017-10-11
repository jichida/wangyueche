﻿/*
    个人中心-订单详情-支付订单
*/
import React, { Component } from 'react';
import '../../../public/newcss/userorderinfo.css';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userorderinfo.css';
const { LoadMore } = WeUI;
import _ from 'lodash';
import { connect } from 'react-redux';
import {payorderwithcash_request,set_weui} from '../../actions';

class Page extends Component{
    toPay(){
      let getMoney = ()=>{
        const {orderinfo} = this.props;
        this.props.dispatch(payorderwithcash_request({
          query:{
            _id:orderinfo._id,
            paystatus: { $ne: '已支付' }
          }
        }));
      }
      let confirm = {
        show : true,
        title : "确定支付",
        text : "你确定收到现金了吗?",
        buttonsCloseText : "取消",
        buttonsClickText : "确定",
        buttonsClose : ()=>{console.log('click close');},
        buttonsClick : ()=>{getMoney();}
      };
      this.props.dispatch(set_weui({confirm}));

    }

    render(){
      const {orderinfo} = this.props;
      const {
        orderprice,
        triptype
      } = orderinfo;

      let paycontentlist  = [];
      if(triptype === '出租车' || triptype === '快车' || triptype === '代驾' ){
          const {realtimepricedetail} = orderinfo;
          if(!!realtimepricedetail && orderprice > 0){
            let {pricelistdetail} = realtimepricedetail;
            paycontentlist = pricelistdetail || [{
              name:`里程${realtimepricedetail.totalkm}公里`,
              fee:`${orderprice}元`
            }];
          }
          else{
            paycontentlist.push({
              name:`费用`,
              fee:`0元`
            });
          }
      }
      else if(triptype === '拼车'){
        paycontentlist.push({
          name:`拼车费用`,
          fee:`${orderprice}元`
        });
      }
      else if(triptype === '旅游大巴'){
        paycontentlist.push({
          name:`总费用`,
          fee:`${orderprice}元`
        });
      }

      let isshowpaycontent = true;
      if(triptype === '出租车' || triptype === '快车' || triptype === '代驾' ){
        isshowpaycontent = orderinfo.orderstatus !== '已取消';
      }

      if(!isshowpaycontent){
        //已取消的情况
        return (
               <div className="paycontent">
                  <div className="content">
                      <LoadMore showLine>{orderinfo.orderstatus}</LoadMore>
                  </div>
                </div>);
      }

      let hascoupons = false;
      if(orderinfo.paystatus === '已支付'){
        //只有已支付才有可能显示优惠券信息
        if(orderinfo.couponprice > 0 && !!orderinfo.couponinfo){
          hascoupons = true;
        }
      }

      return (
                <div className="paycontent">
                    <div className="content">
                        <LoadMore showLine>{orderinfo.paystatus}</LoadMore>
                        <span className="price color_warning">{orderprice}元</span>
                    </div>
                    <div className="pricelist PanelBox">
                        <div className="tit">车费情况</div>
                        <div className="list">
                            {
                              _.map(paycontentlist,(feeinfo,index)=>{
                                return (
                                  <p key={index}><span>{feeinfo.name}</span><span>{feeinfo.fee}</span></p>
                                )
                              })
                            }
                            {
                              hascoupons &&
                                <p>
                                   <span className="color_warning">
                                    {orderinfo.couponinfo.pricediscountpercent}折券抵扣(最高{orderinfo.couponinfo.pricediscountmax}元)
                                   </span>
                                   <span className="color_warning">
                                   -{orderinfo.couponprice}元
                                   </span>
                                </p>
                            }
                        </div>
                    </div>
                    {orderinfo.orderstatus === '待支付' && <div className="getMoney" onClick={this.toPay.bind(this)}><span>现金支付</span></div>}
                </div>
        )
    }
}

export default connect()(Page);
