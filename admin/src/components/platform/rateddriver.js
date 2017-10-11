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


const RatedDriverTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>驾驶员信誉信息</span>;
};


const RatedDriverShow = (props) => (
       <Show title={<RatedDriverTitle />} {...props}>
           <SimpleShowLayout>
               <TextField label="机动车驾驶证编号" source="Licenseld" />
               <TextField label="服务质量信誉等级"  source="Level" />
               <TextField label="服务质量信誉考核日"  source="TestDate" />
               <TextField label="服务质量信誉考核机构"  source="TestDepartment" />
           </SimpleShowLayout>
       </Show>
);



const RatedDriverList = (props) => (//
     <List title="驾驶员信誉信息列表" {...props} >
        <Datagrid>
        <TextField label="机动车驾驶证编号" source="Licenseld" />
        <TextField label="服务质量信誉等级"  source="Level" />
        <TextField label="服务质量信誉考核日"  source="TestDate" />
        <TextField label="服务质量信誉考核机构"  source="TestDepartment" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {RatedDriverList,RatedDriverShow};
