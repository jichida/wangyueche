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


const BaseInfoVehicleTotalMileTitle = ({ record }) => <span>车辆里程信息</span>;
const BaseInfoVehicleTotalMileShow = (props) => (
       <ShowPage title={<BaseInfoVehicleTotalMileTitle />} {...props}>
           <SimpleShowLayout>
           <TextField label="车辆号牌"  source="VehicleNo" />
           <TextField label="行驶总里程"  source="TotalMile" />
           </SimpleShowLayout>
       </ShowPage>
);

export {BaseInfoVehicleTotalMileShow};
export const BaseInfoVehicleTotalMileList = props => (
    <ShowPageOne resource={props.resource} location={props.location} ShowPage={BaseInfoVehicleTotalMileShow} hasEdit={false}/>
);
