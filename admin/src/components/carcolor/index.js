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
import ColorInput from 'aor-color-input';
//import RichTextInput from 'aor-rich-text-input';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';

const CarcolorlistTitle = ({ record }) => {
   return <span> 车辆颜色</span>;
};

const CarcolorlistCreate = (props) => {
      return (<Create title={<CarcolorlistTitle />} {...props}>
          <SimpleForm>
              <ColorInput  label="颜色" source="color" picker="Circle"/>
              <TextInput label="颜色名"  source="colorname" />
          </SimpleForm>
      </Create>);

};


const CarcolorlistEdit = (props) => {
      return (<Edit title={<CarcolorlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <ColorInput label="颜色"  source="color" picker="Circle"/>
              <TextInput label="颜色名"  source="colorname" />
          </SimpleForm>
      </Edit>);

};


const CarcolorlistList = (props) => (//
     <List title="车辆颜色信息列表" {...props} >
        <Datagrid>
        <TextField label="颜色" source="color" />
        <TextField label="颜色名" source="colorname" /> 
        <EditButton />
        </Datagrid>
    </List>
);


export  {CarcolorlistList,CarcolorlistEdit,CarcolorlistCreate};
