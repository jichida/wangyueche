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
const {
    CellsTitle,
    Form:FormUI,
    } = WeUI;
import {
    required,
    WeuiInputValidation,
    WeuiSelectValidation,
    } from '../../tools/formvalidation';

class Page extends Component {
    render() {
        const { handleSubmit,previousPage } = this.props;
        return (
            <div className="taxiPage AppPage">
                <NavBar back={false} title="车辆信息" leftnav={[
                {
                    text : '上一步',
                    type : 'action',//push, action,
                    action : previousPage,
                },
            ]} />
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
                            placeholder="请输入数字"
                            type="number"
                            component={WeuiInputValidation}
                            validate={[ required ]}
                            />
                        <Field
                          name="CheckState"
                          InputTit="年度审核状态"
                          component={WeuiSelectValidation}
                          Option={[{label:"已审",value:"已审"},{label:"未审",value:"未审"}]}
                          />
                        <Field
                            name="Certificate"
                            InputTit="网络预约出租车运输证号"
                            placeholder="请输入证件号"
                            type="text"
                            component={WeuiInputValidation}
                            validate={[ required ]}
                            />
                    </FormUI>
                </div>
                <div className="submitBtn registercartinfo1">
                  <button className="btn Primary" onClick={handleSubmit}><span>确定</span></button>
                </div>
            </div>
        )
    }
}
export default reduxForm({
    form: 'registerfillwizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    initialValues:{
      CheckState: "已审"
    }
})(Page)
