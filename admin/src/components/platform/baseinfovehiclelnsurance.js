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

const BaseInfoVehiclelnsurancecreateTitle = ({ record }) => {
   return <span>新建 车辆保险</span>;
};
const BaseInfoVehiclelnsuranceCreate = (props) => (
       <Create {...props} title={<BaseInfoVehiclelnsurancecreateTitle />} >
           <SimpleForm>
               <TextInputEx label="车辆号牌" source="VehicleNo" />
               <TextInputEx label="保险公司名称"  source="InsurCom" />
               <TextInputEx label="保险号"  source="InsurNum" />
               <TextInputEx label="保险类型"  source="InsurType" />
               <TextInputEx label="保险金额" source="InsurCount" />
               <DateInput label="保险生效时间" source="InsurEff" />
               <DateInput label="保险到期时间" source="InsurExp" />
           </SimpleForm>
       </Create>
);

const BaseInfoVehiclelnsuranceTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 车辆保险</span>;
};

const BaseInfoVehiclelnsuranceEdit = (props) => {
      return (<Edit title={<BaseInfoVehiclelnsuranceTitle />} {...props}>
          <SimpleForm>
            <TextInputEx label="车辆号牌" source="VehicleNo" />
            <TextInputEx label="保险公司名称"  source="InsurCom" />
            <TextInputEx label="保险号"  source="InsurNum" />
            <TextInputEx label="保险类型"  source="InsurType" />
            <TextInputEx label="保险金额" source="InsurCount" />
            <DateInput label="保险生效时间" source="InsurEff" />
            <DateInput label="保险到期时间" source="InsurExp" />
          </SimpleForm>
      </Edit>);

};


const BaseInfoVehiclelnsuranceShow = (props) => (
       <Show title={<BaseInfoVehiclelnsuranceTitle />} {...props}>
           <SimpleShowLayout>
             <TextField label="车辆号牌" source="VehicleNo" />
             <TextField label="保险公司名称"  source="InsurCom" />
             <TextField label="保险号"  source="InsurNum" />
             <TextField label="保险类型"  source="InsurType" />
             <TextField label="保险金额" source="InsurCount" />
             <TextField label="保险生效时间" source="InsurEff" />
             <TextField label="保险到期时间" source="InsurExp" />
           </SimpleShowLayout>
       </Show>
);



const BaseInfoVehiclelnsuranceList = (props) => (//
     <List title="车辆保险列表" {...props} >
        <Datagrid>
        <TextField label="车辆号牌" source="VehicleNo" />
        <TextField label="保险公司名称"  source="InsurCom" />
        <TextField label="保险号"  source="InsurNum" />
        <TextField label="保险类型"  source="InsurType" />
        <TextField label="保险金额" source="InsurCount" />
        <TextField label="保险生效时间" source="InsurEff" />
        <TextField label="保险到期时间" source="InsurExp" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {BaseInfoVehiclelnsuranceList,BaseInfoVehiclelnsuranceCreate,BaseInfoVehiclelnsuranceEdit,BaseInfoVehiclelnsuranceShow};
