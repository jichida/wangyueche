/*
    设置
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import NavBar from '../tools/nav.js';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    CellHeader,
    } = WeUI;
import {logout_request} from '../../actions';
import '../../../public/newcss/setting.css';

class Page extends Component {
    componentWillMount () {
    }
    onClickBack(){
      this.props.history.goBack();
    }
    onClickLogout(){
        this.props.dispatch(logout_request({}));
    }
    onClickPage(name){
      this.props.history.push(name);
    }
    render() {
        return (
            <div className="settingPage AppPage">
                <NavBar back={true} title="设置" />
                <div className="list">
                    <Cells>
                        <Cell access  onClick={this.onClickPage.bind(this,'/emerygencycontact')}>
                            <CellHeader>
                                <img src="newimg/2.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                紧急联系人
                            </CellBody>
                            <CellFooter />
                        </Cell>
                    </Cells>
                    <Cells>
                        <Cell access  onClick={this.onClickPage.bind(this,'/about/rideruserguide')} >
                            <CellHeader>
                                <img src="newimg/3.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                用户指南
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell access onClick={this.onClickPage.bind(this,'/about/riderfeerules')} >
                            <CellHeader>
                                <img src="newimg/4.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                计费规则
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                        <Cell access onClick={this.onClickPage.bind(this,'/about/riderlaws')} >
                            <CellHeader>
                                <img src="newimg/5.png" alt=""/>
                            </CellHeader>
                            <CellBody>
                                法律条款
                            </CellBody>
                            <CellFooter/>
                        </Cell>
                    </Cells>
                </div>
                {this.props.loginsuccess && (<div className="btn" onClick={
                  this.onClickLogout.bind(this)
                }>退出</div>)}
            </div>
        )
    }
}


const mapStateToProps = ({userlogin:{loginsuccess}}) => {
    return {loginsuccess};
}
Page = connect(mapStateToProps)(Page);
export default Page;
