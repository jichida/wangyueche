import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import { Field } from 'redux-form';

const renderDatePicker= (props) => {
  let {input,label} = props;
  let onChange = (event, newdate)=>{
    let newvalue = moment(newdate).format("YYYY-MM-DD");
    input.onChange(newvalue);
  }


  let value = new Date();
  if(!!input.value){
    value = moment(input.value).toDate();
  }
  else{
    input.onChange(moment().format("YYYY-MM-DD"));
  }
  return (<DatePicker floatingLabelText={label} floatingLabelFixed={true}
  value={value} onChange={onChange} okLabel='确定' cancelLabel='取消'/>);
}

const DateInputString = (props) => {
  let {source,label} = props;
  return(
    <span>
      <Field name={source} component={renderDatePicker} label={label}/>
    </span>
  )
}


export  {DateInputString};
