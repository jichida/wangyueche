/*
    个人中心－提现
    withdrawals
*/
import React, { Component } from 'react';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../public/newcss/userrecharge.css';
import NavBar from '../tools/nav.js';
import Selpay from './renderselpay';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import {
    WeuiInputValidation,
    required
    } from "../tools/formvalidation.js";
const {
    Form:FormUI,
    } = WeUI;
import {payorder_request,set_weui} from '../../actions';

class PageForm extends Component{
    render(){
        const { submitfn,handleSubmit } = this.props;
        return (
            <Form
                onSubmit={handleSubmit(submitfn)}
                >
                <FormUI className="formStyle1">
                    <Field
                        name="realprice"
                        id="moneyperiod"
                        placeholder="请输入充值金额"
                        type="number"
                        component={ WeuiInputValidation }
                        validate={[ required ]}
                        InputTit="金额"
                        Company="元"
                    />
                    <Field name="paytype" paytypelist={['weixin','alipay']}
                      component={ Selpay } />
                    <div className="submitBtn">
                        <button className="btn Primary"><span>确定</span></button>
                    </div>
                </FormUI>
            </Form>
        )
    }
}
PageForm = reduxForm({
    form: 'pageform',
    initialValues:{
      realprice:50,
      paytype:'weixin'
    }
})(PageForm);


class Page extends Component {

    //支付订单
    pagesubmit=(values)=>{
        if(values.realprice > 0){
          let realprice = parseFloat(values.realprice);
          values.realprice = parseFloat(realprice.toFixed(2));
          values.ordertitle = '充值';
          values.orderdetail = `充值${values.realprice}元`;
          values.orderprice = values.realprice;
          this.props.dispatch(payorder_request({
            query:{_id:this.props.triporderid},
            data:values
          }));
        }
        else{
          let toast = {
              show : true,
              text : "充值金额必须大于0",
              type : "warning"
          }
          this.props.dispatch(set_weui({ toast }));
        }
        console.log(values);

    }

    render() {

        return (
            <div className="userrechargePage AppPage">
                <NavBar back={true} title="充值" />
                <div className="list">
                    <PageForm submitfn={this.pagesubmit} />
                </div>
            </div>
        )
    }
}

const data =  ({userlogin:{balance}}, props) =>{
    let triporderid = props.match.params.triporderid;
    return {balance,triporderid};
};

export default connect(data)(Page);
