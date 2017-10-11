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


const RatedPassengerTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>乘客评价信息</span>;
};


const RatedPassengerShow = (props) => (
       <Show title={<RatedPassengerTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="订单号" source="Orderld" />
           <DateField label="评价时间"  source="EvaluateTime" />
           <TextField label="服务满意度"  source="ServiceScore" />
           <TextField label="驾驶员满意度"  source="DriverScore" />
           <TextField label="车辆满意度"  source="VehicleScore" />
           <TextField label="评价内容"  source="Detail" />
           </SimpleShowLayout>
       </Show>
);



const RatedPassengerList = (props) => (//
     <List title="乘客评价信息列表" {...props} >
        <Datagrid>
        <TextField label="订单号" source="Orderld" />
        <DateField label="评价时间"  source="EvaluateTime" />
        <TextField label="服务满意度"  source="ServiceScore" />
        <TextField label="驾驶员满意度"  source="DriverScore" />
        <TextField label="车辆满意度"  source="VehicleScore" />
        <TextField label="评价内容"  source="Detail" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {RatedPassengerList,RatedPassengerShow};
