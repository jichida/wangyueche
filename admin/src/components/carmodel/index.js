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
  ReferenceInput,
  ReferenceField
} from 'admin-on-rest/lib/mui';

import RichTextInput from '../controls/richtoolbar.js';

//import RichTextInput from 'aor-rich-text-input';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';

const CarmodellistTitle = ({ record }) => {
   return <span>汽车型号</span>;
};

const CarmodellistCreate = (props) => {
      return (<Create title={<CarmodellistTitle />} {...props}>
          <SimpleForm>
              <ReferenceInput source="carbrandid" reference="carbrand" allowEmpty>
                  <SelectInput optionText="brandname" />
              </ReferenceInput>
              <TextInput label="车型"  source="modelname" />
          </SimpleForm>
      </Create>);

};


const CarmodellistEdit = (props) => {
      return (<Edit title={<CarmodellistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <ReferenceInput source="carbrandid" reference="carbrand" allowEmpty>
                  <SelectInput optionText="brandname" />
              </ReferenceInput>
              <TextInput label="车型"  source="modelname" />
          </SimpleForm>
      </Edit>);

};


const CarmodellistList = (props) => (//
     <List title="汽车型号" {...props} >
        <Datagrid>
        <ReferenceField label="汽车品牌" source="carbrandid" reference="carbrand" addLabel={false} >
            <TextField source="brandname" />
        </ReferenceField>
        <TextField label="品牌名" source="modelname" />     
        <EditButton />
        </Datagrid>
    </List>
);


export  {CarmodellistList,CarmodellistEdit,CarmodellistCreate};
