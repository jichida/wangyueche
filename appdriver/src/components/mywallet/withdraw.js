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
import { Field,reduxForm,Form,formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import {withdrawcashapplyaddone_request,set_weui} from '../../actions';
const {
    Form:FormUI,
    } = WeUI;
import {
    InputBankValidation,
    WeuiInputValidation,
    required,
    validatebank,
    InputHidden
  }  from "../tools/formvalidation";
import { _getBankInfoByCardNo } from "../tools/validationbank"

const databanklist = [
    {
        value: "建设银行",
        label: '建设银行'
    },
    {
        value: "中国银行",
        label: '中国银行'
    }
];

const warn = values => {
    const warnings = {}
    _getBankInfoByCardNo(values.bankaccount, (err, info)=>{
        if(err){
            warnings.bankaccount = "该银行卡无法识别";
        }else{
            console.log(info);
            //warnings.bankaccount = info.bankName;
        }
    })
}

let WithdrawForm = (props)=>{
    const { balance,handleSubmit,clicksubmit,bankinfo,bankname }  = props;

    return (
        <Form
            className="withdrawalsPage AppPage"
            onSubmit={handleSubmit(clicksubmit)}
        >
            <NavBar back={true} title="提现" />
            <div className="list">
                <FormUI>
                    <Field
                        name="bankaccount"
                        InputTit="银行卡号"
                        placeholder="请输入银行卡号"
                        type="number"
                        component={InputBankValidation}
                        validate={[ required ]}
                        />
                    {bankinfo===''?"":(
                        <div className="weui-cell">
                            <div className="weui-cell__hd">
                                <div>
                                    <label className="weui-label">
                                        <span>卡号信息</span>
                                    </label>
                                </div>
                            </div>
                            <div className="weui-cell__bd">
                                <div>
                                    {bankinfo}
                                </div>
                            </div>
                        </div>
                    )}
                    <Field
                        name="cashmoney"
                        InputTit="提现金额"
                        placeholder="请输入提现金额"
                        type="number"
                        component={WeuiInputValidation}
                        validate={[ required ]}
                        />
                </FormUI>

                <div className="promptcontent">
                    你好，本次可提现金额: <span className="color_warning">{balance}</span>元
                </div>
                <div className="submitBtn">
                    <button className="btn Primary"><span>确定</span></button>
                </div>
            </div>

        </Form>
    );
}

WithdrawForm = reduxForm({
    form: 'withdrawform',
    warn,
})(WithdrawForm);

const selector = formValueSelector('withdrawform') // <-- same as form name
WithdrawForm = connect(state => {
    const bankaccount = selector(state, 'bankaccount');
    let bankinfo = "";
    _getBankInfoByCardNo(bankaccount, (info)=>{
        if(!!info && bankaccount.length>=15 && bankaccount.length<=19){
            bankinfo = info.bankName +","+ info.cardTypeName;
        }
    })
    return {
        bankinfo
    }
})(WithdrawForm)


class Page extends Component {
    onClickWithdraw = (values)=>{
        _getBankInfoByCardNo(values.bankaccount, (info)=>{
            values.bankname = info.bankName;
        })
        values.cashmoney = parseFloat(values.cashmoney);
        if(this.props.balance<values.cashmoney){
            let toast = {
                show : true,
                text : "提现超出余额",
                type : "warning"
            }
            this.props.dispatch(set_weui({ toast }));
        }else{
            this.props.dispatch(withdrawcashapplyaddone_request(values));
        }

    }
    render() {
        return (<WithdrawForm clicksubmit={this.onClickWithdraw} balance={this.props.balance}/>);
    }
}
const mapStateToProps = ({userlogin:{balance}}) => {
    return {balance};
}
Page = connect(mapStateToProps)(Page);

export default Page;
