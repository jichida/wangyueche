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

import {ImageInputUpload} from '../controls/imageupload.js';
import moment from 'moment';

const CarbrandlistTitle = ({ record }) => {
   return <span> 品牌信息</span>;
};

const CarbrandlistCreate = (props) => {
      return (<Create title={<CarbrandlistTitle />} {...props}>
          <SimpleForm>
              <ImageInputUpload label="logo图片"  source="logo" />
              <TextInput label="品牌名"  source="brandname" />
              <TextInput label="备注"  source="memo" />
              <TextInput label="制造商"  source="manufacturer" />
          </SimpleForm>
      </Create>);

};


const CarbrandlistEdit = (props) => {
      return (<Edit title={<CarbrandlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <ImageInputUpload label="logo图片"  source="logo" />
              <TextInput label="品牌名"  source="brandname" />
              <TextInput label="备注"  source="memo" />
              <TextInput label="制造商"  source="manufacturer" />
          </SimpleForm>
      </Edit>);

};


const CarbrandlistList = (props) => (//
     <List title="汽车品牌列表" {...props} >
        <Datagrid>
        <ImageField source="logo" label="logo图片"/>
        <TextField label="品牌名" source="brandname" />
        <TextField label="备注" source="memo" />
        <TextField label="制造商" source="manufacturer" />      
        <EditButton />
        </Datagrid>
    </List>
);


export  {CarbrandlistList,CarbrandlistEdit,CarbrandlistCreate};
