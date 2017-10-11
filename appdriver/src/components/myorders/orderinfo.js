/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import { connect } from 'react-redux';

import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/userorderinfo.css';
import NavBar from '../tools/nav.js';
import StarRatingComponent from 'react-star-rating-component';
const {
    Form,
    FormCell,
    CellBody,
    TextArea,
    LoadMore
    } = WeUI;

class Page extends Component {

    render() {
        const {orderinfo} = this.props;
        let iscommented = orderinfo.commentflag & 2 > 0;//
        //paystatus：未支付->已支付定金->已支付
        return (
            <div className="userorderinfoPage AppPage">
                <NavBar back={true} title="订单详情" />
                <div className="pageContent">
                    <div className="orderinfohead">
                        <img src="newimg/17.png" className="avatar"/>
                        <div className="address">
                            <div>{orderinfo.srcaddress.addressname}</div>
                            <div>{orderinfo.dstaddress.addressname}</div>
                        </div>
                        <img src="newimg/19.png" className="phone" />
                    </div>

                    <div className="content">
                        <LoadMore showLine>{orderinfo.paystatus}</LoadMore>
                        <span className="price color_warning">{orderinfo.paystatus}元</span>
                    </div>


                    <div className="pricelist PanelBox">
                        <div className="tit">车费情况</div>
                        <div className="list">
                            <p><span>起步价</span><span>0.0元</span></p>
                            <p><span>里程费(23.5公里)</span><span>71.0元</span></p>
                            <p><span>时长费(76分钟)</span><span>30.4元</span></p>
                            <p><span>高速费</span><span>120.0元</span></p>
                            <p><span className="color_warning">4.5折券抵扣(最高5元)</span><span className="color_warning">-5.0元</span></p>
                        </div>
                    </div>

                    <div className="tt">评价乘客</div>

                    <div className="evaluate PanelBox">
                        <StarRatingComponent
                            name="star"
                            editing={false}
                            starCount={5}
                            value={4.5}
                            emptyStarColor="#CCCCCC"
                        />
                        <span className="text">默认好评</span>
                    </div>

                    <div className="getMoney"><span>收现金</span></div>

                    <div className="addevaluate">
                        <div className="wamp">
                            <div className="tit">
                                <span>评价乘客</span>
                                <img src="newimg/22.png" className="close" />
                            </div>
                            <div className="star">
                                <StarRatingComponent
                                    name="star"
                                    editing={true}
                                    starCount={5}
                                    value={1}
                                    emptyStarColor="#CCCCCC"
                                />
                            </div>
                            <div style={{textAlign:'center'}}>请点亮星星</div>
                            <div className="text">
                                <Form>
                                    <FormCell>
                                        <CellBody>
                                            <TextArea placeholder="请输入您的评价内容" rows="3" maxlength="200"></TextArea>
                                        </CellBody>
                                    </FormCell>
                                    <div className="btn Primary">提交</div>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  ({orderdetail,myorders}, props) =>{
  let triporderid = props.match.params.triporderid;
  let orderinfo = myorders.triporders[triporderid];
  return {...orderdetail,orderinfo};
};

export default connect(
    mapStateToProps,
)(Page);
