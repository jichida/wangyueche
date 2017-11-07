import React from 'react';
import { connect } from 'react-redux';

import MapGaode from './mapcar.js';
import '../../../public/newcss/outcar.css';
import NavBar from '../tools/nav.js';

import {acceptrequest} from '../../actions';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';

const { LoadMore } = WeUI;

class Page extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentWillMount () {
    }

    onClickOK(){
      this.props.dispatch(acceptrequest({
          _id:this.props.selrequest._id,
      }));
    }


    render() {
      let curreqobj = this.props.selrequest;
      let resultpricedetail;
      // let triptypename=undefined;
      // let showqdbtn=undefined;
      if(!!curreqobj){
        resultpricedetail = curreqobj.resultpricedetail;
        // triptypename = curreqobj.isrealtime?'实时':'预约';
        // showqdbtn = curreqobj.requeststatus === '请求中';
      }
      return (
          <div className="outcarPage AppPage">

              <NavBar back={true} title="抢单" />
              
              {
                !curreqobj && <div className="falseorder">
                  <LoadMore showLine>订单详情</LoadMore>
                  <img src="newimg/38.png" />
                  <span className="tit">订单已失效</span>
                  <span className="reson">原因: 该请求已取消或已被其他司机接单了</span>
                  <span className="btn" onClick={()=>{this.props.history.goBack()}}>返回</span>
              </div>
              }
              {
                !!curreqobj &&
                <div className="orderinfohead">
                    <img src="newimg/17.png" className="avatar" alt=""/>
                    <div className="address">
                        <div className="orderprice">全程约: <span className="color_warning">{resultpricedetail.totalkm}公里</span></div>
                        <div className="orderprice">预计费用: <span className="color_warning">￥{resultpricedetail.totalprice}元</span></div>
                        <div className="startaddress">{curreqobj.srcaddress.addressname}</div>
                        <div className="endaddress">{curreqobj.dstaddress.addressname}</div>
                    </div>
                    <span
                        className="qiangdanLnk"
                        onClick={this.onClickOK.bind(this)}
                        >抢单</span>
                </div>
              }

              {
                  !!curreqobj &&
                <div className="mapcontent list">
                    <MapGaode ref='mapgaode' curreqobj={curreqobj} height={window.innerHeight-68} />
                </div>
              }
          </div>
      );
  }
}



const mapStateToProps = ({operate},props) => {
  let requests = operate.nearbyrequests.requests;
  let selrequest = requests[props.match.params.requestid];
  let curlocation = operate.curlocation;
  return {selrequest,curlocation};
}

export default connect(
  mapStateToProps,
)(Page);
