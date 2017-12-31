import React from 'react';
import {
    Create,
    Edit,
    Datagrid,
    DateField,
    DisabledInput,
    EditButton,
    Filter,
    FormTab,
    List,
    NumberInput,
    ReferenceInput,
    ReferenceManyField,
    RichTextField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    SimpleShowLayout,
    Edit as EditPage,
    Show as ShowPage,
    SimpleForm
} from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';
import {TextInputEx,DisabledInputEx,NumberInputEx} from '../controls/TextInputEx.js';

import {ImageInputUpload} from '../controls/imageupload.js';
import {Titlewithimage} from '../controls/Titlewithimage';
import {DateInputString} from '../controls/DateInput_String.js';
import {required} from 'admin-on-rest';

const BaseInfoCompanyStatTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 营运规模信息</span>;
};

const BaseInfoCompanyStatEdit = (props) => {
  return (<Edit title={<BaseInfoCompanyStatTitle />} {...props}>
      <SimpleForm>
        <TextInputEx label="平台注册网约车辆数"  source="VehicleNum" validate={[required]}/>
        <TextInputEx label="平台注册驾驶员数"  source="DriverNum" validate={[required]}/>
        <TextField label="操作标识" source="Flag"  />
        <TextField label="数据更新时间" source="UpdateTime" />
      </SimpleForm>
  </Edit>);
};

const BaseInfoCompanyStatList = (props) => (//
     <List title="营运规模信息" {...props} >
        <Datagrid>
        <TextField label="平台注册网约车辆数"  source="VehicleNum" />
        <TextField label="平台注册驾驶员数"  source="DriverNum" />
        <TextField label="数据更新时间" source="UpdateTime" />
        <EditButton />
        </Datagrid>
    </List>
);

export  {BaseInfoCompanyStatList,BaseInfoCompanyStatEdit};
