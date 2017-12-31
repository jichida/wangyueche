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



const BaseInfoVehicleTotalMileTitle = ({ record }) => <span>车辆里程信息</span>;


export const BaseInfoVehicleTotalMileList = (props) => (//
     <List title="车辆里程信息" {...props} >
        <Datagrid>
        <TextField label="车辆号牌"  source="VehicleNo" />
        <TextField label="行驶总里程"  source="TotalMile" />
        </Datagrid>
    </List>
);
