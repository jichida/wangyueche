import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,
   BooleanInput,BooleanField,
 Filter
} from 'admin-on-rest/lib/mui';


import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';

const UserdriverpincheTitle = ({ record }) => {
   return <span>拼车司机</span>;
};


const UserdriverpincheCreate = (props) => {
      return (<Create title={<UserdriverpincheTitle />} {...props}>
              <SimpleForm>
                  <TextInput label="手机号" source="username" />
                  <TextInput label="昵称(显示在乘客端的名字)" source="nickname" />
                  <TextInput label="姓名" source="truename" />
                  <TextInput label="密码" source="password" />
                  <DateField label="注册时间" source="created_at"  showTime/>
                  <DateField label="上次登录时间" source="updated_at"  showTime/>
                  <BooleanField label="是否启用" source="isenabled" />
               </SimpleForm>
              </Create>);
}


const UserdriverpincheEdit = (props) => {
      return (<Edit title={<UserdriverpincheTitle />} {...props}>
              <SimpleForm>
                  <TextField source="id" />
                  <TextInput label="手机号" source="username" />
                  <TextInput label="昵称(显示在乘客端的名字)" source="nickname" />
                  <TextInput label="姓名" source="truename" />
                  <TextInput label="密码" source="password" />
                  <DateField label="注册时间" source="created_at"  showTime/>
                  <DateField label="上次登录时间" source="updated_at"  showTime/>
                  <BooleanField label="是否启用" source="isenabled" />
               </SimpleForm>
              </Edit>);
}

export const UserFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="username_q" />
    </Filter>
);
const UserdriverpincheList = (props) => (//
     <List title="拼车司机列表" filters={<UserFilter />} {...props} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="手机号" source="username" />
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <TextField label="姓名" source="truename" />
        <TextField label="昵称" source="nickname" />
        <BooleanField label="是否启用" source="isenabled" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {UserdriverpincheCreate,UserdriverpincheEdit,UserdriverpincheList};
