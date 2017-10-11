/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userorderlist.css';
import NavBar from '../tools/nav.js';
import _ from "lodash";
import { connect } from 'react-redux';
import moment from "moment";
const {
    Cells,
    Cell,
    CellBody,
    CellFooter
    } = WeUI;
import {
  getorderdetail_request
} from '../../actions';
import {
  getmytriporders,
} from '../../actions/sagacallback';
import InfinitePage from '../controls/listview';
let usecacheorder = false;
//快车信息
class Kuaiche extends Component{
    render(){
        const {info} = this.props;
        return (
            <div className="pinchelistli">
                <div className="li a">{info.srcaddress.addressname}</div>
                <div className="li b">{info.dstaddress.addressname}</div>
            </div>
        )
    }
}

//拼车信息
class Pinche extends Component{
    render(){
        const {info} = this.props;
        return (
            <div className="pinchelistli">
                <div>出发时间: {moment(info.startdate).format("YYYY-MM-DD")+" "+info.starttime}</div>
                <div>出发地: {info.startcity} {info.startstation}</div>
                <div>目的地: {info.endcity} {info.endstation}</div>
            </div>
        )
    }
}
// 旅游大巴
class Daba extends Component{
    render(){
        const {info} = this.props;
        return (
            <div className="pinchelistli">
                <div>用车时间:  {moment(info.startdate).format('YYYY-MM-DD')}</div>
                <div>还车时间:  {moment(info.enddate).format('YYYY-MM-DD')}</div>
                <div>{info.orderdetail}</div>
            </div>
        )
    }
}

const OrderItem = (props) => {
    const {orderinfo,onClickOrderDetail} = props;

    const getheadtipc = (orderinfo)=>{
        const { triptype,isrealtime } = orderinfo;
        if(triptype==="旅游大巴" || triptype==="拼车"){
            return <span style={{width:"15px",display:"inline-block"}}></span>;
        }else{
            if(isrealtime){
                return (<span className="i j">实时</span>);
            }else{
                return (<span className="i">预约</span>);
            }
        }
    }

    return (
      <Cell
          onClick={onClickOrderDetail}
          key={orderinfo._id}
          access>
          <CellBody>
              <div className="tt">
                  <div className="ttinfo">

                      {getheadtipc(orderinfo)}
                      <span className="time">{moment(orderinfo.created_at).format("YYYY-MM-DD H:mm:ss")}</span>
                      <span className="type">{orderinfo.triptype}</span>

                  </div>
                  <span className="status color_warning">{orderinfo.orderstatus}</span>
              </div>

              {orderinfo.triptype==="拼车"?(
                  <Pinche info={orderinfo} />
              ):""}

              {orderinfo.triptype==="快车"||orderinfo.triptype==="代驾"||orderinfo.triptype==="出租车"?(
                  <Kuaiche info={orderinfo} />
              ):""}

              {orderinfo.triptype==="旅游大巴"?(
                  <Daba info={orderinfo} />
              ):""}

          </CellBody>
          <CellFooter />
      </Cell>
    );
}

class Page extends Component {
    componentDidMount(){
      usecacheorder = false;
    }
    onClickOrderDetail(orderinfo){
        // this.props.dispatch(getorderdetail_request({
        //     query:{
        //       _id:orderinfo._id,
        //       triptype:orderinfo.triptype
        //     }
        //   }));
        usecacheorder = true;
        this.props.history.push(`/orderdetail/${orderinfo._id}`);
        //return ;
    }
    updateContent = (orderinfo)=> {
        return  (
          <OrderItem
              key={orderinfo._id}
              orderinfo={orderinfo}
              onClickOrderDetail={this.onClickOrderDetail.bind(this,orderinfo)}
              />
        );
    }

    render() {
        return (
            <div className="userorderlistPage AppPage">
                <NavBar back={true} title="我的订单" />
                <div className="list">
                    <Cells>
                        <InfinitePage
                            usecache={usecacheorder}
                            listtypeid='order'
                            pagenumber={30}
                            updateContent={this.updateContent}
                            queryfun={getmytriporders}
                            listheight={window.innerHeight-68}
                            query={{triptype:{'$ne':'充值'}}}
                            sort={{created_at: -1}}
                        />
                    </Cells>
                </div>
            </div>
        )
    }
}

export default connect()(Page);
