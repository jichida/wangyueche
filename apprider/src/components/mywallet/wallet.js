/*
    个人中心-我的钱包
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userwallet.css';
import NavBar from '../tools/nav.js';
import { connect } from 'react-redux';
import {
    queryuserbalance_request,
    rechargepay_request
} from '../../actions';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle
    } = WeUI;


import {getrechargerecords} from '../../actions/sagacallback';
import InfinitePage from '../controls/listview';
import RechargeItem from './rechargerecorditem';


class Page extends Component {

    updateContent = (record)=> {
        return  (
          <RechargeItem
              key={record._id}
              record={record}
              />
        );
    }

    componentWillMount () {
      this.props.dispatch(queryuserbalance_request({}));
    }

    render() {
        const {balance} = this.props;
        return (
            <div className="userwalletPage AppPage">
                <NavBar back={true} title="我的钱包" />
                <div className="head">
                    <span className="tit">余额(元)</span>
                    <span className="myprice">{balance}</span>
                </div>
                <div className="list">
                    <Cells className="tixianlnk">
                        <Cell
                            access
                            onClick={()=>{this.props.dispatch(rechargepay_request({}));}}
                            >
                            <CellHeader>
                                <img src="newimg/13.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                我要充值
                            </CellBody>
                            <CellFooter />
                        </Cell>
                    </Cells>

                    <CellsTitle>账单查询</CellsTitle>

                    <div className="l2">
                        <Cells>
                          <InfinitePage
                              usecache={false}
                              listtypeid='wallet'
                              pagenumber={30}
                              updateContent={this.updateContent}
                              queryfun={getrechargerecords}
                              listheight={window.innerHeight-282}
                              query={{}}
                              sort={{created_at: -1}}
                          />
                        </Cells>
                    </div>

                </div>
            </div>
        )
    }
}
const data =  ({userlogin:{balance}}) =>{
    return {balance};
};
export default connect(
    data,
)(Page);
