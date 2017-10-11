import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../../../public/newcss/carpool.css';
import {
    ui_clickpinchetypebtn,
    setpinchequery
} from '../../actions';
import _ from "lodash";
import {
    WeuiSelectValidation
    } from "../tools/formvalidation";
import {Field, reduxForm, Form, formValueSelector } from 'redux-form';
import {renderDateField} from "../tools/renderdate";

import 'weui';
import 'react-weui/lib/react-weui.min.css';
//最新的代码
class PincheForm extends React.Component{
    render(){
        const { handleSubmit,citylist,FormSubmit } = this.props;
        let newcitylist = _.map(citylist,(city,index)=>{
            return {
                value:city,
                label:city
            }
        })
        return (
            <Form
                onSubmit={handleSubmit(FormSubmit)}
                className="formStyle1"
                >
                <Field
                    name="startcity"
                    id="startcity"
                    Option={newcitylist}
                    component={ WeuiSelectValidation }
                    InputTit="出发地"
                />
                <Field
                    name="endcity"
                    id="endcity"
                    Option={newcitylist}
                    component={ WeuiSelectValidation }
                    InputTit="目的地"
                />
                <Field
                    name="starttime"
                    id="starttime"
                    label="出发时间"
                    component={renderDateField}
                />
                <div className="submitBtn">
                    <botton
                        className="btn Primary"
                        onClick={handleSubmit}>
                        查询
                    </botton>
                </div>
            </Form>
        )
    }
}
PincheForm = reduxForm({
    form: 'selectingFormValues',
    initialValues:{
        starttime : moment(new Date()).format('YYYY-MM-DD'),
        endcity : "常州",
        startcity : "南京"
    }
})(PincheForm);
const selector = formValueSelector('selectingFormValues');
PincheForm = connect(({state,pinche,appui,app:{pinchecitylist:citylist}}) => {
    // can select values individually
    const startcity = selector(state, 'startcity');
    const endcity = selector(state, 'endcity');
    return {
        endcity,
        startcity,
        citylist,
        ...pinche,
        ...appui.pinche,
    };
})(PincheForm);

class Pinche extends React.Component {
    onClickTabbtn =(newvalue)=>{
        this.props.dispatch(ui_clickpinchetypebtn(newvalue));
    }
    formSubmit =(value)=>{
        const {  pinchetypetabbtn } = this.props;
        let tabtitle = ['专线','人气团拼'];
        let querydata = {
            startcity:value.startcity,
            endcity:value.endcity,
            pinchetype:tabtitle[pinchetypetabbtn],
            startdate:value.starttime
        };
        this.props.dispatch(setpinchequery(querydata));
        this.props.history.push('/pinchequery');
    }
    render() {
        const {  pinchetypetabbtn } = this.props;
        return (
            <div className="carpoolPage AppPage">
                <div className="pageNav">
                    <span
                        className={pinchetypetabbtn===0?"sel":""}
                        onClick={()=>{this.onClickTabbtn(0)}}
                        >
                        专线
                    </span>
                    <span
                        className={pinchetypetabbtn===1?"sel":""}
                        onClick={()=>{this.onClickTabbtn(1)}}
                        >
                        人气团拼
                    </span>
                </div>

                <PincheForm FormSubmit={this.formSubmit}/>

            </div>
        );
    }
}

const mapStateToProps = ({pinche,appui}) => {
    return {...pinche,...appui.pinche};
}
export default connect(
    mapStateToProps,
)(Pinche);
