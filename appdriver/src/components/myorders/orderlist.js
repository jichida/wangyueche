/*
    个人中心-订单详情
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderItem from './myordersitem.js';
import _ from 'lodash';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userorderlist.css';
import NavBar from '../tools/nav.js';

const {
  Cells,
} = WeUI;
import {getmytriporders} from '../../actions/sagacallback';
import InfinitePage from '../controls/listview';
let usecacheorder = false;
class Page extends Component {

   onClickOrderDetail(orderinfo){
       usecacheorder = true;
       this.props.history.push(`/orderdetail/${orderinfo._id}`);
   }

   updateContent = (orderinfo)=> {
       return  (
         <OrderItem
             key={orderinfo._id}
             orderinfo={orderinfo}
             onClickSelCurOrder={this.onClickOrderDetail.bind(this,orderinfo)}
             />
       );
   }
   componentDidMount(){
     usecacheorder = false;
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
