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


const OrderMatchTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>订单成功匹配</span>;
};


const OrderMatchShow = (props) => (
       <Show title={<OrderMatchTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="订单编号" source="OrderId" />
           <TextField label="车辆经度" source="Longitude" />
           <TextField label="车辆纬度" source="Latitude" />
           <TextField label="坐标加密标识" source="Encrypt" />
           <TextField label="机动车驾驶证编号" source="LicenseId" />
           <DateField label="派单成功时间" source="DistributeTime" showTime/>
           </SimpleShowLayout>
       </Show>
);



const OrderMatchList = (props) => (//
     <List title="订单成功匹配列表" {...props} sort={{ field: 'DistributeTime', order: 'DESC' }}>
        <Datagrid>
        <TextField label="订单编号" source="OrderId" />
        <TextField label="车辆经度" source="Longitude" />
        <TextField label="车辆纬度" source="Latitude" />
        <TextField label="坐标加密标识" source="Encrypt" />
        <TextField label="机动车驾驶证编号" source="LicenseId" />
        <DateField label="派单成功时间" source="DistributeTime" showTime/>
        <ShowButton />
        </Datagrid>
    </List>
);


export  {OrderMatchList,OrderMatchShow};
