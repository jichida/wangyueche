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
import {required} from 'admin-on-rest';
import {DateInputString} from '../controls/DateInput_String.js';




const RatedDriverPunishcreateTitle = ({ record }) => {
   return <span>新建 驾驶员处罚信息</span>;
};
const RatedDriverPunishCreate = (props) => (
       <Create {...props} title={<RatedDriverPunishcreateTitle />} >
           <SimpleForm>
             <TextInputEx label="机动车驾驶证编号" source="LicenseId"   validate={[required]}/>
             <DateInputString label="处罚时间"  source="PunishTime"   validate={[required]}/>
             <TextInputEx label="处罚原因"  source="PunishReason"   validate={[required]}/>
             <TextInputEx label="处罚结果"  source="PunishResult"   validate={[required]}/>
           </SimpleForm>
       </Create>
);

const RatedDriverPunisheditTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 驾驶员处罚信息</span>;
};

const RatedDriverPunishEdit = (props) => {
      return (<Edit title={<RatedDriverPunisheditTitle />} {...props}>
          <SimpleForm>
            <TextInputEx label="机动车驾驶证编号" source="LicenseId"   validate={[required]}/>
            <DateInputString label="处罚时间"  source="PunishTime"   validate={[required]}/>
            <TextInputEx label="处罚原因"  source="PunishReason"   validate={[required]}/>
            <TextInputEx label="处罚结果"  source="PunishResult"   validate={[required]}/>
            <TextField label="数据更新时间" source="UpdateTime"  />
          </SimpleForm>
      </Edit>);

};


const RatedDriverPunishList = (props) => (//
     <List title="驾驶员处罚信息列表" {...props} >
        <Datagrid>
        <TextField label="机动车驾驶证编号" source="LicenseId" />
        <DateField label="处罚时间"  source="PunishTime" />
        <TextField label="处罚原因"  source="PunishReason" />
        <TextField label="处罚结果"  source="PunishResult" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {RatedDriverPunishList,RatedDriverPunishCreate,RatedDriverPunishEdit};
