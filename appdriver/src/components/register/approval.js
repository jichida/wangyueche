/*
    审核
*/
import React, { Component } from 'react';
import '../../../public/newcss/examine.css';
import NavBar from '../tools/nav.js';
import { connect } from 'react-redux';
import {getrealnameprofile_request} from '../../actions';
class Page extends Component {
    //未递交/待审核/审核中/已审核/已拒绝
    componentWillMount () {
      this.props.dispatch(getrealnameprofile_request({}));
    }

    render() {
        const {approvalstatus,approvalrejectseason,history} = this.props;
        return (
            <div className="examinePage approvalPage AppPage">
                <NavBar back={false} title="审核"  leftnav={[
                    {
                      type:"action",
                      action : ()=>{
                        this.props.history.replace('/');
                      },
                      text:"首页"
                    }
                  ]}/>

                <div className="list">
                    {approvalstatus === '已审核' &&
                      <div className="success li">
                          <img src="newimg/13.png" alt=""/>
                          <div className="tit">
                              你好，<span className="color_warning">审核已通过</span>
                          </div>
                          <div className="desc">
                              你可以在此平台上接单了
                          </div>
                          <div className="btn Warning" onClick={
                            ()=>{history.replace('/');}
                          }>
                              去接单
                          </div>
                      </div>}

                    {approvalstatus === '已拒绝' &&
                    <div className="false li">
                        <img src="newimg/14.png" alt=""/>
                        <div className="tit">
                            你好，<span className="color_warning">审核没有通过</span>
                        </div>
                        <div className="desc">
                            失败原因：{approvalrejectseason}
                        </div>
                        <div className="btn Warning" onClick={
                          ()=>{history.replace('/register1');}
                        }>
                            重新审核
                        </div>
                    </div>}

                    {approvalstatus === '审核中' &&
                     <div className="warting li">
                        <img src="newimg/15.png" alt=""/>
                        <div className="tit">
                            你好，正在加紧<span className="color_warning">审核中</span>
                        </div>
                        <div className="desc">
                            审核结果会以短信形式通知你
                        </div>
                    </div>}

                    {approvalstatus === '待审核' &&
                    <div className="updata li">
                        <img src="newimg/16.png" alt=""/>
                        <div className="tit">
                            注册资料已提交，<span className="color_warning">待审核</span>
                        </div>
                        <div className="desc">
                            <span>审核将于5个工作日内完成</span>
                            <span className="color_warning">审核结果会以短信的形式通知你</span>
                        </div>
                    </div>
                  }
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({userlogin:{approvalstatus,approvalrejectseason}}) => {
  return {approvalstatus,approvalrejectseason}
}
Page = connect(mapStateToProps)(Page);
export default Page;
