import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  CreateButton,
  RichTextField,
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  ImageField
} from 'admin-on-rest/lib/mui';

import RichTextInput from '../controls/richtoolbar.js';

//import RichTextInput from 'aor-rich-text-input';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';

const AboutlistTitle = ({ record }) => {
   return <span>编辑 关于信息</span>;
};

const AboutlistCreate = (props) => {
      return (<Create title={<AboutlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <SelectInput  label="类型" source="keyname" choices={[
                { id: 'rideruserguide', name: '乘客端用户指南' },
                { id: 'riderfeerules', name: '乘客端计费规则' },
                { id: 'riderlaws', name: '乘客端法律条款' },
                { id: 'ridercancelrules', name: '乘客端取消规则' },
                { id: 'ridergroup', name: '乘客端集团通讯录' },
                { id: 'riderservicerule', name: '乘客端注册协议' },
                { id: 'driverservicerule', name: '司机端注册协议' },
            ]} />
              <TextInput label="标题"  source="title" />
              <RichTextInput label="详细信息" source="desc" addLabel={false}/>
          </SimpleForm>
      </Create>);

};


const AboutlistEdit = (props) => {
      return (<Edit title={<AboutlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
             <SelectInput  label="类型" source="keyname" choices={[
               { id: 'rideruserguide', name: '乘客端用户指南' },
               { id: 'riderfeerules', name: '乘客端计费规则' },
               { id: 'riderlaws', name: '乘客端法律条款' },
               { id: 'ridercancelrules', name: '乘客端取消规则' },
               { id: 'ridergroup', name: '乘客端集团通讯录' },
               { id: 'riderservicerule', name: '乘客端注册协议' },
               { id: 'driverservicerule', name: '司机端注册协议' },
            ]} />
              <TextInput label="标题"  source="title" />
              <RichTextInput label="详细信息" source="desc" addLabel={false}/>
          </SimpleForm>
      </Edit>);

};


const AboutlistList = (props) => (//
     <List title="关于信息列表" {...props} >
        <Datagrid>
        <TextField label="类型" source="keyname" />
        <TextField label="标题" source="title" />
        <RichTextField label="详细信息"  source="desc" stripTags={false} />
        <EditButton />
        </Datagrid>
    </List>
);


export  {AboutlistList,AboutlistEdit,AboutlistCreate};
