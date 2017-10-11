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
    Form:FormUI,
    } = WeUI;
import {renderInputField} from '../../tools/renderfield';
import {renderImageupload} from '../../tools/renderimageupload';
import {
    requiredImg,
    required,
    WeuiInputValidation
    } from '../../tools/formvalidation';
import {set_weui} from '../../../actions';

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
                <NavBar back={false} title="上传照片" leftnav={[
                {
                    text : '上一步',
                    type : 'action',//push, action,
                    action : previousPage,
                },
            ]} />
                <div className="list updataimg">

                    <div className="li">
                        <div className="tit">服务资格证</div>
                        <div className="desc">证件有效期内，需证件清晰，信息全部展示</div>
                        <div className="imgbox">
                            <Field
                                name="PhotoServiceicenseURL"
                                loading={this.showLoading.bind(this)}
                                component={renderImageupload}
                                validate={[ requiredImg ]}
                                />
                        </div>
                    </div>

                    <div className="li">
                        <div className="tit">监督卡</div>
                        <div className="desc">证件有效期内，需证件清晰，信息全部展示</div>
                        <div className="imgbox">

                            <Field
                                name="PhotoJiandukaURL"
                                loading={this.showLoading.bind(this)}
                                component={renderImageupload}
                                validate={[ requiredImg ]}
                                />
                        </div>
                    </div>

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
                                loading={this.showLoading.bind(this)}
                                component={renderImageupload}
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
                                loading={this.showLoading.bind(this)}
                                component={renderImageupload}
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
                                loading={this.showLoading.bind(this)}
                                component={renderImageupload}
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
  form: 'registerfillwizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
  validate
})(Page)
