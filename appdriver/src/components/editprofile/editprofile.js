/*
    个人中心－基本信息
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/baseinfo.css';
import NavBar from '../tools/nav.js';
import {logout_request} from '../../actions';
const {
    Cells,
    Cell,
    CellBody,
    CellFooter,
    } = WeUI;
import { connect } from 'react-redux';

class Page extends Component {

    // componentWillReceiveProps (nextProps) {
    //     if(!nextProps.loginsuccess && this.props.loginsuccess){
    //         this.props.history.push("/login");
    //     }
    // }

    render() {
        const {avatarURL,DriverName,DriverPhone,VehicleNo,servicephonenumber} = this.props;
        return (
            <div className="baseinfoPage AppPage">
                <NavBar back={true} title="查看个人资料" />
                <div className="list">
                    <Cells>
                        <Cell className="avatar">
                            <CellBody>
                                头像
                            </CellBody>
                            <CellFooter>
                                <img src={avatarURL||"newimg/17.png"} alt=""/>
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                姓名
                            </CellBody>
                            <CellFooter>
                                {DriverName}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                手机号
                            </CellBody>
                            <CellFooter>
                                {DriverPhone}
                            </CellFooter>
                        </Cell>
                        <Cell>
                            <CellBody>
                                车牌号
                            </CellBody>
                            <CellFooter>
                                {VehicleNo}
                            </CellFooter>
                        </Cell>
                    </Cells>
                    <div className="f">如需修改，请联系客服<span className="color_warning">{servicephonenumber}</span></div>
                    <div className="submitBtn" style={{padding:"20px"}}>
                        <span
                            className="btn Primary"
                            onClick={()=>{this.props.dispatch(logout_request({}))}}
                            >
                            退出
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  ({
    app:{servicephonenumber},
    userlogin:{
        avatarURL,
        Platform_baseInfoDriver:{
            DriverName,
            DriverPhone
        },
        Platform_baseInfoVehicle:{
            VehicleNo
        },
        loginsuccess
    }
}) =>{
    return {avatarURL,DriverName,DriverPhone,VehicleNo,servicephonenumber,loginsuccess};
};

export default connect(
    mapStateToProps,
)(Page);
