import React from 'react';
import {
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

import ShowPageOne from '../controls/singlelistpage.js';



const BaseInfoDriverStatTitle = ({ record }) => <span>驾驶员统计信息</span>;
const BaseInfoDriverStatShow = (props) => (
       <ShowPage title={<BaseInfoDriverStatTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="公司标识"  source="Companyld" />
           <TextField label="平台注册网约车辆数"  source="VehicleNum" />
           <TextField label="平台注册驾驶员数"  source="DriverNum" />
           <DateField label="数据更新时间" source="UpdateTime" showTime />
           </SimpleShowLayout>
       </ShowPage>
);

export {BaseInfoDriverStatShow};
export const BaseInfoDriverStatList = props => (
    <ShowPageOne resource={props.resource} location={props.location} ShowPage={BaseInfoDriverStatShow} hasEdit={false}/>
);
