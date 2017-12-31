import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';

import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';
import {required} from 'admin-on-rest';
import {DateInputString} from '../controls/DateInput_String.js';


const RatedDrivercreateTitle = ({ record }) => {
   return <span>新建 驾驶员信誉信息</span>;
};
const RatedDriverCreate = (props) => (
       <Create {...props} title={<RatedDrivercreateTitle />} >
           <SimpleForm>
             <TextInputEx label="机动车驾驶证编号" source="LicenseId"  validate={[required]}/>
             <NumberInputEx label="服务质量信誉等级[1~5]"  source="Level"  validate={[required]}/>
             <DateInputString label="服务质量信誉考核日"  source="TestDate"  validate={[required]}/>
             <TextInputEx label="服务质量信誉考核机构"  source="TestDepartment"  validate={[required]}/>
           </SimpleForm>
       </Create>
);

const RatedDrivereditTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 支付信息</span>;
};

const RatedDriverEdit = (props) => {
      return (<Edit title={<RatedDrivereditTitle />} {...props}>
          <SimpleForm>
            <TextInputEx label="机动车驾驶证编号" source="LicenseId"  validate={[required]}/>
            <NumberInputEx label="服务质量信誉等级[1~5]"  source="Level"  validate={[required]}/>
            <DateInputString label="服务质量信誉考核日"  source="TestDate"  validate={[required]}/>
            <TextInputEx label="服务质量信誉考核机构"  source="TestDepartment"  validate={[required]}/>
            <TextField label="数据更新时间" source="UpdateTime"  />
          </SimpleForm>
      </Edit>);

};



const RatedDriverList = (props) => (//
     <List title="驾驶员信誉信息列表" {...props} >
        <Datagrid>
        <TextField label="机动车驾驶证编号" source="LicenseId" />
        <TextField label="服务质量信誉等级"  source="Level" />
        <TextField label="服务质量信誉考核日"  source="TestDate" />
        <TextField label="服务质量信誉考核机构"  source="TestDepartment" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {RatedDriverList,RatedDriverCreate,RatedDriverEdit};
