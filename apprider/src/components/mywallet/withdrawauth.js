/*
    个人中心－提现
    withdrawals
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userwithdrawals.css';
import NavBar from '../tools/nav.js';
import Sendauth from '../tools/sendauth.js';
import StarRatingComponent from 'react-star-rating-component';
const {
    CellHeader,
    CellBody,
    Form:FormUI,
    FormCell,
    Label,
    Input,
    Select
    } = WeUI;
import { Field,Fields,reduxForm,Form} from 'redux-form';
import { connect } from 'react-redux';

import {loginsendauth_request,withdrawcashapplyauth_request} from '../../actions';


let WithdrawauthForm = (props)=>{
  const {showphonenumber,phonenumber,handleSubmit,dispatch}  = props;

  onClickAuth = (callback)=> {
      const phonenumber = props.phonenumber;
      const phone =  !!phonenumber && !(phonenumber.match(/\D/g)||phonenumber.length !== 11||!phonenumber.match(/^1/));
      if(phone){
          dispatch(loginsendauth_request({phonenumber}));
      }
      callback(phone);
  }


  return (
      <div className="withdrawalsPage AppPage">
          <NavBar back={true} title="提现" />
          <div className="list">
            <div className="messageCodeContent">
                <span className="tit">请输入<span className="phone">{showphonenumber}</span>收到的短信验证码</span>
                <div className="messageCodeInput">
                    <span className="txt">验证码</span>
                    <Field name="authcode" label="验证码" placeholder="请输入验证码" type="text" component="input" style={{fontSize:"14px"}} />
                    
                    <Sendauth primary action={onClickAuth} className="getcode" />
                </div>
            </div>
          </div>
          <div className="submitBtn">
              <botton className="btn Primary"  onClick={handleSubmit}>确定</botton>
          </div>
      </div>
  );
}

WithdrawauthForm = reduxForm({
  form: 'withdrawformauth',                 // <------ same form name
})(WithdrawauthForm);


class Page extends Component {
  onClickWithdraw = (values)=>{
    console.dir(values);
    const withdrawid = this.props.match.params.withdrawid;
    let payload = {
      _id:withdrawid,
      username: this.props.phonenumber,
      authcode:values.authcode
    };
    this.props.dispatch(withdrawcashapplyauth_request(payload));
  }

  render() {
      const {showphonenumber,phonenumber,dispatch} = this.props;

      return (<WithdrawauthForm onSubmit={this.onClickWithdraw}
        phonenumber={phonenumber}
        showphonenumber={showphonenumber} dispatch={dispatch}/>);
    }
}

const mapStateToProps = ({userlogin:{username:phonenumber}}) => {
  let showphonenumber = phonenumber.substr(0,3)+"****"+phonenumber.substr(7,4);
  return {showphonenumber,phonenumber};
}
Page = connect(mapStateToProps)(Page);


export default Page;
