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
  ImageField,
  ReferenceField,
  ReferenceInput,
  Filter
} from 'admin-on-rest/lib/mui';

import RichTextInput from '../controls/richtoolbar.js';

//import RichTextInput from 'aor-rich-text-input';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';

const UserFilter = (props) => (
    <Filter {...props}>
       <ReferenceInput label="司机" source="creator" reference="userdriver" addLabel={false}>
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);

const UserdriverloginlogList = (props) => (//
     <List title="拼车司机登录信息列表" filters={<UserFilter />}  {...props} >
        <Datagrid>
        <TextField label="用户id" source="creator"  />
        <ReferenceField label="司机" source="creator" reference="userdriver" >
          <TextField source="username" />
        </ReferenceField>
        <DateField label="登录时间" source="created_at"  showTime/>
        </Datagrid>
    </List>
);


export  {UserdriverloginlogList};
