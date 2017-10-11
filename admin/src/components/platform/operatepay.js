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


const OperatePayTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>经营支付</span>;
};


const OperatePayShow = (props) => (
       <Show title={<OperatePayTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="订单号" source="Orderld" />
           <TextField label="上车位置行政区划编号" source="OnArea" />
           <TextField label="机动车驾驶员姓名" source="DriverName" />
           <TextField label="机动车驾驶证号" source="Licenseld" />
           <TextField label="运价类型编码" source="FareType" />
           <TextField label="车辆号牌" source="VehicleNo" />
           <DateField label="预计上车时间" source="BookDepTime" />
           <DateField label="等待时间" source="WaitTime" />
           <TextField label="出发经度" source="DepLongitude" />
           <TextField label="出发纬度" source="DepLatitude" />
           <TextField label="上车地点" source="DepArea" />
           <DateField label="上车时间" source="DepTime" />
           <TextField label="车辆到达纬度" source="DestLongitude" />
           <TextField label="车辆到达纬度" source="DestLatitude" />
           <DateField label="下车时间" source="DestTime" />
           <TextField label="预定车型" source="BookModel" />
           <TextField label="实际使用车型" source="Model" />
           <TextField label="载客里程" source="DriveMile" />
           <DateField label="载客时间" source="DriveTime" />
           <TextField label="空驶里程" source="WaitMile" />
           <TextField label="实收金额" source="FactPrice" />
           <TextField label="应收金额" source="Price" />
           <TextField label="现金支付金额" source="CashPrice" />
           <TextField label="电子支付机构" source="LineName" />
           <TextField label="电子支付金额" source="LinePrice" />
           <TextField label="POS机支付机构" source="PosName" />
           <TextField label="POS机支付金额" source="PosPrice" />
           <TextField label="优惠金额" source="BenfitPrice" />
           <TextField label="预约服务费" source="BookTip" />
           <TextField label="附加费" source="PassengerTip" />
           <TextField label="乘坐价格" source="PeakUpPrice" />
           <TextField label="夜间时段里程加价金" source="NightUpPrice" />
           <TextField label="远途加价金额" source="FarUpPrice" />
           <TextField label="其他加价金额" source="OtherUpPrice" />
           <TextField label="结算状态" source="PayState" />
           <DateField label="乘客结算时间" source="PayTime" />
           <DateField label="订单完成时间" source="OrderMatchTime" />
           <TextField label="发票状态" source="InvoiceStatus" />
           </SimpleShowLayout>
       </Show>
);

const OperatePayList = (props) => (//
     <List title="经营支付列表" {...props}  sort={{ field: 'PayTime', order: 'DESC' }}>
        <Datagrid>
        <TextField label="订单号" source="Orderld" />
        <TextField label="机动车驾驶员姓名" source="DriverName" />
        <TextField label="机动车驾驶证号" source="Licenseld" />
        <TextField label="运价类型编码" source="FareType" />
        <TextField label="车辆号牌" source="VehicleNo" />
        <TextField label="出发经度" source="DepLongitude" />
        <TextField label="出发纬度" source="DepLatitude" />
        <TextField label="上车地点" source="DepArea" />
        <DateField label="上车时间" source="DepTime" />
        <TextField label="载客里程" source="DriveMile" />
        <DateField label="载客时间" source="DriveTime" />
        <TextField label="空驶里程" source="WaitMile" />
        <TextField label="实收金额" source="FactPrice" />
        <TextField label="应收金额" source="Price" />
        <DateField label="乘客结算时间" source="PayTime" />
        <DateField label="订单完成时间" source="OrderMatchTime" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {OperatePayList,OperatePayShow};
