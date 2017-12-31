import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';
import {DateInputString} from '../controls/DateInput_String.js';
import {required} from 'admin-on-rest';

const BaseInfoPassengerTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 乘客信息</span>;
};

const BaseInfoPassengerEdit = (props) => {
  return (<Edit title={<BaseInfoPassengerTitle />} {...props}>
      <SimpleForm>
        <DateField label="注册日期" source="RegisterDate" showTime/>
        <TextInputEx label="乘客手机号"  source="PassengerPhone" validate={[required]}/>
        <TextInputEx label="乘客称谓"  source="PassengerName" validate={[required]}/>
        <TextInputEx label="乘客性别"  source="PassengerGender" validate={[required]}/>
        <TextField label="数据更新时间" source="UpdateTime"  />
      </SimpleForm>
  </Edit>);
};

const BaseInfoPassengerList = (props) => (//
     <List title="乘客信息列表" {...props} >
        <Datagrid>
        <DateField label="注册日期" source="RegisterDate" showTime/>
        <TextField label="乘客手机号"  source="PassengerPhone" />
        <TextField label="乘客称谓"  source="PassengerName" />
        <TextField label="乘客性别"  source="PassengerGender" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {BaseInfoPassengerList,BaseInfoPassengerEdit};
