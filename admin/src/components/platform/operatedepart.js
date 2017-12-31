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


const OperateDepartTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>车辆经营出发</span>;
};


const OperateDepartShow = (props) => (
       <Show title={<OperateDepartTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="订单号" source="OrderId" />
           <TextField label="机动车驾驶证号" source="LicenseId" />
           <TextField label="运价类型编码" source="FareType" />
           <TextField label="车辆号牌" source="VehicleNo" />
           <TextField label="车辆出发经度" source="DepLongitude" />
           <TextField label="车辆出发纬度" source="DepLatitude" />
           <TextField label="坐标加密标识" source="Encrypt" />
           <DateField label="上车时间" source="DepTime" />
           <TextField label="空驶里程" source="WaitMile" />
           <DateField label="等待时间" source="WaitTime" />
           </SimpleShowLayout>
       </Show>
);



const OperateDepartList = (props) => (//
     <List title="车辆经营出发列表" {...props} sort={{ field: 'DepTime', order: 'DESC' }}>
        <Datagrid>
        <TextField label="订单号" source="OrderId" />
        <TextField label="机动车驾驶证号" source="LicenseId" />
        <TextField label="运价类型编码" source="FareType" />
        <TextField label="车辆号牌" source="VehicleNo" />
        <TextField label="车辆出发经度" source="DepLongitude" />
        <TextField label="车辆出发纬度" source="DepLatitude" />
        <TextField label="坐标加密标识" source="Encrypt" />
        <TextField label="上车时间" source="DepTime" />
        <TextField label="空驶里程" source="WaitMile" />
        <TextField label="等待时间" source="WaitTime" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {OperateDepartList,OperateDepartShow};
