/*
    注册快车司机－基本信息
*/
import React, { Component } from 'react';
import _ from "lodash";
import { Field,reduxForm} from 'redux-form';
import { getRegisterFillWizardForm } from '../registerfillwizardform';

import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/taxi.css';

const {
    Form:FormUI,
    } = WeUI;
import NavBar from '../../tools/nav.js';
import {renderImageupload} from '../../tools/renderimageupload';
import {
    required,
    requiredImg,
    WeuiInputValidation,
    phone,
    isidcard,
    WeuiSelectValidation,
    InputBankValidation,
    validatebank
    } from '../../tools/formvalidation';

import {set_weui} from '../../../actions';
import { Province,FamilyName } from "../../tools/province";

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

const datasexlist = [
  {
      value: '男',
      label: '男'
  },
  {
      value: '女',
      label: '女'
  },
];

const datamarriagestatuslist = [
    {
        value: '未婚',
        label: '未婚'
    },
    {
        value: '已婚',
        label: '已婚'
    },
    {
        value: '离异',
        label: '离异'
    }
  ];

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
    showLoading =(status)=>{
        this.props.dispatch(set_weui({
            loading : {
                show : status
            },
        }));
    }



    render() {
        const { handleSubmit,previousPage } = this.props;
        const myProvince = _.map(Province, (p,index)=>{
            return { value: p.name, label: p.name}
        })
        const myFamilyName = _.map(FamilyName, (p,index)=>{
            return { value: p.name, label: p.name}
        })
        return (
            <div className="taxiPage taxiregisterPage AppPage">

                <NavBar back={false} title="注册快车司机"
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
                          name="DriverPhone"
                          InputTit="驾驶员手机号"
                          placeholder="请输入驾驶员手机号"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required, phone ]}
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
                          name="DriverGender"
                          InputTit="性别"
                          component={WeuiSelectValidation}
                          Option={datasexlist}
                          />

                        <Field
                          name="huji"
                          InputTit="户籍"
                          component={WeuiSelectValidation}
                          Option={myProvince}
                          />

                        <Field
                          name="DriverAddress"
                          InputTit="户口住址"
                          placeholder="户口住址或长住地址"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required ]}
                          />

                        <Field
                          name="DriverNation"
                          InputTit="民族"
                          component={WeuiSelectValidation}
                          Option={myFamilyName}
                          />

                        <Field
                          name="DriverMaritalStatus"
                          InputTit="婚姻情况"
                          component={WeuiSelectValidation}
                          Option={datamarriagestatuslist}
                          />

                        <Field
                          name="EmergencyContactPhone"
                          InputTit="紧急联系电话"
                          placeholder="请输入联系电话"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required, phone ]}
                          />

                        <Field
                          name="EmergencyContactAddress"
                          InputTit="紧急联系人地址"
                          placeholder="请输入通讯地址"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required ]}
                          />

                        <Field
                          name="CertificateNo"
                          InputTit="网约出租车证件编号"
                          placeholder="请输入网约出租车证件编号"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required ]}
                          />

                    </FormUI>

                </div>
                <div className="submitBtn">
                    <button className="btn Primary" onClick={handleSubmit}><span>确定</span></button>
                </div>
            </div>

        )
    }
}


export default getRegisterFillWizardForm(Page);

// "Platform_baseInfoVehicle" : {
//     "Certificate" : "1234",
//     "Seats" : 15,
//     "VehicleNo" : "苏A235"
// },
// "Platform_baseInfoDriver" : {
//     "Address" : 213000,
//     "CompanyId" : "58a30c05061d53264c182029",
//     "LicensePhotoIdURL" : "http://ynyj.com28.cn/uploader/6465ccf2-b850-4fd0-a931-f3a99791d0ba.jpeg",
//     "LicenseId" : "123",
//     "EmergencyContactAddress" : "是啊",
//     "EmergencyContactPhone" : "15961125167",
//     "DriverAddress" : "常州",
//     "DriverPhone" : "15961125167",
//     "DriverName" : "王小庆",
//     "DriverMaritalStatus" : "未婚",
//     "DriverNation" : "汉族",
//     "DriverGender" : "男",
//     "DriverType" : "C1"
// },

//bankname
