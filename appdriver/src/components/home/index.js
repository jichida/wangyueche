import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/index.css';
import NavBar from '../tools/nav.js';
import { connect } from 'react-redux';
const {
    Cells,
    Cell,
    CellHeader,
    CellBody,
    CellFooter
    } = WeUI;
import {setbackhandler,removebackhandler,exitAndroidApp} from '../../env/android';
import {set_weui} from '../../actions';
import {jsCallPhone} from '../../env/callphone.js';

class Page extends Component {
  componentWillMount() {
    let that = this;
    setbackhandler(()=>{

      console.log('click android back');
      let confirm = {
        show : true,
        title : "你确定需要退出吗",
        text : "",
        buttonsCloseText : "取消",
        buttonsClickText : "确定",
        buttonsClose : ()=>{console.log('click close');},
        buttonsClick : ()=>{exitAndroidApp();}
      };
      that.props.dispatch(set_weui({confirm}));

    });
  }

  componentWillUnmount() {
    removebackhandler();
  }

  onClickItem =(name)=>{
    this.props.history.push(name);
  }
	render() {
    const {loginsuccess,registertype,avatarURL,Platform_baseInfoDriver,Platform_baseInfoVehicle} = this.props;
    let phonenumbertext = loginsuccess?Platform_baseInfoDriver.DriverName:'未登录';
    let linkeditprofile = loginsuccess?'/editprofile':'/login';

    return (
    		<div className="indexPage AppPage">
    		<NavBar back={false} title="中南出行" />
				<div className="indexHead" onClick={()=>{this.onClickItem(linkeditprofile)}}>
          {loginsuccess && (
					<Cells>
			            <Cell access>
			                <CellHeader>
			                    <img src={avatarURL||"newimg/17.png"} alt=""/>
			                </CellHeader>
			                <CellBody>
			                    <div className="tit">
			                    	<span className="name">{Platform_baseInfoDriver.DriverName}</span>
			                    	<span className="type">{registertype}</span>
			                    </div>
			                    <div className="con">当前车辆: {Platform_baseInfoVehicle.VehicleNo}</div>
			                </CellBody>
			                <CellFooter />
			            </Cell>
			        </Cells>)}
              {!loginsuccess  && (
    					<Cells>
    			            <Cell access>
    			                <CellHeader>

    			                </CellHeader>
    			                <CellBody>
    			                    <div className="tit">
    			                    	<span className="name">{phonenumbertext}</span>
      			                    </div>
    			                </CellBody>
    			                <CellFooter />
    			            </Cell>
    			        </Cells>)}
				</div>
				<div className="list">
					<Cells>
			            <Cell access onClick={()=>{this.onClickItem('/myorders')}}>
			                <CellHeader>
			                    <img src="newimg/5.png"  alt=""/>
			                </CellHeader>
			                <CellBody>
			                   	我的行程
			                </CellBody>
			                <CellFooter />
			            </Cell>
			            <Cell access onClick={()=>{this.onClickItem('/mywallet')}}>
			                <CellHeader>
			                    <img src="newimg/6.png"  alt=""/>
			                </CellHeader>
			                <CellBody>
			                   	我的钱包
			                </CellBody>
			                <CellFooter />
			            </Cell>
			            <Cell access onClick={()=>{this.onClickItem('/mycars')}}>
			                <CellHeader>
			                    <img src="newimg/7.png"  alt=""/>
			                </CellHeader>
			                <CellBody>
			                   	我的车辆
			                </CellBody>
			                <CellFooter />
			            </Cell>
			            <Cell access onClick={()=>{this.onClickItem('/messagecenter')}}>
			                <CellHeader>
			                    <img src="newimg/8.png"  alt=""/>
			                </CellHeader>
			                <CellBody>
			                   	消息中心
			                </CellBody>
			                <CellFooter />
			            </Cell>
			            <Cell access>
			                <CellHeader>
			                    <img src="newimg/9.png"  alt=""/>
			                </CellHeader>
			                <CellBody>
			                   	<a
                           onClick={(e)=>{jsCallPhone(`${this.props.app.servicephonenumber}`);}}
			                   		style={{display:"block",color:"#333"}}
			                   	>联系客服</a>
			                </CellBody>
			                <CellFooter />
			            </Cell>
			        </Cells>

				</div>
				<div className="pointLnk">
					<a onClick={()=>{this.onClickItem('/outcar')}}>
						<img src="newimg/10.png"  alt=""/>
						<span>出车</span>
					</a>
				</div>
    		</div>
    	)
    }
}

const mapStateToProps =  ({userlogin,app}) =>{
    return {...userlogin,app};
};


export default connect(
mapStateToProps,
)(Page);
