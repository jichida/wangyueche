/*
    旅游大巴填写用户信息
*/
import React from 'react';
import { connect } from 'react-redux';

import { Field,reduxForm,Form,getFormValues  } from 'redux-form';

import WeUI from 'react-weui';
import 'weui';
import 'react-weui/lib/react-weui.min.css';
import "./tourbusUserinfo.css";
import NavBar from '../tools/nav.js';
import {
    required,
    WeuiInputValidation,
    DatePickerInput
    } from "../tools/formvalidation"
const {
    FormCell,
    Form:FormUI,
    Cell,
    CellHeader,
    CellBody,
    Label,
    CellsTitle
    } = WeUI;
import _ from 'lodash';
import {
    insertorder_request
} from '../../actions';


let PageForm = (props) => {

   	const {handleSubmit,onClickOK,totalorderprice,startdate} = props;

    let yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    let minEndDate = new Date();
    minEndDate.setDate(startdate.getDate() - 1);

    return (
	    <Form
            onSubmit={handleSubmit(onClickOK)}
            >

            <FormUI>

            	<Field
                    name="zucheren"
                    id="zucheren"
                    placeholder="请输入真实姓名"
                    type="text"
                    component={ WeuiInputValidation }
                    validate={[ required ]}
                    InputTit="租车人"
                />
                <Field
                    name="zuchephone"
                    id="zuchephone"
                    placeholder="请输入您的联系方式"
                    type="text"
                    component={ WeuiInputValidation }
                    validate={[ required ]}
                    InputTit="租车电话"
                />
                <FormCell className="seltime">
                    <CellHeader>
                        <Label>出行时间</Label>
                    </CellHeader>
                    <CellBody>
                        <Field
            							name="startdate"
            							id="startdate"
            							component={ DatePickerInput }
                          min={yesterdayDate}
                          dateFormat={['YYYY年', 'MM月', 'DD日']}
            						/>
                    </CellBody>
                </FormCell>
                <FormCell className="seltime">
                    <CellHeader>
                        <Label>还车时间</Label>
                    </CellHeader>
                    <CellBody>
                        <Field
              							name="enddate"
              							id="enddate"
              							component={ DatePickerInput }
                            dateFormat={['YYYY年', 'MM月', 'DD日']}
                            min={minEndDate}
						             />
                    </CellBody>
                </FormCell>
	            <Cell>
	                <CellBody>
	                    <span className="tit">支付金额</span>
	                    <span className="color_warning">¥{totalorderprice}</span>
	                </CellBody>
	            </Cell>
	            <CellsTitle className="pricenum">
	            	<img src="newimg/39.png"  alt=""/>
	            	<span>购买说明: 您购买的是不含过路费的，如有疑问请联系客服</span>
	            </CellsTitle>
	            <div className="submitBtn">
	                <button className="btn Primary"><span>确定</span></button>
	            </div>
            </FormUI>

		</Form>
    );
};

const mapStateToPropsForm = (state) => {
  let {orderprice,startdate,enddate} = getFormValues('tourbus')(state);
  startdate = startdate || new Date();
  enddate = enddate || new Date();
  let days = enddate.getDate() - startdate.getDate() + 1;
  if(days < 1){
    days = 1;
  }
  let totalorderprice = orderprice*days;
  return {totalorderprice,startdate,enddate};
}
PageForm = connect(mapStateToPropsForm)(PageForm);

PageForm = reduxForm({
    form: 'tourbus',
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(PageForm);


let Page = (props) => {
    let onClickOK =(values)=>{
      console.log("ok:" + JSON.stringify(values));
      const {startdate,enddate,orderprice,zucheren,zuchephone} = values;
      const {buslistsel,totalnumber} = props;
      let days = enddate.getDate() - startdate.getDate() + 1;
      if(days < 1){
        days = 1;
      }
      let totalorderprice = orderprice*days;
      let order = {
          triptype:'旅游大巴',
          buslistsel:buslistsel,
          rentusername:zucheren,
          rentuserphone:zuchephone,
          startdate:startdate,//出发日期
          enddate:enddate,//出发日期
          orderdetail:`预定旅游大巴${totalnumber}辆,使用${days}天`,
          orderprice:totalorderprice,
      };
      console.log(`insertorder order:` + JSON.stringify(order));
      props.dispatch(insertorder_request(order));
    }
    const {buslistsel,totalnumber} = props;
    return (
        <div className="tourbusUserinfoPage AppPage">
        	<NavBar title='填写订单' back={true} />
        	<div className="carlist">
        		<div className="li">
              {
                _.map(buslistsel,(businfosel)=>{
                  return (<span key={businfosel._id}><img src={businfosel.icon}  alt=""/><i>{businfosel.num}</i></span>);
                })
              }
        		</div>
        		<span className="carlistlnk">共{totalnumber}辆</span>
        	</div>
        	<PageForm onClickOK={onClickOK}/>
        </div>
    );
};

const mapStateToProps = (state) => {
  const {lvyoudaba:{buslist}} = state;
  let {busnumberobj} = getFormValues('tourbus')(state);

  let buslistsel = [];
  let totalnumber = 0;
  _.map(buslist,(businfo)=>{
      if(busnumberobj.hasOwnProperty(businfo._id)){
          totalnumber += busnumberobj[businfo._id];
          buslistsel.push({
            _id:businfo._id,
            icon:businfo.icon,
            num:busnumberobj[businfo._id]
          });
      }
  });
  console.log(`values:===>${JSON.stringify(buslistsel)}`);
  return {buslistsel,totalnumber};
}
Page = connect(mapStateToProps)(Page);


export default Page;
