import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {ChipField,
  NumberInput,
  Create,
  Edit,
  SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,SelectInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';
import RichTextInput from '../controls/richtoolbar.js';

const NotifyMessagecreateTitle = ({ record }) => {
   return <span>新建 通知消息</span>;
};
const NotifyMessagelistCreate = (props) => (
       <Create {...props} title={<NotifyMessagecreateTitle />} >
           <SimpleForm>
               <SelectInput  label="消息类型"  source="messagetype" choices={[
                   { id: 'all', name: '所有' },
                   { id: 'driver', name: '司机端' },
                   { id: 'rider', name: '乘客端' },
               ]} />
               <TextInput label="消息标题"  source="messagetitle" />
               <RichTextInput label="消息内容" source="messagecontent" addLabel={false}/>
           </SimpleForm>
       </Create>
);

const NotifyMessagelistTitle = ({ record }) => {
   return <span>编辑 通知消息</span>;
};

const NotifyMessagelistEdit = (props) => {
      return (<Edit title={<NotifyMessagelistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <SelectInput  label="消息类型"  source="messagetype" choices={[
                  { id: 'all', name: '所有' },
                  { id: 'driver', name: '司机端' },
                  { id: 'rider', name: '乘客端' },
              ]} />
              <TextInput label="消息标题"  source="messagetitle" />
              <RichTextInput label="消息内容" source="messagecontent" addLabel={false}/>

          </SimpleForm>
      </Edit>);

};


const NotifyMessagelistShow = (props) => (
       <Show title={<NotifyMessagelistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="消息类型" source="messagetype" />
               <TextField label="消息标题" source="messagetitle" />
               <DateField label="发帖时间" source="created_at" showTime />
           </SimpleShowLayout>
       </Show>
);



const NotifyMessagelistList = (props) => (//
     <List title="通知消息列表" {...props} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="消息类型" source="messagetype" />
        <TextField label="消息标题" source="messagetitle" />
        <DateField label="生成时间" source="created_at" showTime />
        <EditButton />
        </Datagrid>
    </List>
);


export  {NotifyMessagelistList,NotifyMessagelistCreate,NotifyMessagelistEdit,NotifyMessagelistShow};
