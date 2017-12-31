/*
    注册代驾司机－基本信息
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field,reduxForm} from 'redux-form';
import { getRegisterFillWizardForm } from '../registerfillwizardform';

import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/taxi.css';
import NavBar from '../../tools/nav.js';

const {
    Form:FormUI,

    } = WeUI;

import {renderImageupload} from '../../tools/renderimageupload';
import {renderDateField} from '../../tools/renderdate';
import {ui_isdateopen,set_weui} from '../../../actions';
import {
    required,
    requiredImg,
    WeuiInputValidation,
    validatebank,
    isidcard,
    WeuiSelectValidation,
    InputBankValidation,
    } from '../../tools/formvalidation';

import moment from "moment";

// const databanklist = [
//   {
//       value: 0,
//       label: '请选择'
//   },
//   {
//       value: 1,
//       label: '建设银行'
//   },
//   {
//       value: 2,
//       label: '中国银行'
//   }
// ];

// const datasexlist = [
//   {
//       value: '男',
//       label: '男'
//   },
//   {
//       value: '女',
//       label: '女'
//   },
// ];

// const datamarriagestatuslist = [
//     {
//         value: '未婚',
//         label: '未婚'
//     },
//     {
//         value: '已婚',
//         label: '已婚'
//     },
//     {
//         value: '离异',
//         label: '离异'
//     }
//   ];
const driverTypeData = [
    {
        value: 'C1',
        label: 'C1'
    },
    {
        value: 'C2',
        label: 'C2'
    },
    {
        value: 'B1',
        label: 'B1'
    },
    {
        value: 'B2',
        label: 'B2'
    },
    {
        value: 'A1',
        label: 'A1'
    },
    {
        value: 'A2',
        label: 'A2'
    }
  ];

class Page extends Component {
    setDateopen =(show)=>{
      this.props.dispatch(ui_isdateopen(show));
    }
    showLoading =(status)=>{
        this.props.dispatch(set_weui({
            loading : {
                show : status
            },
        }));
    }
    render() {
        const { handleSubmit,previousPage,isdateopen } = this.props;
        return (
            <div className="taxiPage taxiregisterPage AppPage">

                <NavBar back={false} title="注册代驾"
                  leftnav={[
                    {
                      type:"action",
                      action : previousPage,
                      text:"上一步"
                    }
                  ]}
                 />

                <div className="list">
                    <div className="avatar">
                        <Field
                          name="avatarURL"
                          component={renderImageupload}
                          loading={this.showLoading.bind(this)}
                          validate={[ requiredImg ]}
                          />
                    </div>
                    <FormUI className="formStyle1">
                        <Field
                          name="DriverName"
                          InputTit="司机姓名"
                          placeholder="请输入司机姓名"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required ]}
                          />
                        <Field
                          name="idcard"
                          InputTit="身份证号"
                          placeholder="请输入身份证号"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required, isidcard ]}
                          />
                        <Field
                          name="bankaccount"
                          InputTit="银行卡号"
                          placeholder="请输入银行卡号"
                          type="number"
                          component={InputBankValidation}
                          validate={[ required ]}
                          />
                        <Field
                          name="DriverType"
                          InputTit="准驾类型"
                          component={WeuiSelectValidation}
                          Option={driverTypeData}
                          />
                        <Field
                          name="GetDriverLicenseDate"
                          label="初次领驾照日期"
                          setDateopen={this.setDateopen}
                          isdateopen={isdateopen}
                          component={renderDateField} />
                    </FormUI>
                </div>
                <div className="submitBtn">
                    <button className="btn Primary"  onClick={handleSubmit}><span>下一步</span></button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({appui:{isdateopen}}) => {
    return {isdateopen};
}


Page = connect(mapStateToProps)(Page);

export default getRegisterFillWizardForm(Page);
