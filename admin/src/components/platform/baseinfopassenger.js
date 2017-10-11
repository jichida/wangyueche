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


const BaseInfoPassengerTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>乘客信息</span>;
};


const BaseInfoPassengerShow = (props) => (
       <Show title={<BaseInfoPassengerTitle />} {...props}>
           <SimpleShowLayout>
               <DateField label="注册日期" source="RegisterDate" showTime/>
               <TextField label="乘客手机号"  source="PassengerPhone" />
               <TextField label="乘客称谓"  source="PassengerName" />
               <TextField label="乘客性别"  source="PassengerGender" />
           </SimpleShowLayout>
       </Show>
);



const BaseInfoPassengerList = (props) => (//
     <List title="乘客信息列表" {...props} >
        <Datagrid>
        <DateField label="注册日期" source="RegisterDate" showTime/>
        <TextField label="乘客手机号"  source="PassengerPhone" />
        <TextField label="乘客称谓"  source="PassengerName" />
        <TextField label="乘客性别"  source="PassengerGender" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {BaseInfoPassengerList,BaseInfoPassengerShow};
