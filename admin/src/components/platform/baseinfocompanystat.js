import React from 'react';
import {
    Create,
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

import ShowPageOne from '../controls/singlelistpage.js';


const BaseInfoCompanyStatTitle = ({ record }) => <span>营运规模信息</span>;
const BaseInfoCompanyStatShow = (props) => (
       <ShowPage title={<BaseInfoCompanyStatTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="公司标识"  source="Companyld" />
           <TextField label="平台注册网约车辆数"  source="VehicleNum" />
           <TextField label="平台注册驾驶员数"  source="DriverNum" />
           <DateField label="数据更新时间" source="UpdateTime" showTime />
           </SimpleShowLayout>
       </ShowPage>
);

export const BaseInfoCompanyStatCreate = (props) => (
       <Create {...props} title={<BaseInfoCompanyStatTitle />} >
       <SimpleForm>
         <TextInputEx label="公司标识"  source="Companyld" />
         <NumberInputEx label="平台注册网约车辆数"  source="VehicleNum" />
         <NumberInputEx label="平台注册驾驶员数"  source="DriverNum" />
         <DateField label="数据更新时间" source="UpdateTime" showTime />
       </SimpleForm>
       </Create>
);

export const BaseInfoCompanyStatEdit = (props) => (
    <EditPage {...props} title={<BaseInfoCompanyStatTitle />}>
    <SimpleForm>
      <TextInputEx label="公司标识"  source="Companyld" />
      <NumberInputEx label="平台注册网约车辆数"  source="VehicleNum" />
      <NumberInputEx label="平台注册驾驶员数"  source="DriverNum" />
      <DateField label="数据更新时间" source="UpdateTime" showTime />
    </SimpleForm>
    </EditPage>
);

export {BaseInfoCompanyStatShow};
export const BaseInfoCompanyStatList = props => (
    <ShowPageOne resource={props.resource} location={props.location} ShowPage={BaseInfoCompanyStatShow} hasEdit={true}/>
);
