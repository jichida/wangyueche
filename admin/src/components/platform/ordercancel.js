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


const OrderCancelTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>订单取消匹配</span>;
};


const OrderCancelShow = (props) => (
       <Show title={<OrderCancelTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="订单编号" source="Orderld" />
           <DateField label="订单时间" source="OrderTime" showTime/>
           <DateField label="订单撤销时间" source="CancelTime" showTime/>
           <TextField label="撤销发起方	1.乘客.2.驾驶员3.平台公司" source="Operator" />
           <TextField label="撤销类型代码	1:乘客提前撤销2:驾驶员提前撤销3:平台公司撤销4 .乘客违约撤销5 .驾驶员违约撤销" source="CancelTypeCode" />
           <TextField label="撤销或违约原因" source="CancelReason" />
           </SimpleShowLayout>
       </Show>
);



const OrderCancelList = (props) => (//
     <List title="订单取消列表" {...props}  sort={{ field: 'CancelTime', order: 'DESC' }}>
        <Datagrid>
        <TextField label="订单编号" source="Orderld" />
        <DateField label="订单时间" source="OrderTime" showTime/>
        <DateField label="订单撤销时间" source="CancelTime" showTime/>
        <TextField label="撤销发起方" source="Operator" />
        <TextField label="撤销类型代码" source="CancelTypeCode" />
        <TextField label="撤销或违约原因" source="CancelReason" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {OrderCancelList,OrderCancelShow};
