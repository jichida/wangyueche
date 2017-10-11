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


const RatedDriverPunishTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>驾驶员处罚信息</span>;
};


const RatedDriverPunishShow = (props) => (
       <Show title={<RatedDriverPunishTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="机动车驾驶证编号" source="Licenseld" />
           <DateField label="处罚时间"  source="PunishTime" />
           <TextField label="处罚原因"  source="PunishReason" />
           <TextField label="处罚结果"  source="PunishResult" />
           </SimpleShowLayout>
       </Show>
);



const RatedDriverPunishList = (props) => (//
     <List title="驾驶员处罚信息列表" {...props} >
        <Datagrid>
        <TextField label="机动车驾驶证编号" source="Licenseld" />
        <DateField label="处罚时间"  source="PunishTime" />
        <TextField label="处罚原因"  source="PunishReason" />
        <TextField label="处罚结果"  source="PunishResult" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {RatedDriverPunishList,RatedDriverPunishShow};
