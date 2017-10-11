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

const BaseInfoDriverEducatecreateTitle = ({ record }) => {
   return <span>新建 驾驶员培训信息</span>;
};
const BaseInfoDriverEducateCreate = (props) => (
       <Create {...props} title={<BaseInfoDriverEducatecreateTitle />} >
           <SimpleForm>
               <TextInputEx label="机动车驾驶证号" source="Licenseld" />
               <TextInputEx label="驾驶员培训课程名称"  source="CourseName" />
               <DateInput label="培训课程日期"  source="CourseDate" />
               <TimePickerInput label="培训开始时间" source="StartTime" />
               <TimePickerInput label="培训结束时间" source="StopTime" />
               <NumberInputEx label="培训时长" source="Duration" />
           </SimpleForm>
       </Create>
);

const BaseInfoDriverEducateTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 驾驶员培训信息</span>;
};

const BaseInfoDriverEducateEdit = (props) => {
      return (<Edit title={<BaseInfoDriverEducateTitle />} {...props}>
          <SimpleForm>
          <TextInputEx label="机动车驾驶证号" source="Licenseld" />
          <TextInputEx label="驾驶员培训课程名称"  source="CourseName" />
          <DateInput label="培训课程日期"  source="CourseDate" />
          <TimePickerInput label="培训开始时间" source="StartTime" />
          <TimePickerInput label="培训结束时间" source="StopTime" />
          <NumberInputEx label="培训时长" source="Duration" />
          </SimpleForm>
      </Edit>);

};


const BaseInfoDriverEducateShow = (props) => (
       <Show title={<BaseInfoDriverEducateTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="机动车驾驶证号" source="Licenseld" />
               <TextField label="驾驶员培训课程名称"  source="CourseName" />
               <DateField label="培训课程日期"  source="CourseDate" />
               <DateField label="培训开始时间" source="StartTime" showTime/>
               <DateField label="培训结束时间" source="StopTime" showTime/>
               <TextField label="培训时长" source="Duration" />
           </SimpleShowLayout>
       </Show>
);



const BaseInfoDriverEducateList = (props) => (//
     <List title="驾驶员培训信息列表" {...props} >
        <Datagrid>
        <TextField label="机动车驾驶证号" source="Licenseld" />
        <TextField label="驾驶员培训课程名称"  source="CourseName" />
        <TextField label="培训课程日期"  source="CourseDate" />
        <DateField label="培训开始时间" source="StartTime" />
        <DateField label="培训结束时间" source="StopTime" />
        <TextField label="培训时长" source="Duration" />
        <EditButton />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {BaseInfoDriverEducateList,BaseInfoDriverEducateCreate,BaseInfoDriverEducateEdit,BaseInfoDriverEducateShow};
