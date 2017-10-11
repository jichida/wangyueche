/*
    优惠券
*/
import React, { Component } from 'react';
import '../../../public/newcss/discount.css';
import NavBar from '../tools/nav.js';
import {
  ui_setorderdetail,
  mycoupongetall_request
} from '../../actions';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import getmycoupons from '../../selectors/selcoupons';
// coupon:{ type: Schema.Types.ObjectId, ref: 'Coupon' },
// creator:{ type: Schema.Types.ObjectId, ref: 'User' },
// name:String,    //优惠券名
// pricediscountmax:Number,//最大抵扣金额
// pricediscountpercent:Number,//抵扣折扣
// expdate: Date,// 过期时间
// usestatus:{ type: Schema.Types.String,default: '未使用'},// //未使用／已使用／已失效
// fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
// created_at: { type: Date, default:new Date()},
// used_at:Date,
const MycouponItem = (props) => {
  const {mycoupon,onClickItem} = props;
  const {name,pricediscountpercent,pricediscountmax,expdate,enabled,triptype,showenabled} = mycoupon;
  const expdatestring = moment(expdate).format("YYYY-MM-DD");
  return (
    <div className={showenabled?"li":"li enabled"} onClick={onClickItem}>
        <div className="w">
            <div className="a"></div>
            <div className="b">
                <div className="c">
                    <div className="price color_warning">
                        <span className="aa">{name}</span>
                        <span className="bb">有效期至{expdatestring}</span>
                    </div>
                    <div className="zhekou color_warning">
                        <span className="aa">{pricediscountpercent}</span>
                        <span className="bb">折</span>
                    </div>
                </div>
                <div className="d">
                    <span>最高抵扣{pricediscountmax}元</span>
                    <span>仅{triptype}使用</span>
                </div>
            </div>
        </div>
    </div>
  );
}

class Page extends Component {
    componentWillMount () {
      this.props.dispatch(mycoupongetall_request({
        query:{
          usestatus:'未使用'
        },
        options:{
          sort:{created_at:-1},
          offset: 0,
          limit: 10,
        }
      }));
    }

    onClickItem(mycoupon){
      if(this.props.sel && mycoupon.enabled){
        this.props.dispatch(ui_setorderdetail({
          usecoupon:true,
          coupon:mycoupon,
        }));
        this.props.history.goBack();
      }
    }

    render() {
        const {couponlist} = this.props;
        console.log(`couponlist===>${JSON.stringify(couponlist)}`);
        return (
            <div className="discountPage AppPage">
                <NavBar back={true} title="优惠券" />
                <div className="list">
                {
                  _.map(couponlist,(mycoupon)=>{
                    return (<MycouponItem key={mycoupon._id} mycoupon={mycoupon}
                      onClickItem={this.onClickItem.bind(this,mycoupon)}/>)
                  })
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
  return getmycoupons(state,props);
}

export default connect(
  mapStateToProps
)(Page);
