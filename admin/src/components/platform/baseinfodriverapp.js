import React from 'react';
import { NumberInput,Create, Edit, SimpleForm, DisabledInput, TextInput,  Show,SimpleShowLayout,ShowButton,
   DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,BooleanInput } from 'admin-on-rest/lib/mui';
import { List, EmailField,RichTextInput } from 'admin-on-rest/lib/mui';
import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';


const BaseInfoDriverAppTitle = ({ record }) => <span>驾驶员移动终端信息</span>;
export const BaseInfoDriverAppShow = (props) => (
    <Show title={<BaseInfoDriverAppTitle />} {...props}>
        <SimpleShowLayout>
            <TextField label="机动车驾驶证号" source="Licenseld" />
            <TextField label="驾驶员手机号"  source="DriverPhone" />
            <TextField label="手机运营商"  source="NetType" />
            <TextField label="使用APP版本号"  source="AppVersion" />
            <TextField label="地图类型" source="MapType" />
        </SimpleShowLayout>
    </Show>
);


export const BaseInfoDriverAppList = props => (
  <List title="移动终端信息列表" {...props} >
     <Datagrid>
     <TextField label="机动车驾驶证号" source="Licenseld" />
     <TextField label="驾驶员手机号"  source="DriverPhone" />
     <TextField label="手机运营商"  source="NetType" />
     <TextField label="使用APP版本号"  source="AppVersion" />
     <TextField label="地图类型" source="MapType" />
     <ShowButton />
     </Datagrid>
 </List>
);
