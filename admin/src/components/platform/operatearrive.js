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


const OperateArriveTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>车辆经营到达</span>;
};


const OperateArriveShow = (props) => (
       <Show title={<OperateArriveTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="订单号" source="OrderId" />
           <TextField label="车辆到达经度" source="DestLongitude" />
           <TextField label="车辆到达纬度" source="DestLatitude" />
           <TextField label="坐标加密标识" source="Encrypt" />
           <DateField label="下车时间" source="DestTime" />
           <TextField label="载客里程" source="DriveMile" />
           <DateField label="载客时间" source="DriveTime" />
           </SimpleShowLayout>
       </Show>
);



const OperateArriveList = (props) => (//
     <List title="车辆经营到达列表" {...props}  sort={{ field: 'DestTime', order: 'DESC' }}>
        <Datagrid>
        <TextField label="订单号" source="OrderId" />
        <TextField label="车辆到达经度" source="DestLongitude" />
        <TextField label="车辆到达纬度" source="DestLatitude" />
        <TextField label="坐标加密标识" source="Encrypt" />
        <DateField label="下车时间" source="DestTime" />
        <TextField label="载客里程" source="DriveMile" />
        <DateField label="载客时间" source="DriveTime" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {OperateArriveList,OperateArriveShow};
