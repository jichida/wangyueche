/*
    个人中心-我的钱包
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userwallet.css';
import NavBar from '../tools/nav.js';

const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    CellsTitle
    } = WeUI;
import _ from 'lodash';
import {
    queryuserbalance_request,
} from '../../actions';
import {getrechargerecords} from '../../actions/sagacallback';
import InfinitePage from '../controls/listview';
import RechargeItem from './rechargerecorditem';

class Page extends Component {
  // constructor(props) {
  //     super(props);
  //  }
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
                    <img src="newimg/20.png" alt=""/>
                    <div>
                        <span className="tit">余额(元)</span>
                        <span className="myprice">{balance}</span>
                    </div>
                </div>
                <div className="list">
                    <Cells className="tixianlnk">
                        <Cell access>
                            <CellHeader>
                                <img src="newimg/21.png" alt=""/>
                            </CellHeader>
                            <CellBody onClick={()=>{this.props.history.push('/withdraw');}}>
                                我要提现
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

const mapStateToProps =  ({userlogin:{balance}}) =>{
    return {balance};
};

export default connect(
    mapStateToProps,
)(Page);
