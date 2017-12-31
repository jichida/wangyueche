import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {ChipField, NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,SelectInput } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';


const FaretypecreateTitle = ({ record }) => {
   return <span>新建 运价类型</span>;
};
const FaretypelistCreate = (props) => (
       <Create {...props} title={<FaretypecreateTitle />} >
           <SimpleForm>
               <SelectInput  label="注册类型"  source="registertype" choices={[
                   { id: '快车', name: '快车' },
                   { id: '出租车', name: '出租车' },
                   { id: '代驾', name: '代驾' },
               ]} />
               <TextInput label="运价说明"  source="faretypenote" />
           </SimpleForm>
       </Create>
);

const FaretypelistTitle = ({ record }) => {
   return <span>编辑 运价类型</span>;
};

const FaretypelistEdit = (props) => {
      console.log(props);
      return (<Edit title={<FaretypelistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <SelectInput  label="注册类型"  source="registertype" choices={[
                  { id: '快车', name: '快车' },
                  { id: '出租车', name: '出租车' },
                  { id: '代驾', name: '代驾' },
              ]} />
              <TextInput label="运价说明"  source="faretypenote" />
          </SimpleForm>
      </Edit>);

};


const FaretypelistShow = (props) => (
       <Show title={<FaretypelistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="注册类型" source="registertype" />
               <TextField label="运价说明" source="faretypenote" />
           </SimpleShowLayout>
       </Show>
);



const FaretypelistList = (props) => (//
     <List title="运价类型列表" {...props} >
        <Datagrid>
        <ChipField  label="注册类型" source="registertype" />
        <TextField label="运价说明" source="faretypenote" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {FaretypelistList,FaretypelistCreate,FaretypelistEdit,FaretypelistShow};
