import React from 'react';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {ImageInput,ImageField, CreateButton,NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput,BooleanField } from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import {TimePickerInput} from '../controls/timepicker.js';
import { translate } from 'admin-on-rest';
import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';

const TourbusinfocreateTitle = ({ record }) => {
   return <span>新建 旅游大巴类型</span>;
};
const TourbusinfolistCreate = (props) => (
       <Create {...props} title={<TourbusinfocreateTitle />} >
           <SimpleForm>
               <TextInput label="名字" source="name" />
               <TextInput label="描述"  source="desc" />
               <NumberInput label="座位"  source="seatnumber" />
               <ImageInputUpload label="图标URL"  source="icon" />
               <NumberInput label="价格/天" sourte="priceperday" />
               <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);

const TourbusinfolistTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 旅游大巴类型</span>;
};


const TourbusinfolistEdit = (props) => {
      return (<Edit title={<TourbusinfolistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <TextInput label="注册类型" source="registertype" />
              <TextInput label="名字" source="name" />
              <TextInput label="描述"  source="desc" />
              <NumberInput label="座位"  source="seatnumber" />
              <ImageInputUpload label="图标" source="icon" />
              <NumberInput label="价格/天" source="priceperday" />
              <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};

const TourbusinfolistTitle2 = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>查看 旅游大巴类型</span>;
};
const TourbusinfolistShow = (props) => (
       <Show title={<TourbusinfolistTitle2 />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="名字" source="name" />
               <TextField label="描述"  source="desc" />
               <TextField label="座位"  source="seatnumber" />
               <ImageField label="图标URL"  source="icon" />
               <TextField label="价格/天" source="priceperday" />
               <BooleanField label="是否启用" source="isenabled" />
           </SimpleShowLayout>
       </Show>
);


const TourbusinfolistListTitle = translate(({ record, translate })  => {
   return <span>旅游大巴信息</span>;
});

const TourbusinfolistList = (props) => (//
     <List title={<TourbusinfolistListTitle />} {...props} >
        <Datagrid>
        <Titlewithimage label="名字" icon="icon" name="name"/>
        <TextField label="描述"  source="desc" />
        <TextField label="座位"  source="seatnumber" />
        <TextField label="价格/天" source="priceperday" />
        <BooleanField label="是否启用" source="isenabled" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {TourbusinfolistList,TourbusinfolistCreate,TourbusinfolistEdit,TourbusinfolistShow};
