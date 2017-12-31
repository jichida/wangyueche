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
import {DateInputString} from '../controls/DateInput_String.js';
import {required} from 'admin-on-rest';

const BaseInfoVehicleInsurancecreateTitle = ({ record }) => {
   return <span>新建 车辆保险</span>;
};
const BaseInfoVehicleInsuranceCreate = (props) => (
       <Create {...props} title={<BaseInfoVehicleInsurancecreateTitle />} >
           <SimpleForm>
               <TextInputEx label="车辆号牌" source="VehicleNo" validate={[required]}/>
               <TextInputEx label="保险公司名称"  source="InsurCom" validate={[required]}/>
               <TextInputEx label="保险号"  source="InsurNum" validate={[required]}/>
               <TextInputEx label="保险类型"  source="InsurType" validate={[required]}/>
               <NumberInputEx label="保险金额" source="InsurCount" validate={[required]}/>
               <DateInputString label="保险生效时间" source="InsurEff" validate={[required]}/>
               <DateInputString label="保险到期时间" source="InsurExp" validate={[required]}/>
           </SimpleForm>
       </Create>
);

const BaseInfoVehicleInsuranceTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 车辆保险</span>;
};

const BaseInfoVehicleInsuranceEdit = (props) => {
      return (<Edit title={<BaseInfoVehicleInsuranceTitle />} {...props}>
          <SimpleForm>
            <TextInputEx label="车辆号牌" source="VehicleNo" validate={[required]}/>
            <TextInputEx label="保险公司名称"  source="InsurCom" validate={[required]}/>
            <TextInputEx label="保险号"  source="InsurNum" validate={[required]}/>
            <TextInputEx label="保险类型"  source="InsurType" validate={[required]}/>
            <NumberInputEx label="保险金额" source="InsurCount"validate={[required]} />
            <DateInputString label="保险生效时间" source="InsurEff" validate={[required]}/>
            <DateInputString label="保险到期时间" source="InsurExp" validate={[required]}/>
          </SimpleForm>
      </Edit>);

};




const BaseInfoVehicleInsuranceList = (props) => (//
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
        </Datagrid>
    </List>
);


export  {BaseInfoVehicleInsuranceList,BaseInfoVehicleInsuranceCreate,BaseInfoVehicleInsuranceEdit};
