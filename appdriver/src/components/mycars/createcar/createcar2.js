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
import validate from './validate';
const {
    Panel,
    PanelBody,
    } = WeUI;
import {
    set_weui
} from '../../../actions';
const {
    Form:FormUI,
    } = WeUI;
import {renderInputField} from '../../tools/renderfield';
import {renderImageupload} from '../../tools/renderimageupload';
import {
    requiredImg,
    required,
    WeuiInputValidation
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
                <NavBar
                    back={false}
                    title="上传照片"
                    leftnav={[
                        {
                            type:"action",
                            action : previousPage,
                            text:"上一步"
                        },
                    ]}
                    />
                <div className="list updataimg">

                  <div className="li">
                        <div className="tit">驾驶证</div>
                        <FormUI>
                            <Field
                              name="Licenseld"
                              InputTit="驾驶证号"
                              placeholder="请输入驾驶证号"
                              type="text"
                              component={WeuiInputValidation}
                              validate={[ required ]}
                              />
                        </FormUI>
                        <div className="desc">有效期内，证件清晰，信息全部展示</div>
                        <div className="imgbox">
                            <Field 
                                name="LicensePhotoldURL" 
                                component={renderImageupload}
                                loading={this.showLoading.bind(this)}
                                validate={[ requiredImg ]}
                                />
                        </div>
                    </div>

                    <div className="li">
                        <div className="tit">行驶证</div>
                        <div className="desc">出租客运，证件清晰，信息全部展示</div>
                        <div className="imgbox">
                            <Field 
                                name="CarrunPhotoldURL" 
                                component={renderImageupload}
                                loading={this.showLoading.bind(this)}
                                validate={[ requiredImg ]}
                                />
                        </div>
                    </div>

                     <div className="li">
                        <div className="tit">人车合影</div>
                        <div className="desc">人车合影正面照，能看清人、车牌、顶灯。</div>
                        <div className="imgbox">
                            <Field 
                                name="PhotoandCarmanURL" 
                                component={renderImageupload}
                                loading={this.showLoading.bind(this)}
                                validate={[ requiredImg ]}
                                />
                        </div>
                    </div>

                </div>

                <div className="submitBtn">
                    <button className="btn Primary" onClick={handleSubmit}><span>确定</span></button>
                </div>
            </div>
        )
    }
}
export default reduxForm({
    form: 'createcarwizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(Page)
