/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-weui/lib/react-weui.min.css';


import
{
  test_login_request,
  test_logout_request,

  test_getmypincheroute_request,
  test_getonepincheroutepassengers_request
} from './test/index.js';

// let curcharact = {
//     'userborrow':借款人,
//     'userlender':放款人,
//     'useragency':中介
// };

let Page =(props)=>{
    let onClickPage=(name)=>{
        props.history.push(name);
    };
    return (
        <div
            style={{
                flexGrow:"1",
                overflow:"scroll"
            }}
            >
            <p style={{textAlign: 'center'}}>
                <botton className="btn Primary" onClick={()=>{test_login_request(props.dispatch)}}>登录</botton>
                <botton className="btn Primary" onClick={()=>{test_logout_request(props.dispatch)}}>注销</botton>
                <br />
                <botton className="btn Primary" onClick={()=>{test_getmypincheroute_request(props.dispatch)}}>拼车路线查询</botton>
                <botton className="btn Primary" onClick={()=>{test_getonepincheroutepassengers_request(props.dispatch)}}>拼车路线详情</botton>
                <br />
            </p>
        </div>
    );
}


Page = connect()(Page);
export default Page;
