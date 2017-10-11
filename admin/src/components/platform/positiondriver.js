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


const PositionDriverTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>驾驶员定位信息</span>;
};


const PositionDriverShow = (props) => (
       <Show title={<PositionDriverTitle />} {...props}>
           <SimpleShowLayout>
               <TextField label="网约车公司标识" source="Licenseld" />
               <TextField label="行政区划代码"  source="DriverRegionCode" />
               <TextField label="网约车公司标识"  source="VehicleNo" />
               <DateField label="定位时间"  source="PositionTime" showTime/>
               <TextField label="经度" source="Longitude" />
               <TextField label="纬度" source="Latitude" />
               <TextField label="坐标加密标识" source="Encrypt" />
               <TextField label="方向角" source="Direction" />
               <TextField label="海拔高度" source="Elevation" />
               <TextField label="瞬时速度" source="Speed" />
               <TextField label="营运状态" source="BizStatus" />
               <TextField label="订单编号" source="Orderld" />
           </SimpleShowLayout>
       </Show>
);



const PositionDriverList = (props) => (//
     <List title="驾驶员定位信息列表" {...props} sort={{ field: 'PositionTime', order: 'DESC' }}>
        <Datagrid>
        <TextField label="网约车公司标识" source="Licenseld" />
        <TextField label="行政区划代码"  source="DriverRegionCode" />
        <TextField label="网约车公司标识"  source="VehicleNo" />
        <DateField label="定位时间"  source="PositionTime" showTime/>
        <TextField label="方向角" source="Direction" />
        <TextField label="海拔高度" source="Elevation" />
        <TextField label="瞬时速度" source="Speed" />
        <TextField label="营运状态" source="BizStatus" />
        <TextField label="订单编号" source="Orderld" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {PositionDriverList,PositionDriverShow};
