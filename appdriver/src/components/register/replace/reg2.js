/*
    注册司机－车辆信息
*/
import React, { Component } from 'react';
import NavBar from '../../tools/nav.js';
import { Field,reduxForm} from 'redux-form';
import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import '../../../../public/newcss/taxi.css';
const {
    Form:FormUI,
    } = WeUI;
import { renderImageupload } from '../../tools/renderimageupload';
import { set_weui } from "../../../actions";

import {
    required,
    requiredImg,
    WeuiInputValidation,
    } from '../../tools/formvalidation';

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
        return (
            <div className="taxiPage AppPage">
                <NavBar back={false} title="上传照片"
                  leftnav={[
                    {
                      type:"action",
                      action : previousPage,
                      text:"上一步"
                    }
                  ]}
                 />
                <div className="list updataimg">
                    <div className="li">
                        <div className="tit">驾驶证</div>
                        <FormUI>
                          <Field
                            name="LicenseId"
                            InputTit="驾驶证号"
                            placeholder="请输入驾驶证号"
                            type="text"
                            component={WeuiInputValidation}
                            validate={[ required ]}
                            />
                        </FormUI>
                        <div className="desc">有效期内，证件清晰，信息全部展示</div>
                        <div className="imgbox">
                            <Field name="LicensePhotoIdURL"
                              component={renderImageupload}
                              loading={this.showLoading.bind(this)}
                              validate={[ requiredImg ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="submitBtn">
                  <botton className="btn Primary"  onClick={handleSubmit}>确定</botton>
                </div>
            </div>
        )
    }
}

export default reduxForm({
  form: 'registerfillwizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(Page)
