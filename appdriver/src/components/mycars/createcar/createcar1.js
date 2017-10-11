/*
    注册司机－车辆信息
*/
import React, { Component } from 'react';
import { Field,reduxForm} from 'redux-form';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/taxi.css';
import NavBar from '../../tools/nav.js';
import validate from './validate';
const {
    CellsTitle,
    Form:FormUI,
    } = WeUI;
import {renderInputField} from '../../tools/renderfield';

import {
    required,
    requiredImg,
    WeuiInputValidation,
    phone,
    isidcard,
    WeuiSelectValidation,
    InputBankValidation,
    asyncValidate,
    } from '../../tools/formvalidation';

const carcyearcheck = [
  {value: '未审核',label: '未审核'},{value: '已审核',label: '已审核'},{value: '审核中',label: '审核中'}
];


class Page extends Component {

    render() {
        const { handleSubmit,previousPage } = this.props;
        return (
            <div className="taxiPage AppPage">
                <NavBar
                    back={true}
                    title="车辆信息"
                    />
                <div className="list">
                    <FormUI className="formStyle1">
                        <CellsTitle>请认真填写车辆基本信息</CellsTitle>
                        <Field
                          name="OwnerName"
                          InputTit="所属公司"
                          placeholder="请输入公司名"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required ]}
                          />
                        <Field
                          name="VehicleNo"
                          InputTit="车牌号"
                          placeholder="请输入车牌号"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required ]}
                          />
                        <Field
                          name="Seats"
                          InputTit="核定载客位"
                          placeholder="请输入"
                          type="number"
                          component={WeuiInputValidation}
                          validate={[ required ]}
                          />
                        <Field
                          name="CheckState"
                          InputTit="年度审核状态"
                          component={WeuiSelectValidation}
                          Option={carcyearcheck}
                          />
                    </FormUI>
                    <FormUI className="formStyle1">
                        <CellsTitle>网络预约出租车运输证号</CellsTitle>
                        <Field
                          name="Certificate"
                          InputTit=""
                          placeholder="请输入网络预约出租车运输证号"
                          type="text"
                          component={WeuiInputValidation}
                          validate={[ required ]}
                          />
                    </FormUI>
                </div>
                <div className="submitBtn">
                  <button className="btn Primary" onClick={handleSubmit}><span>下一步</span></button>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'createcarwizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    initialValues:{
      CheckState: "未审核",
    },
    validate
})(Page)
